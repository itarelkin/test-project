import React, { FC, useState, useEffect } from "react";
import "./App.css";
import { TopNavbar } from "./components/TopNavbar";
import ImportSection from "./components/ImportSection";
import FileViewer from "./components/FileViewer";
import GraphSection from "./components/GraphSection";

type WordsCounter = { [key: string]: number };
type MatchedText = string[];

interface Entity {
  id: number;
  type?: string[];
  matchingTokens: string[];
  entityId: string;
  freebaseTypes: string[];
  confidenceScore?: number;
  matchedText?: string;
}

const App: FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setProcessing] = useState<boolean>(false);
  const [stopProcessing, setStopProcessing] = useState<boolean>(false);
  const [wordsCounter, setWordsCounter] = useState<WordsCounter>({});
  const [status, setStatus] = useState<string>();
  const [content, setContent] = useState<string>("");
  const [matchedText, setMatchedText] = useState<MatchedText>([]);

  const apiKey = "2b3a7fc86deead1b0673368fab28fe400a32eb45706d67ba9eafaf2e";
  const url = "https://api.textrazor.com/";
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";

  useEffect(() => {
    console.log("Updated wordsCounter:", wordsCounter);
  }, [wordsCounter]);

  const textRazorCall = async (line: string) => {
    try {
      if (!line) {
        return;
      }
      console.log("line", line);
      const headers = {
        "X-TextRazor-Key": apiKey,
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest",
      };

      const data = new URLSearchParams();
      data.append("extractors", "entities");
      data.append("text", line);

      console.log("data", data);

      const response = await fetch(proxyUrl + url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: headers,
        body: data,
      });

      const responseData = await response.json();

      console.log("response ", responseData);

      if (
        responseData.response &&
        responseData.response.entities &&
        responseData.response.entities.length > 0
      ) {
        responseData.response.entities.forEach((entity: Entity) => {
          if (entity.type) {
            setMatchedText((prevMatchedText) => [
              ...prevMatchedText,
              ...(entity.matchedText ? [entity.matchedText] : []),
            ]);

            const DBpediaType = entity.type.join(",");
            setWordsCounter((prevCounter) => ({
              ...prevCounter,
              [DBpediaType]: (prevCounter[DBpediaType] ?? 0) + 1,
            }));
            console.log("DBpediaType", DBpediaType);
          }
        });
      }
    } catch (error) {
      setProcessing(false);
      setStatus("error processing data");
      console.error("error parse data:", error);
    }
  };

  const handleFileChange = async (file: File) => {
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const fileContent = e.target?.result as string;
        setContent(fileContent);
        const lines = fileContent.split("\n");

        setProcessing(true);
        setStatus("processing data...");
        for (const line of lines) {
          if (stopProcessing) {
            break; // Stop processing by button
          }

          await new Promise<void>((resolve) =>
            setTimeout(async () => {
              await textRazorCall(line);
              resolve();
            }, 10000)
          ); // 429 Too Many Requests
        }
        setProcessing(false);
        setStatus("successfully complete");
      };
      reader.readAsText(file);
    }
  };

  const handleStopProcessing = () => {
    setStopProcessing(true);
  };

  return (
    <div className="App">
      <TopNavbar />
      <h2 className="text-center mt-5">Dashboard</h2>
      <ImportSection
        selectedFile={selectedFile}
        isProcessing={isProcessing}
        stopProcessing={stopProcessing}
        handleFileChange={handleFileChange}
        handleStopProcessing={handleStopProcessing}
      />

      <FileViewer
        content={content}
        matchedWords={matchedText}
        wordsCounter={wordsCounter}
      />
      {status === "successfully complete" && (
        <GraphSection wordsCounter={wordsCounter} />
      )}
    </div>
  );
};

export default App;

import React, { FC } from "react";

interface FileViewerProps {
  content: string;
  matchedWords: string[];
  wordsCounter: { [key: string]: number };
}

const removePunctuation = (word: string): string => {
  return word.replace(/[^\w\s]/g, ""); // remove punctuation
};

const FileViewer: FC<FileViewerProps> = ({
  content,
  matchedWords,
  wordsCounter,
}) => {
  const words = content.split(/\s+/);

  return (
    <div className="ms-5 mt-5 me-5">
      {content && (
        <h5 className="text-left mt-5 mb-3">
          Text highlighted for discovered entity:
        </h5>
      )}
      <div className="file-viewer mt-2 mb-5 alert alert-light text-center">
        {words.map((word, index) => {
          const cleanedWord = removePunctuation(word);
          const isMatchedWord = matchedWords.includes(cleanedWord);

          const nextWord =
            index + 1 < words.length ? removePunctuation(words[index + 1]) : "";
          const cleanedTwoWords = cleanedWord + " " + nextWord;
          const isMatchedTwoWords = matchedWords.includes(cleanedTwoWords);

          return (
            <span
              key={index}
              style={{
                fontWeight:
                  isMatchedWord || isMatchedTwoWords ? "bold" : "normal",
                textDecoration:
                  isMatchedWord || isMatchedTwoWords ? "underline" : "none",
              }}
            >
              {isMatchedTwoWords ? cleanedTwoWords : word}{" "}
            </span>
          );
        })}
      </div>
      {content && (
        <div>
          <strong>Founded entities:</strong>
          <br />
          {Object.entries(wordsCounter).map(([entities, count]) => (
            <span key={entities}>
              {entities} = {count} <br />
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileViewer;

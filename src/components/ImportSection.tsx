import React, { FC, ChangeEvent } from "react";

interface ImportSectionProps {
  selectedFile: File | null;
  isProcessing: boolean;
  stopProcessing: boolean;
  handleFileChange: (file: File) => void;
  handleStopProcessing: () => void;
}

const ImportSection: FC<ImportSectionProps> = ({
  selectedFile,
  isProcessing,
  stopProcessing,
  handleFileChange,
  handleStopProcessing,
}) => {
  return (
    <div className="import-section ms-5 mt-5 me-5">
      <div className="alert alert-light text-center mt-5">
        <p className="mb-0">
          Please choose a file for analysis. Once the processing is complete,
          you will be able to view a graph below showing analytics with counts
          of entities.
        </p>
      </div>

      <div className="alert alert-dark">
        <h5>Import</h5>
        <p>Please, select a file to import:</p>
        <div className="mb-1">
          {!isProcessing && (
            <label className="btn btn-secondary">
              Choose File
              <input
                type="file"
                hidden
                onChange={(e) => handleFileChange(e.target.files![0])}
              />
            </label>
          )}
          {isProcessing && (
            <button
              className="btn btn-danger ms-2"
              onClick={handleStopProcessing}
              disabled={stopProcessing}
            >
              Stop Processing
            </button>
          )}
        </div>
      </div>

      {selectedFile && (
        <p className="mt-4 ">
          Selected file: <strong>{selectedFile.name}</strong>
          <br />
          Status: {isProcessing ? "processing data..." : "complete"}
        </p>
      )}

      {isProcessing && <h5 className="alert alert-success">In progress</h5>}
    </div>
  );
};

export default ImportSection;

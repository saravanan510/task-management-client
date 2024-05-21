import React, { useState, useEffect } from "react";
import useFileUpload from "../hooks/useFileUpload";
import axios from "axios";
import { TbEdit } from "react-icons/tb";
import { TbTrash } from "react-icons/tb";
import { TbDownload } from "react-icons/tb";
import { useAuth } from "../context/AuthContext";
const FilesUploader = ({ id }) => {
  const { user } = useAuth();
  const { file, handleChange, handleSubmit } = useFileUpload(id);
  const [files, setFiles] = useState([]);
  useEffect(() => {
    (async () => {
      const filesResponse = await axios.get(
        `http://localhost:4444/file/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setFiles(filesResponse.data);
    })();
  }, [file]);
  return (
    <>
      <div>
        <h3>Files Upload</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-field" style={{ marginTop: "12px" }}>
            <label htmlFor="comment">Upload file</label>
            <br />
            <input
              type="file"
              name="file"
              placeholder="choose your file here"
              id="comment"
              style={{ backgroundColor: "white" }}
              onChange={handleChange}
            />
          </div>
          <input
            type="submit"
            style={{ width: "fit-content" }}
            value="Upload"
          />
        </form>
      </div>
      <div style={{ marginTop: "32px" }}>
        <h4 style={{ marginBottom: "16px" }}>Files</h4>
        {files &&
          files.map((ele) => {
            return (
              <>
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "8px",
                    fontSize: "14px",
                    fontWeight: "500",
                    borderRadius: "6px",
                    marginBottom: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <img
                    src={`http://localhost:4444/public/images/${ele.file}`}
                    style={{ height: "32px" }}
                  />
                  <div>
                    {user && user.role === "Assignee" ? (
                      <TbDownload style={{ fontSize: "20px", color: "blue" }} />
                    ) : (
                      <TbTrash style={{ fontSize: "20px", color: "red" }} />
                    )}
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default FilesUploader;

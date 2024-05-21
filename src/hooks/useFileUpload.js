import { useState } from "react";
import fileValidation from "../utils/file-validation";
import axios from "axios";
const useFileUpload = (id) => {
  const [file, setFile] = useState({
    file: "",
    clientErrors: null,
    serverErrors: null,
  });

  const handleChange = (e) => {
    setFile({ ...file, file: e.target.files[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      file: file.file,
      taskId: id,
    };
    console.log(formData);
    const errors = fileValidation(file);
    if (Object.keys(errors).length == 0) {
      try {
        const fileResponse = await axios.post(
          "http://localhost:4444/file",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setFile({ ...file, clientErrors: null, file: "" });
      } catch (err) {}
    } else {
      setFile({ ...file, clientErrors: errors, serverErrors: null });
    }
  };

  return { file, handleChange, handleSubmit };
};

export default useFileUpload;

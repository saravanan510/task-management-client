import { useState } from "react";
import commentValidation from "../utils/comment-validation";
import axios from "axios";
import _ from "lodash";
const useComment = (id) => {
  const [comment, setComment] = useState({
    comment: "",
    clientErrors: null,
    serverErrors: null,
  });

  const handleChange = (e) => {
    setComment({ ...comment, comment: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = commentValidation(comment);

    if (Object.keys(errors).length == 0) {
      try {
        const commentData = _.pick(comment, ["comment"]);
        commentData.taskId = id;
        const commentResponse = await axios.post(
          "http://localhost:4444/comment",
          commentData,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setComment({ ...comment, comment: "", clientErrors: null });
      } catch (err) {
        setComment({
          ...comment,
          serverErrors: err.response.data.errors,
          clientErrors: null,
        });
      }
    } else {
      setComment({ ...comment, clientErrors: errors, serverErrors: null });
    }
  };
  return { comment, handleChange, handleSubmit };
};
export default useComment;

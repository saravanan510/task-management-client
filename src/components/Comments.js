import React from "react";
import useComment from "../hooks/useComment";
import { useState, useEffect } from "react";
import axios from "axios";

const Comments = ({ id }) => {
  const { comment, handleChange, handleSubmit } = useComment(id);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    (async () => {
      const commentsData = await axios.get(
        `http://localhost:4444/comment/${id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setComments(commentsData.data);
    })();
  }, [comment]);

  return (
    <div className="comments">
      <h4 style={{ color: "#4f4444", marginBottom: "12px" }}>Comments</h4>
      {comments.map((comment) => {
        return <p style={{ marginBottom: "4px" }}>&rarr; {comment.comment}</p>;
      })}
      <form onSubmit={handleSubmit}>
        <div className="form-field" style={{ marginTop: "12px" }}>
          <label htmlFor="comment">Add Comment</label>
          <br />
          <input
            type="text"
            name="comment"
            placeholder="enter your comments here"
            id="comment"
            value={comment.comment}
            onChange={handleChange}
          />
          {comment.clientErrors && (
            <p className="error-msg">{comment.clientErrors.comment}</p>
          )}
        </div>
        <input
          type="submit"
          style={{ width: "fit-content" }}
          value="Add Comment"
        />
      </form>
    </div>
  );
};

export default Comments;

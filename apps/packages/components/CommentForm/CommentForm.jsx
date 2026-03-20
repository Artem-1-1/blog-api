import { useState } from "react";
import style from "./commentForm.module.css";

export const CommentForm = ({ postId, user, onCommentAdded }) => {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`http://localhost:3000/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ commentText, postId })
      });

      const newComment = await response.json();

      if (response.ok) {
        setCommentText("");
        onCommentAdded(newComment);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={style.commentForm} onSubmit={handleSubmit}>
      <textarea
      className={style.textarea}
        placeholder="Write Comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        required
      />
      <button className={style.button} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
};
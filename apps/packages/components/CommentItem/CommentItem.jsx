import { useState, memo } from "react";
import styles from "./commentItem.module.css"

export const CommentItem = memo(({ comment, currentUser, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.commentText);

  const handleSave = () => {
  onUpdate(comment.id, editValue);
  setIsEditing(false); 
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(comment.commentText);
  };

  const formattedDate = new Date(comment.createdAt).toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  });

  return (
    <div className={styles.commentItem}>
      <div className={styles.commentHeader}>
        <strong className={styles.username}>{comment.user?.username}</strong>
        <span className={styles.timestamp}>{formattedDate}</span>
      </div>

      {isEditing ? (
        <div className={styles.editBlock}>
          <textarea
            className={styles.textarea} 
            value={editValue} 
            onChange={(e) => setEditValue(e.target.value)} 
          />
          <div className={styles.saveCancel}>
            <button className={`${styles.btn} ${styles.saveBtn}`} onClick={handleSave}>Save</button>
            <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <p className={styles.commentText}>{comment.commentText}</p>
          {currentUser && comment.userId === currentUser.id && (
            <div className={styles.actions}>
              <button className={`${styles.btn} ${styles.deleteBtn}`} onClick={() => onDelete(comment.id)}>Delete</button>
              <button className={`${styles.btn} ${styles.editBtn}`} onClick={() => setIsEditing(true)}>Edit</button>
            </div>
          )}
        </>
      )}
    </div>
  );
});
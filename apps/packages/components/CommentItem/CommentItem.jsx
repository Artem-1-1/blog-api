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

  return (
    <div className={styles.commentItem}>
      <strong>{comment.user?.username}</strong>

      {isEditing ? (
        <div className={styles.editBlock}>
          <textarea 
            value={editValue} 
            onChange={(e) => setEditValue(e.target.value)} 
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <>
          <p>{comment.commentText}</p>
          {currentUser && comment.userId === currentUser.id && (
            <div className={styles.actions}>
              <button onClick={() => onDelete(comment.id)}>Delete</button>
              <button onClick={() => setIsEditing(true)}>Edit</button>
            </div>
          )}
        </>
      )}
    </div>
  );
});
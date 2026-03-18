import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./postPage.module.css"
import { useAuthContext } from "../../hooks/useAuthContext"
import { CommentForm } from "../../components/CommentForm/CommentForm"


export const PostPage = () => {
  const { id } = useParams();
  const { user } = useAuthContext()
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
          headers: {
        'Authorization': `Bearer ${user.token}`
      }
        });
        const json = await response.json();

        if (response.ok) {
          setPost(json);
        } else {
          setError("Post not found.");
        }
      } catch (err) {
        setError(err);
      }
    };

    fetchPost();
  }, [id, user]);

  if (error) return <div className={style.error}>{error}</div>;
  if (!post) return <div className={style.loading}>Loading...</div>;

  const handleNewComment = (newComment) => {
    setPost(prev => ({
      ...prev,
      comments: [newComment, ...prev.comments]
    }));
  };

  return (
    <div className={style.Post}>
      <h1>{post.title}</h1>
      <div className={style.meta}>
        Author: {post.user?.username} • {new Date(post.createdAt).toLocaleString()}
      </div>
      
      <p className={style.content}>{post.postContent}</p>

      <section className={style.commentsSection}>
        <h3>Comments ({post.comments?.length || 0})</h3>

        {user?.role === 'USER' && (
          <CommentForm 
            postId={id} 
            user={user} 
            onCommentAdded={handleNewComment} 
          />
        )}
        
        {post.comments?.map((comment) => (
          <div key={comment.id} className={style.commentItem}>
            <strong>{comment.user?.username}</strong>
            <span className={style.commentDate}>
              {new Date(comment.createdAt).toLocaleTimeString()}
            </span>
            <p>{comment.commentText}</p>
          </div>
        ))}
        
        {post.comments?.length === 0 && <p>No comments yet.</p>}
      </section>
    </div>
  );
};
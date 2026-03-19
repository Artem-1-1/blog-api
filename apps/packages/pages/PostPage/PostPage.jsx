import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./postPage.module.css"
import { useAuthContext } from "../../hooks/useAuthContext"
import { CommentForm } from "../../components/CommentForm/CommentForm"
import { CommentItem } from "../../components/CommentItem/CommentItem";
import { commentService } from "../../services/commentService.js"


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
        setError("Something went wrong. Please try again later.");
      }
    };

    fetchPost();
  }, [id, user.token]);

  if (error) return <div className={style.error}>{error}</div>;
  if (!post) return <div className={style.loading}>Loading...</div>;

  const handleNewComment = (newComment) => {
    const commentWithUser = { ...newComment, user: { username: user.username } };
    setPost(prev => ({ ...prev, comments: [commentWithUser, ...prev.comments] }));
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Delete?")) return;
    if (await commentService.delete(commentId, user.token)) {
      setPost(prev => ({ ...prev, comments: prev.comments.filter(c => c.id !== commentId) }));
    }
  };

  const handleUpdate = async (commentId, newText) => {
    if (await commentService.update(commentId, newText, user)) {
      setPost(prev => ({
        ...prev,
        comments: prev.comments.map(c => c.id === commentId ? { ...c, commentText: newText } : c)
      }));
    }
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
        {post.comments?.length === 0 && <p>No comments yet.</p>}
        {user?.role === 'USER' && (
          <CommentForm postId={id} user={user} onCommentAdded={handleNewComment} />
        )}
        
      {post.comments?.map((comment) => (
        <CommentItem 
          key={comment.id} 
          comment={comment} 
          currentUser={user}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
        ))}
      </section>
    </div>
  );
};
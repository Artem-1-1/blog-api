import { usePostsContext } from "../../hooks/usePostsContext"
import { useAuthContext } from "@blog-api/packages"
import { Link } from "react-router-dom"
import styles from "./postDetails.module.css"

const PostDetails = ({ post, isDraft=false }) => {
  const { dispatch } = usePostsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {    
    if (!user) {
      return
    }

    const response = await fetch("http://localhost:3000/api/posts/" + post.id, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_POST', payload: json})
    }
  }

  const createdTime = new Date(post.createdAt).getTime();
  const updatedTime = new Date(post.updatedAt).getTime();
  const isUpdated = updatedTime - createdTime > 1000;
  const displayDate = new Date(isUpdated ? post.updatedAt : post.createdAt)
    .toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit' 
    });

  return (
    <div className={styles.postDetails}>
      {isDraft ? (
        <h3>{post.title}</h3>
      ) : (
        <Link to={`/post/${post.id}`}>
          <h3>{post.title}</h3>
        </Link>
      )}
      <p>{post.postContent}</p>
      {!isDraft && (
        <div className={styles.postMeta}>
        <span>Author: {post.user?.username}</span>
        <span> • </span>
        <span>
          {isUpdated ? 'Update: ' : 'Published: '}
          {displayDate}
        </span>
      </div>
      )}
      {user && user.id === post.userId && (
      <div className={styles.actions}>
        <Link to={`/edit/${post.id}`} className={styles.editBtn}>
          {isDraft ? 'Edit Draft' : 'Edit Post'}
        </Link>
        <button className={styles.deleteBtn} onClick={handleClick}>
          Delete
        </button>
      </div>
    )}
    </div>
  )
}

export default PostDetails;
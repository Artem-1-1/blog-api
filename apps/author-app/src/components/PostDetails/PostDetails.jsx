import { usePostsContext } from "../../hooks/usePostsContext"
import { useAuthContext } from "@blog-api/packages"
import { Link } from "react-router-dom"
import style from "./postDetails.module.css"

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
  const isUpdated = updatedTime > createdTime;
  const displayDate = new Date(isUpdated ? post.updatedAt : post.createdAt)
    .toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit' 
    });

  return (
    <div className={style.postDetails}>
      <Link to={`/post/${post.id}`}>
        <h3>{post.title}</h3>
      </Link>
      <p>{post.postContent}</p>
      {isDraft ? (
        <a href={`/edit/${post.id}`} className={style.readMore}>Edit Draft</a>
      ) : (
        <div className={style.postMeta}>
        <span>Author: {post.user?.username}</span>
        <span> • </span>
        <span>
          {isUpdated ? 'Update: ' : 'Published: '}
          {displayDate}
        </span>
      </div>
      )}
      {user && user.id === post.userId && (
        <span className={style.deleteBtn} onClick={handleClick}>
          Delete
        </span>
      )}
    </div>
  )
}

export default PostDetails;
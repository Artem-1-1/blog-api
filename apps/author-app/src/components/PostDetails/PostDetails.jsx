import { usePostsContext } from "../../hooks/usePostsContext"
import { useAuthContext } from "@blog-api/packages"
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

  return (
    <div className={style.postDetails}>
      <a href={`/post/${post.id}`}>
        <h3>{post.title}</h3>
      </a>
      <p>{post.postContent}</p>
      {isDraft ? (
        <a href={`/edit/${post.id}`} className={style.readMore}>Edit Draft</a>
      ) : (
        <a href={`/post/${post.id}`} className={style.readMore}>Read More</a>
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
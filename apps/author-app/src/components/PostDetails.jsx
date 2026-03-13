import { usePostsContext } from "../hooks/usePostsContext"

const PostDetails = ({ post }) => {
  const { dispatch } = usePostsContext()

  const handleClick = async () => {
    const response = await fetch("http://localhost:3000/api/posts/" + post.id, {
      method: "DELETE"
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_POST', payload: json})
    }
  }

  return (
    <div className="post-details">
      <a href={`/post/${post.id}`}>
        <h3>{post.title}</h3>
      </a>
      <p>{post.postContent}</p>
      <a href={`/post/${post.id}`}>Read More</a>
      {user && user.id === post.userId && (
        <span className="deleteBtn" onClick={handleClick}>
          Delete
        </span>
      )}
    </div>
  )
}

export default PostDetails;
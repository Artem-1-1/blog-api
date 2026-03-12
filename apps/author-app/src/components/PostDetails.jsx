const PostDetails = ({ post }) => {

  return (
    <div className="post-details">
      <a href={`/post/${post.id}`}>
        <h3>{post.title}</h3>
      </a>
      <p>{post.postContent}</p>
      <a href={`/post/${post.id}`}>Read More</a>
    </div>
  )
}

export default PostDetails;
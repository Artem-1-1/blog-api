import { useState } from "react"

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [error, setError] = useState(null);

  
  const handleSubmit = async(e) => {
    e.preventDefault();

    const post = { title, postContent, isPublished }

    const response = await fetch("http://localhost:3000/api/posts/new", {
    method: "POST", 
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json"
    }
  })
    const json = await response.json()

  if(!response.ok) {
    setError(json.error)
  }
  if (response.ok) {
    setError(null)
    setTitle('')
    setPostContent('')
    setIsPublished(false)
    console.log('new post added:', json)
  }
}

  return (
    <form className="form" onSubmit={handleSubmit}> 
      <label>Post Title:</label>
        <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        required />

      <label>Post Content:</label>
        <textarea
        onChange={(e) => setPostContent(e.target.value)}
        value={postContent} 
        required/>

      <label>Published</label>
      <div className="checkbox-row">
        <input 
          id="published"
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)} 
        />
        <label htmlFor="published" style={{margin: 0, cursor: 'pointer'}}>
          {isPublished ? "Public" : "Draft"}
        </label>
      </div> 

      <button>Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default PostForm;
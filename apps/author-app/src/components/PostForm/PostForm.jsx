import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePostsContext } from "../../hooks/usePostsContext"
import { useAuthContext } from "@blog-api/packages"
import style from "./postFrom.module.css"

const PostForm = () => {
  const { dispatch } = usePostsContext()
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const [title, setTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in')
      return
    }

    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:3000/api/posts/new", {
    method: "POST", 
    body: JSON.stringify({ title, postContent, isPublished }),
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${user.token}`
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
    dispatch({type: 'CREATE_POST', payload: json})
    navigate('/')
  }
}

  return (
    <form className={style.form} onSubmit={handleSubmit}> 
      <label htmlFor="post-title">Post Title:</label>
        <input
        id="post-title"
        className={style.input} 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        required />

      <label htmlFor="post-content">Post Content:</label>
        <textarea
        id="post-content"
        className={style.textarea}
        onChange={(e) => setPostContent(e.target.value)}
        value={postContent} 
        required/>

      <div className={style.statusWrapper}>
        <label>Published</label>
        <div className={style['checkbox-row']}>
          <input 
            id="published"
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)} 
          />
          <label htmlFor="published" className={style['checkbox-label']}>
            {isPublished ? "Public" : "Draft"}
          </label>
        </div>
      </div> 

      <button className={style.button} disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Submit Post'}</button>
      {error && <div className={style.error}>{error}</div>}
    </form>
  )
}

export default PostForm;
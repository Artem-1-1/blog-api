import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { usePostsContext } from "../../hooks/usePostsContext"
import { useAuthContext } from "@blog-api/packages"
import styles from "./postFrom.module.css"

const PostForm = ({ initialData = null, isEditing = false }) => {
  const { dispatch } = usePostsContext()
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const [title, setTitle] = useState(initialData?.title || '');
  const [postContent, setPostContent] = useState(initialData?.postContent || '');
  const [isPublished, setIsPublished] = useState(initialData?.isPublished || false);
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

    const url = isEditing 
      ? `http://localhost:3000/api/posts/${initialData.id}` 
      : "http://localhost:3000/api/posts/new";

    const method = isEditing ? "PATCH" : "POST";

    const response = await fetch(url, {
    method: method, 
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
    dispatch({ type: isEditing ? 'UPDATE_POST' : 'CREATE_POST', payload: json });
    if (!isPublished) {
    navigate('/drafts');
  } else {
    navigate('/');
  }
  }
}

  return (
    <form className={styles.form} onSubmit={handleSubmit}> 
      <label htmlFor="post-title">Post Title:</label>
        <input
        id="post-title"
        className={styles.input} 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        required />

      <label htmlFor="post-content">Post Content:</label>
        <textarea
        id="post-content"
        className={styles.textarea}
        onChange={(e) => setPostContent(e.target.value)}
        value={postContent} 
        required/>

      <div className={style.statusWrapper}>
        <label>Published</label>
        <div className={styles['checkbox-row']}>
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

      <button className={styles.button} disabled={isLoading}>
        {isEditing ? 'Save Changes' : 'Submit Post'}
      </button>
      {error && <div className={styles.error}>{error}</div>}
    </form>
  )
}

export default PostForm;
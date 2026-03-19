import { useEffect } from "react";
import { usePostsContext } from "../../hooks/usePostsContext"
import { useAuthContext } from "@blog-api/packages"
import PostDetails from "../../components/PostDetails/PostDetails";
import style from "./drafts.module.css"

const Drafts = () => {
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();


  useEffect(() => {
      const fetchDrafts = async () => {
        const response = await fetch("http://localhost:3000/api/posts/drafts", {
          headers: {'Authorization': `Bearer ${user.token}`},
        })
  
        const json = await response.json()
  
        if (response.ok) {
          dispatch({type: 'SET_POSTS', payload: json})
        }
      }
  
      if (user.token) {
        fetchDrafts()
      }
  
    }, [dispatch, user.token])

    return (
    <div className="drafts-page">
      <h2>My Drafts</h2>
      <div className="posts">
        {posts && posts.length === 0 ? (
          <p className={style.notYet}>You have no drafts yet.</p>
        ) : (
          posts && posts.map(post => (
            <PostDetails post={post} key={post.id} isDraft={true} />
          ))
        )}
      </div>
    </div>
  );
}

export default Drafts;

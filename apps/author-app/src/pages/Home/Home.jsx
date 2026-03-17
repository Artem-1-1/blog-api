import { useEffect } from "react";
import { usePostsContext } from "../../hooks/usePostsContext"
import { useAuthContext } from "@blog-api/packages"
import PostDetails from "../../components/PostDetails/PostDetails";

const Home = () => {
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:3000/api/posts", {
        headers: {'Authorization': `Bearer ${user.token}`},
      })

      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_POSTS', payload: json})
      }
    }

    if (user.token) {
      fetchPosts()
    }

  }, [dispatch, user.token])

  return (
    <div className="home">
      <div className="posts">
        {posts && posts.map(post => (
          <PostDetails post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
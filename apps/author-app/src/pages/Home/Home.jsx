import { useEffect, useState } from "react";
import PostDetails from "../../components/PostDetails";

const Home = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:3000/api/posts")
      const json = await response.json()

      if (response.ok) {
        setPosts(json)
      }
    }

    fetchPosts()
  }, [])

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
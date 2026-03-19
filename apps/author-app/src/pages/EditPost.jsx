import { useParams } from "react-router-dom";
import PostForm from "../components/PostForm/PostForm";
import { usePostsContext } from "../hooks/usePostsContext";

const EditPost = () => {
  const { id } = useParams();
  const { posts } = usePostsContext();
  
  const postToEdit = posts?.find(p => p.id === id);

  if (!postToEdit) return <p>Loading or Post not found...</p>;

  return (
    <PostForm initialData={postToEdit} isEditing={true} />
  );
}

export default EditPost;
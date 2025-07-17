import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = ({ user }) => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const updateLike = () => {
    return;
  };

  const removeBlog = () => {
    return;
  };
  return (
    <div>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLike={updateLike}
            userId={user.id}
            removeBlog={removeBlog}
          />
        ))}
    </div>
  );
};

export default BlogList;

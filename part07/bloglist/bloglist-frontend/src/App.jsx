import { useEffect } from "react";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";
import { userLogin, userLogout } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(userLogin(user));
      blogService.setToken(user.token);
    }
  }, []);

  const logoutHandler = () => {
    dispatch(userLogout());
    window.localStorage.removeItem("loggedBlogAppUser");
  };

  const user = useSelector((state) => state.user);

  if (user === null) {
    return (
      <div>
        <h1>Blogs App</h1>
        <Notification />
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs App</h2>

      <Notification />

      <p>
        {`${user.name} logged in`}
        <button onClick={logoutHandler}>logout</button>
      </p>

      {
        <div>
          <Togglable buttonLabel="new blog">
            <BlogForm />
          </Togglable>
        </div>
      }

      <BlogList user={user} />
    </div>
  );
};

export default App;

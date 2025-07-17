import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { notify } from "./reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(notify("Wrong credentials", true));
    }
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const logoutHandler = () => {
    setUser(null);
    window.localStorage.removeItem("loggedBlogAppUser");
  };

  const updateLike = async (updateData) => {
    try {
      const updatedBlog = await blogService.updateLikes(
        updateData.updatedBlog,
        updateData.blogId,
      );
      console.log("likes updated:", updatedBlog.id);

      dispatch(
        notify(
          `Likes for ${updatedBlog.title} by ${updatedBlog.author} updated`,
          false,
          3,
        ),
      );

      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)),
      );
    } catch (exception) {
      dispatch(notify("Updating likes failed", true));
    }
  };

  const removeBlog = async (blogId) => {
    console.log(`removing blog: ${blogId}`);

    try {
      const removedBlog = await blogService.deleteBlog(blogId);
      console.log(`removed blog ${blogId}`);

      const updatedBlogs = blogs.filter((b) => b.id !== blogId);
      setBlogs(updatedBlogs);
      dispatch(notify("Removed blog successfully", false, 5));
    } catch (exception) {
      dispatch(notify("Removing blog failed", true, 5));
    }
  };

  if (user === null) {
    return (
      <div>
        <h1>Blogs App</h1>

        <Notification />

        {loginForm()}
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

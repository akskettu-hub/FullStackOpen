import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { notify } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload);
    },
    addVote(state, action) {
      const id = action.payload;
      const blogToUpvote = state.find((b) => b.id === id);
      const upvotedBlog = {
        ...blogToUpvote,
        likes: blogToUpvote.likes + 1,
      };
      return state.map((a) => (a.id !== id ? a : upvotedBlog));
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { addBlog, addVote, appendBlog, setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    console.log("initialising blogs....");

    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
    console.log(`blogs initialised. Found ${blogs.length} blogs`);
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    console.log("adding blog");
    try {
      const newBlog = await blogService.create(content);
      dispatch(addBlog(newBlog));

      dispatch(
        notify(`a new blog ${newBlog.title} by ${newBlog.author} added`, false),
      );
    } catch (error) {
      dispatch(notify("blog creation failed", true));
    }
  };
};

export default blogSlice.reducer;

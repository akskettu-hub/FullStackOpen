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
    dropBlog(state, action) {
      const id = action.payload;
      return state.filter((b) => b.id !== id);
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
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { addBlog, addVote, setBlogs, dropBlog } = blogSlice.actions;

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

export const voteForBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.updateLikes(
      content.updatedBlog,
      content.blogId,
    );
    dispatch(addVote(newBlog.id));
    dispatch(notify(`You voted ${newBlog.title}`, false, 3));
  };
};

export const removeBlog = (blogId) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blogId);

      dispatch(dropBlog(blogId));
      dispatch(notify(`Removed blog`, false));
      console.log(`Removed blog with id ${blogId}`);
    } catch (error) {
      dispatch(notify(`Failed to remove blog`, true));
    }
  };
};

export default blogSlice.reducer;

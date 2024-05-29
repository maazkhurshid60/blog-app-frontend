import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogs: [],
}

const BlogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {

        setBlogData: (state, action) => {

            const listOfBlogs = action.payload;

            state.blogs = listOfBlogs;

        },

    }
});


export const {setBlogData} = BlogSlice.actions;

export default BlogSlice.reducer;
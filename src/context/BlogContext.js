import React, { useReducer, useC } from 'react';
import createDataContext from './createDataContext';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'delete_post':
      return state.filter((blogPost) => blogPost.id !== action.payload);
    case 'add_post':
      return [
        ...state, 
        { // obj
          id: Math.floor(Math.random() * 9999), 
          title: action.payload.title,
          content: action.payload.content 
        }
      ] //array returned
    case 'edit_post':
      return state.map((blogPost) => {
        if (blogPost.id === action.payload.id)
          return action.payload;
        return blogPost;
      });
    default:
      return state;
  }
}

const addBlogPost = (dispatch) => {
  return (title, content, callback) => {
    dispatch({ type: 'add_post', payload: { title, content } });
    callback ? callback() : null;
  }
}

const deleteBlogPost = (dispatch) => {
  return (id) => {
    dispatch({ type: 'delete_post', payload: id });
  }
}

const editBlogPost = (dispatch) => {
  return (id, title, content, callback) => {
    dispatch({ type: 'edit_post', payload: { id, title, content } })
    callback ? callback() : null;
  }
}

export const {Context, Provider} = createDataContext(
  blogReducer, 
  { addBlogPost, deleteBlogPost, editBlogPost },
  [{ title: 'test', content: 'testContent', id: 1 }] // initial state val
);
import React, { useReducer } from 'react';
import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'get_blogposts':
      return action.payload;
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

const getBlogPosts = dispatch => {
  return async () => {
    const response = await jsonServer.get('/blogposts');
    dispatch({ type: 'get_blogposts', payload: response.data });
  }
}

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    await jsonServer.post('/blogposts', { title, content });
    // dispatch({ type: 'add_post', payload: { title, content } });
    callback ? callback() : null;
  }
}

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete('/blogposts/' + id);
    dispatch({ type: 'delete_post', payload: id });
  }
}

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put('/blogposts/'+id, {title, content});
    dispatch({ type: 'edit_post', payload: { id, title, content } })
    callback ? callback() : null;
  }
}

export const {Context, Provider} = createDataContext(
  blogReducer, 
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  [] // initial state val
);
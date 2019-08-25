import React, { useReducer, useC } from 'react';
import createDataContext from './createDataContext';

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'add_post':
      return [...state, { title: `Blog post #${state.length + 1}` }]
    default:
      return state;
  }
}

const addBlogPost = (dispatch) => {
  return () => {
    dispatch({ type: 'add_post' });
  }
}

export const {Context, Provider} = createDataContext(
  blogReducer, 
  {addBlogPost},
  [] // initial state val
);
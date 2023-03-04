import React, { useReducer, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchMainPosts } from '../utils/api';
import Loading from './Loading';
import PostsList from './PostsList';

const postsReducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return {
        posts: null,
        error: null,
        loading: true,
      };
    case 'success':
      return {
        posts: action.posts,
        loading: false,
        error: null,
      };
    case 'error':
      return {
        error: action.message,
        loading: false,
      };
    default:
      throw new Error(
        `Action Type [${action.type}] is not supported in postsReducer`
      );
  }
};

export default function Posts({ type }) {
  const [state, dispatch] = useReducer(postsReducer, {
    posts: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    //Start fetching:
    dispatch({ type: 'loading' });

    fetchMainPosts(type)
      .then((posts) =>
        //Success fetch
        dispatch({ type: 'success', posts })
      )
      .catch(({ message }) =>
        //Error during fetch:
        dispatch({ type: 'error', message })
      );
  }, [type]);

  const { posts, error, loading } = state;

  if (loading === true) {
    return <Loading />;
  }

  if (error) {
    return <p className="center-text error">{error}</p>;
  }

  return <PostsList posts={posts} />;
}

Posts.propTypes = {
  type: PropTypes.oneOf(['top', 'new']),
};

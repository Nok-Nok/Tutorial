import React, { useEffect, useReducer } from 'react';
import queryString from 'query-string';
import { fetchUser, fetchPosts } from '../utils/api';
import Loading from './Loading';
import { formatDate } from '../utils/helpers';
import PostsList from './PostsList';
const userReducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        loadingUser: true,
        loadingPosts: true,
        error: null,
      };
    case 'successUser':
      return {
        ...state,
        loadingUser: false,
        user: action.user,
      };
    case 'successPost':
      return {
        ...state,
        loadingPosts: false,
        posts: action.posts,
      };
    case 'error':
      return {
        ...state,
        error: action.message,
        loadingUser: false,
        loadingPosts: false,
      };
    default:
      throw new Error(
        `Action Type [${action.type}] is not supported by userReducer`
      );
  }
};
const initialUserState = {
  user: null,
  loadingUser: true,
  posts: null,
  loadingPosts: true,
  error: null,
};

export default function User({ location }) {
  const [userState, dispatch] = useReducer(userReducer, initialUserState);

  const { user, posts, loadingUser, loadingPosts, error } = userState;

  useEffect(() => {
    //Start fetching:
    dispatch({ type: 'loading' });
    //Obtain the userID:
    const { id } = queryString.parse(location.search);
    fetchUser(id)
      .then((user) => {
        //Success fetching user:
        dispatch({ type: 'successUser', user });

        return fetchPosts(user.submitted.slice(0, 30));
      })
      .then((posts) =>
        //Success fetching posts
        dispatch({ type: 'successPost', posts })
      )
      .catch(({ message }) =>
        //Error during fetching
        dispatch({ type: 'error', message })
      );
  }, [location]);

  if (error) {
    return <p className="center-text error">{error}</p>;
  }

  return (
    <React.Fragment>
      {loadingUser === true ? (
        <Loading text="Fetching User" />
      ) : (
        <React.Fragment>
          <h1 className="header">{user.id}</h1>
          <div className="meta-info-light">
            <span>
              joined <b>{formatDate(user.created)}</b>
            </span>
            <span>
              has <b>{user.karma.toLocaleString()}</b> karma
            </span>
          </div>
          <p dangerouslySetInnerHTML={{ __html: user.about }} />
        </React.Fragment>
      )}
      {loadingPosts === true ? (
        loadingUser === false && <Loading text="Fetching posts" />
      ) : (
        <React.Fragment>
          <h2>Posts</h2>
          <PostsList posts={posts} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

import React, { useEffect, useReducer } from 'react';
import queryString from 'query-string';
import { fetchItem, fetchPosts, fetchComments } from '../utils/api';
import Loading from './Loading';
import PostMetaInfo from './PostMetaInfo';
import Title from './Title';
import Comment from './Comment';

const postReducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        loadingPost: true,
        loadingComments: true,
      };
    case 'postSuccess':
      return {
        ...state,
        post: action.post,
        loadingPost: false,
      };
    case 'commentSuccess':
      return {
        ...state,
        comments: action.comments,
        loadingComments: false,
      };
    case 'error':
      return {
        ...state,
        error: action.message,
        loadingPost: false,
        loadingComments: false,
      };
    default:
      throw new Error(
        `Action type [${action.type}] is not supported in Post Component .`
      );
  }
};
const initialPostState = {
  post: null,
  loadingPost: true,
  comments: null,
  loadingComments: true,
  error: null,
};
export default function Post({ location }) {
  const [{ post, loadingPost, comments, loadingComments, error }, dispatch] =
    useReducer(postReducer, initialPostState);

  useEffect(() => {
    const { id } = queryString.parse(location.search);
    //Start fetching => loading status
    dispatch({ type: 'loading' });
    //Obtain fetch Item id:
    fetchItem(id)
      .then((post) => {
        //Successfully load posts
        dispatch({ type: 'postSuccess', post });
        return fetchComments(post.kids || []);
      })
      .then((comments) => {
        //Successfully load comments
        dispatch({ type: 'commentSuccess', comments });
      })
      .catch(({ message }) =>
        //Error during fetching
        dispatch({
          type: 'error',
          message,
        })
      );
  }, [location]);

  if (error) {
    return <h2>{`Error message at Post Component: ${error}`}</h2>;
  }
  return (
    <React.Fragment>
      {loadingPost === true ? (
        <Loading text="Fetching post" />
      ) : (
        <React.Fragment>
          <h1 className="header">
            <Title url={post.url} title={post.title} id={post.id} />
          </h1>
          <PostMetaInfo
            by={post.by}
            time={post.time}
            id={post.id}
            descendants={post.descendants}
          />
          <p dangerouslySetInnerHTML={{ __html: post.text }} />
        </React.Fragment>
      )}
      {loadingComments === true ? (
        loadingPost === false && <Loading text="Fetching comments" />
      ) : (
        <React.Fragment>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

/*
  Instructions:
    You're given an array of `postIds` and a `fetchPost` function.
    When you invoke `fetchPost`, you'll need to pass it an `id` from
    the `postIds` array. `fetchPost` returns a promise that will resolve
    with a post shaped like this

    {
      "userId": 1,
      "id": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }

    The UI should show `Loading` if the request is still being made,
    an error message if there was an error, or the post title, body,
    and a button to fetch the next post on a successful request.
*/

const postIds = [1, 2, 3, 4, 5, 6, 7, 8];

function fetchPost(id) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) =>
    res.json()
  );
}

function APIRequest() {
  //Fetch States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //Component States
  const [userInfo, setUserInfo] = useState(null);
  const [id, setId] = useState(0);
  useEffect(() => {
    setLoading(true);
    fetchPost(postIds[id])
      .then((user) => {
        setUserInfo(user);
        setLoading(false);
      })
      .catch((e) => {
        console.warn(e.message);
        setError('Error fetching data. Try again.');
        setLoading(false);
      });
  }, [id]);

  //Handling fetch request
  if (loading) return <p>Loading ...</p>;
  if (error)
    return (
      <React.Fragment>
        <p>{error}</p>
        <button onClick={() => setId((id) => id + 1)}>Next Post</button>
      </React.Fragment>
    );

  //Rendering page
  return (
    <div className="APIRequest">
      <h1>{userInfo.title}</h1>
      <p>{userInfo.body}</p>
      {id < postIds.length - 1 ? (
        <button onClick={() => setId((id) => id + 1)}>Next Post</button>
      ) : (
        <p>No More Post</p>
      )}
    </div>
  );
}

export default APIRequest;

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function getGithubProfile(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then(({ login, avatar_url, bio }) => {
      return { login, avatar_url, bio };
    });
}

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    getGithubProfile('Nok-Nok').then(setUserInfo);
  }, []);

  if (!userInfo) return <p>Loading...</p>;
  return (
    <div>
      <p>Here's a sample response with the "username" of "tylermcginnis"</p>
      <pre>{JSON.stringify(userInfo)}</pre>
    </div>
  );
}
export default Profile;

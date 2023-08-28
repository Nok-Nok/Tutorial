import React, { useState, useEffect, useCallback } from 'react';
import MyDropzone from './MyDropzone';

const UserProfiles = () => {
  const [userProfiles, setUserProfiles] = useState([]);
  const fetchUserProfiles = useCallback(
    () =>
      fetch('http://localhost:8080/api/v1/user-profile')
        .then((res) => res.json())
        .then((data) => setUserProfiles(data)),
    []
  );

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  return (
    <div>
      {userProfiles.map(({ userProfileId, username }, i) => (
        <div key={i}>
          {userProfileId ? (
            <img
              src={`http://localhost:8080/api/v1/user-profile/${userProfileId}/image/download`}
            />
          ) : null}
          <br />
          <br />
          <h1>{username}</h1>
          <p>{userProfileId}</p>
          <MyDropzone userProfileId={userProfileId} />
          <br />
        </div>
      ))}
    </div>
  );
};
export default UserProfiles;

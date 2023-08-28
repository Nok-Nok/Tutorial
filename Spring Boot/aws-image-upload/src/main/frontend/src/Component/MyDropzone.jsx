import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function MyDropzone({ userProfileId }) {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);
    console.log(userProfileId);
    fetch(
      `http://localhost:8080/api/v1/user-profile/${userProfileId}/image/upload`,
      {
        method: 'POST',
        // For sending multipart/form-data, headers should NOT be set manually
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
        body: formData,
      }
    )
      .then(() => console.log('File uploaded successfully'))
      .catch((err) => console.log(err));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the profile image here ...</p>
      ) : (
        <p>Drag 'n' drop profile image, or click to select profile image</p>
      )}
    </div>
  );
}

export default MyDropzone;

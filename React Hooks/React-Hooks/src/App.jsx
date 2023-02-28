import { useState } from 'react';
import './App.css';

//Todo Practice
import Todo from './components/Todo.jsx';
//Show-Hide practice
import ShowHide from './components/Show-Hide.jsx';
import posts from './components/Show-Hide-posts';
import Profile from './components/Profile.jsx';
import CharacterLimit from './components/Character-Limit';
import WaitDelay from './components/Wait-Delay';
import APIRequest from './components/API-Requests';
import UseWait from './components/custom-hook/usewait';
import UseWindowDimensions from './components/custom-hook/UseWindowDimensions';
// import UseFetch from './components/custom-hook/UseFetch';
import UseFetch from './components/useReducer/useFetch';

function App() {
  return (
    <div className="App">
      {/* <h1>TO DO Practice</h1>
      <Todo />
      <h1>Show-Hide Practice</h1>
      <ShowHide posts={posts} /> */}
      {/* <h1>Profile</h1>
      <Profile /> */}
      {/* <h1>Character Limit</h1>
      <CharacterLimit /> */}
      {/* <h1>Wait-Delay</h1>
      <WaitDelay /> */}
      {/* <h1>API Request</h1>
      <APIRequest /> */}
      {/* <h1>Use Wait</h1>
      <UseWait /> */}
      {/* <h1>Use Window Dimensions</h1>
      <UseWindowDimensions /> */}
      <h1>Use Fetch</h1>
      <UseFetch />
    </div>
  );
}

export default App;

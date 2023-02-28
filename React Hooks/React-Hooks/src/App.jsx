import { useState } from 'react';
import './App.css';

//Todo Practice
import Todo from './components/Todo.jsx';
//Show-Hide practice
import ShowHide from './components/Show-Hide.jsx';
import posts from './components/Show-Hide-posts';
import Profile from './components/Profile.jsx';
import CharacterLimit from './components/Character-Limit';

function App() {
  return (
    <div className="App">
      {/* <h1>TO DO Practice</h1>
      <Todo />
      <h1>Show-Hide Practice</h1>
      <ShowHide posts={posts} /> */}
      {/* <h1>Profile</h1>
      <Profile /> */}
      <h1>Character Limit</h1>
      <CharacterLimit />
    </div>
  );
}

export default App;

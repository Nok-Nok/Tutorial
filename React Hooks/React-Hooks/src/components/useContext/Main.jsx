import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './Nav.jsx';
import Home from './Home.jsx';
import Blog from './Blog.jsx';
import About from './About.jsx';
import LocaleContext from './LocaleContext.jsx';
import './styles.css';

/*
  Instructions:
    You're given a full app that uses Context.Consumer
    in order to grab values off of context. Your job is to
    refactor all of those to use the `useContext` Hook.
*/

function Main() {
  const [locale, setLocale] = React.useState('en');

  const toggleLocale = () => {
    setLocale((locale) => {
      return locale === 'en' ? 'es' : 'en';
    });
  };

  const value = React.useMemo(
    () => ({
      locale,
      toggleLocale,
    }),
    [locale]
  );

  return (
    <Router>
      <div className="App">
        <LocaleContext.Provider value={value}>
          <Nav />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </LocaleContext.Provider>
      </div>
    </Router>
  );
}

export default Main;

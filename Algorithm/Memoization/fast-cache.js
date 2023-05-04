/*
 define a function "fastCache" that takes one argument, a function, and returns a function. 
 When fastCache is invoked it creates an object that tracks calls to the returned function, where each input to the returned function is associated with its output. 
 Every subsequent call to that returned function with the same argument will return the output directly from the object, instead of invoking the original function again.
*/

const fastCache = (func) => {
  const cached = {};
  return (arg) => {
    if (!(arg in cached)) cached[arg] = func(arg);
    return cached[arg];
  };
};

/*
   Extension: Rewrite fastCache so it can handle array or object input, and any number of arguments.
   HINT: you might need to use the spread operator...
  */

const fastCacheAdvanced = (func) => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (!(key in cache)) cache[key] = func(...args);
    return cache[key];
  };
};

module.exports = { fastCache, fastCacheAdvanced };

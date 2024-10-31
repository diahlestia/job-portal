import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';

const rootElement = document.getElementById('root'); // Ensure this ID matches your HTML
const root = ReactDOM.createRoot(rootElement);

// Render your app with Redux Provider
root.render(
  <Provider store={store}> {/* Wrap your App with Provider */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// // src/index.js
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux'; // Import Provider
// import store from './store/store'; // Adjust the path to your store
// import App from './App'; // Adjust the path to your main App component

// // Create a root element
// const rootElement = document.getElementById('root'); // Ensure this ID matches your HTML
// const root = ReactDOM.createRoot(rootElement);

// // Render your app with Redux Provider
// root.render(
//   <Provider store={store}> {/* Wrap your App with Provider */}
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </Provider>
// );

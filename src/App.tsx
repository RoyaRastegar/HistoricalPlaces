import React from 'react';
import './App.css';
import AllPlaces from './components/AllPlaces.tsx';
import { Provider } from 'react-redux';
import store from './lib/redux/store.ts';
function App() {
  return (
    <Provider store={store}>
      <AllPlaces />
    </Provider>
  );
}

export default App;

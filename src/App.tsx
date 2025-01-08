import React from 'react';
import './App.css';
import AllPlaces from './components/AllPlaces.tsx';
import { Provider } from 'react-redux';
import store from './lib/redux/store.ts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlaceDetail from './components/PlaceDetail.tsx';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<AllPlaces />} />
          <Route path='/placedetails/:id' element={<PlaceDetail />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

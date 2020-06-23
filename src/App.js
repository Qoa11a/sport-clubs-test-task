import React from 'react';
import ClubList from './components/ClubList/ClubList';
import './App.scss';

function App() {
  return (
    <>
      <div className='header'>
        <h1 className='header__title'>Instasport</h1>
      </div>
      <ClubList />
    </>
  );
}

export default App;

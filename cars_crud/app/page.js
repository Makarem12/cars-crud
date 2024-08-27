'use client';
import React, { useContext } from 'react';
import CarsList from './components/CarsList'; // Capitalized 'CarsList'
import AddCars from './components/AddCar'; // Capitalized 'AddCar'
import LoginForm from './components/LoginForm';
import { AuthContext } from './context/Auth';

export default function Home() {
  const { tokens } = useContext(AuthContext);

  return (
    <div>
      {tokens ? (
        <>
          <CarsList />
          <AddCars />
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

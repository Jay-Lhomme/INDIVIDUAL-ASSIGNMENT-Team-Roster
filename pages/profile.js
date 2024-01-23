import React from 'react';
import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function Profile() {
  const { user } = useAuth();
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
        color: 'white',
      }}
    >
      <h1>Bye-Bye {user.displayName}</h1>
      <p>Click the button below to say goodbye...</p>
      <Button type="button" className="justify-content-center align-content-center" size="lg" variant="danger" onClick={signOut}>
        SIGN OUT
      </Button>
    </div>
  );
}

import React from 'react';
import opgImage from './opg.jpeg';

export default function App() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Dental Imaging Demo</h1>
      <p>Below is the uploaded OPG X-ray image:</p>
      <img 
        src={opgImage} 
        alt="OPG X-ray" 
        style={{ maxWidth: '80%', border: '2px solid #333', borderRadius: '8px' }} 
      />
    </div>
  );
}

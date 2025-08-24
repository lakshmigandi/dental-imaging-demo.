import React, { useState } from 'react';

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setResult('');
    }
  };

  const analyzeImage = () => {
    // Dummy analysis for now
    setResult("Possible dental caries detected in upper molar region.");
  };

  return (
    <div className="container">
      <h1>🦷 Dental Imaging Demo</h1>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {image && <img src={image} alt="Dental X-ray" />}
      <button onClick={analyzeImage}>Analyze X-ray</button>
      {result && <div className="result">AI Result: {result}</div>}
    </div>
  );
}

export default App;

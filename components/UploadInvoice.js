"use client";

import { useState } from 'react';

export default function UploadInvoice() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [ocrData, setOcrData] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage('');
    setOcrData('');
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Send image to backend
      const response = await fetch('http://localhost:3001/ocr/process', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('File uploaded successfully!');
        setOcrData(data.ocrData); // Display the OCR data
      } else {
        setMessage('Failed to upload the file.');
      }
    } catch (error) {
      setMessage('Failed to upload the file.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {message && <p>{message}</p>}
      {ocrData && (
        <div>
          <h3>OCR Data:</h3>
          <pre>{ocrData}</pre>
        </div>
      )}
    </div>
  );
}

"use client"
import React, { useState } from 'react';
import './VideoUpload.css';

function VideoUpload() {
  const [selectedVideo, setSelectedVideo] = useState();
  const [videoPreviewUrl, setVideoPreviewUrl] = useState();
  const [videoKey, setVideoKey] = useState(0);

  const handleVideoUpload = event => {
    const file = event.target.files[0];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const videoExtensions = ['mp4', 'mov', 'avi', 'flv', 'wmv', 'mkv'];

    if (!videoExtensions.includes(fileExtension)) {
      alert('Please select a valid video file');
      return;
    }

    setSelectedVideo(file);
    setVideoPreviewUrl(URL.createObjectURL(file));
    setVideoKey(prevKey => prevKey + 1);
  };

  const handleVideoSubmit = () => {
    if (!selectedVideo) {
      alert('Please select a video to upload');
      return;
    }

    const formData = new FormData();
    formData.append('video', selectedVideo);

    fetch('https://your-api-endpoint.com/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert('Video uploaded successfully');
      })
      .catch(error => {
        console.error(error);
        alert('Failed to upload video');
      });
  };

  return (
    <>
      <div style={{backgroundColor: '#f95959', padding: '10px'}}>
        <h1 style={{color: 'black', fontFamily: 'serif'}}>Upload a video</h1>
      </div>
      <div style={{margin: '20px', border: '3px solid black', padding: '20px'}}>
        <div className="video-upload" style={{border: '3px dashed black', backgroundColor: 'lightblue', padding: '10px', 
        margin: '10px', display:'flex', flexDirection:'column', alignItems: 'center', 
        justifyContent: 'center', fontFamily: 'serif',  color: 'black'}}>
          <label htmlFor="file-upload" className="file-input">
            Choose Files
          </label>
          <input id="file-upload" className="file-input" type="file" accept="video/*" onChange={handleVideoUpload} style={{display: 'none'}} />
          {videoPreviewUrl && (
            <div className="video-preview" style={{margin: '10px'}}>
              <video key={videoKey} width="640" controls>
                <source src={videoPreviewUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          <button className="upload-button" style={{color: 'black', fontFamily: 'serif', margin: '20px', border: 'none',
          padding: '10px 20px', fontSize: '16px', width: '120px', height: '40px', color: '#fff', backgroundColor: '#007BFF', borderRadius: '5px',cursor: 'pointer'}} onClick={handleVideoSubmit}>Upload</button>
        </div>
      </div>
    </>
  );
}

export default VideoUpload;

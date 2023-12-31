import React, { useState } from 'react'
import "./Home.css"
// import { useNavigate } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

// Add the icons you want to use to the library
library.add(faCloudUploadAlt);

//import { useDropzone } from 'react-dropzone';



const Home = () => {

  const [file, setFile] = useState(null);
  const [upload,setUpload]= useState("Upload");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if(upload==='Upload')
    {
      setUpload('Downloading');
    }
    else{
      setUpload('Upload');
    }
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          // Handle success
          console.log('File uploaded successfully.');
        } else {
          // Handle errors
          console.error('File upload failed. Server responded with status:', response.status);
        }
      } catch (error) {
        console.error('File upload failed. Network error:', error);
      }
    }
  };

  return (
    <div className="container">
      <h1>HTML to Word Converter</h1>
  {/* <label htmlFor="file-upload" className="file-label">
    <input
      type="file"
      id="file-upload"
      accept=".html, .css"
      onChange={handleFileChange}
      className="file-input"
    />
    <span className="file-cta">
      <span className="file-icon">
        <i className="fas fa-cloud-upload-alt"></i>
      </span>
    </span>
  </label> */}
  {
      file?
    <label for="inputTag">
        <i class='fa fa-file-download fa-3x '> </i>
        <input id="inputTag" type="file" onChange={handleFileChange}/>
        <br/>
        <span id="imageName"></span>
      </label>:
      <label for="inputTag">
      <i class='fa fa-camera fa-3x'></i>
      <input id="inputTag" type="file" onChange={handleFileChange}/>
      <br/>
      <span id="imageName"></span>
    </label>
}
  <button onClick={handleUpload} className="upload-button">
    {upload}
  </button>
</div>
  );
}

export default Home
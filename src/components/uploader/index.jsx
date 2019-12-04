import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import DragBox from "./drag-box";
import ProgressBar from "./progress-bar";
import UploadSuccess from "./upload-success";
import ImageList from "./image-list";
import Webcam from "./webcam";

function Uploader({ submitPhoto, successCallback = null, multiple = true }) {
  const [images, setImages] = useState([]);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showWebcam, setShowWebcam] = useState(false);
  const history = useHistory();

  const fileInput = useRef(null);

  const setNewImages = files => {
    if (multiple) {
      const newFiles = Array.from(files);
      const newImages = [...newFiles, ...images];
      setImages(newImages);
    } else {
      setImages([files[0]]);
    }
  };

  const handleImageChange = e => {
    setNewImages(e.target.files);
  };

  const handleUploadProgress = e => {
    const progress = Math.floor((e.loaded / e.total) * 100);
    setProgress(progress);
  };

  const uploadImages = async e => {
    e.preventDefault();

    const response = await submitPhoto(images, handleUploadProgress);

    setSuccess(true);
    setProgress(0);
    setImages([]);

    setTimeout(() => {
      setSuccess(false);
      localStorage.setItem("display_mode", "all");
      history.push("/");
    }, 1000);

    // If success callback is passed, call it with the request
    successCallback && successCallback(response);
  };

  const handleDrop = files => {
    setNewImages(files);
  };

  const openFileViewer = e => {
    e.preventDefault();
    fileInput.current.click();
  };

  const openWebcam = e => {
    e.preventDefault();
    setShowWebcam(true);
  };

  const closeWebcam = e => {
    e.preventDefault();
    setShowWebcam(false);
  };

  const saveWebcamImage = file => {
    setNewImages([file]);
    setShowWebcam(false);
  };

  return (
    <DragBox onDrop={handleDrop}>
      <ImageList images={images} />

      <p className="Uploader-text">
        Drop your images or <span onClick={openFileViewer}>select them</span> or{" "}
        <span onClick={openWebcam}>take a photo</span>
      </p>

      {showWebcam && (
        <Webcam closeWebcam={closeWebcam} savePicture={saveWebcamImage} />
      )}

      <input
        type="file"
        accept="image/png, image/jpeg"
        name="image"
        onChange={handleImageChange}
        hidden
        multiple={multiple}
        ref={fileInput}
      />

      <button className="Uploader-button" onClick={uploadImages}>
        {!!progress ? "Uploading" : "Upload"}
      </button>

      {!!progress && <ProgressBar progress={progress} />}
      {progress === 100 && "Processing images in our servers."}

      {success && <UploadSuccess />}
    </DragBox>
  );
}

export default Uploader;

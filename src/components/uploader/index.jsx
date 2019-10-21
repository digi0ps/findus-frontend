import React, { useState, useRef } from "react";

import DragBox from "./drag-box";
import ProgressBar from "./progress-bar";
import UploadSuccess from "./upload-success";
import ImageList from "./image-list";
import Webcam from "./webcam";

import { post_photo } from "../../helpers/api";

function Uploader({ addNewPhoto, multiple = true }) {
  const [images, setImages] = useState([]);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showWebcam, setShowWebcam] = useState(false);

  const fileInput = useRef(null);

  const setNewImages = files => {
    const newFiles = Array.from(files);
    const newImages = [...newFiles, ...images];
    setImages(newImages);
  };

  const handleImageChange = e => {
    setNewImages(e.target.files);
  };

  const handleUploadProgress = e => {
    const thisImageProgress = (e.loaded / e.total) * 100;
    const totalProgress = Math.round(
      (progress + thisImageProgress) / images.length,
    );

    setProgress(totalProgress);
  };

  const uploadImages = async e => {
    e.preventDefault();
    const requests = [];

    for (const image of images) {
      let form_data = new FormData();
      form_data.append("image", image, image.name);
      requests.push(post_photo(form_data, handleUploadProgress));
    }

    const responses = await Promise.all(requests).catch(err => {
      console.error("UHOH");
      return;
    });

    const photos = responses.map(resp => resp.data);
    addNewPhoto(photos);

    setSuccess(true);
    setImages([]);
    setProgress(0);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
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
    const newImages = [file, ...images];
    setImages(newImages);
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

      {success && <UploadSuccess />}
    </DragBox>
  );
}

export default Uploader;

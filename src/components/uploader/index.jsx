import React, { useState, useRef } from "react";

import DragBox from "./drag-box";
import ProgressBar from "./progress-bar";
import UploadSuccess from "./upload-success";
import ImageList from "./image-list";

import { post_photo } from "../../helpers/api";

function Uploader({ addNewPhoto, multiple = true }) {
  const [images, setImages] = useState([]);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

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

    setProgress(totalProgress - 1);
  };

  const handleSubmit = async e => {
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
    setImages(null);
    setProgress(100);

    setTimeout(() => {
      setSuccess(false);
      setProgress(0);
    }, 3000);
  };

  const handleDrop = files => {
    setNewImages(files);
  };

  const openFileViewer = e => {
    e.preventDefault();
    console.log(fileInput);
    fileInput.current.click();
  };

  return (
    <DragBox onDrop={handleDrop}>
      <ImageList images={images} />

      <p className="Uploader-text">
        Drop your images or <span onClick={openFileViewer}>select them</span>
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/png, image/jpeg"
          name="image"
          onChange={handleImageChange}
          hidden
          multiple={multiple}
          ref={fileInput}
        />
        <input type="submit" value="Upload" />
      </form>

      {!!progress && <ProgressBar progress={progress} />}

      {success && <UploadSuccess />}
    </DragBox>
  );
}

export default Uploader;

import React, { useState } from "react";

import DragBox from "./drag-box";

import { post_photo } from "../../helpers/api";

function Uploader({ addNewPhoto, multiple = true }) {
  const [images, setImages] = useState(null);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleImageChange = e => {
    setImages(e.target.files);
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

  return (
    <DragBox>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/png, image/jpeg"
          name="image"
          onChange={handleImageChange}
          required
          multiple={multiple}
        />
        <input type="submit" value="Upload" />
      </form>
      {!!progress && <p>{progress}% uploaded</p>}
      {success && (
        <p className="Uploader-success">Image Uploaded Successfully</p>
      )}
    </DragBox>
  );
}

export default Uploader;

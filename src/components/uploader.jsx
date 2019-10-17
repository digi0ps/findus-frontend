import React, { useState } from "react";
import { post_photo } from "../helpers/api";

function Uploader({ addNewPhoto, multiple = false }) {
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleImageChange = e => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("image", image, image.name);

    const data = await post_photo(form_data);

    if (data && data.id) {
      setSuccess(true);
      addNewPhoto(data);
      setImage(null);

      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div className="Uploader">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/png, image/jpeg"
          name="image"
          onChange={handleImageChange}
          required
        />
        <input type="submit" value="Upload" />
      </form>
      {success && (
        <p className="Uploader-success">Image Uploaded Successfully</p>
      )}
    </div>
  );
}

export default Uploader;

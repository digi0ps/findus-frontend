import React from "react";
import { openBlobInNewTab } from "../../helpers/utils";

export default function ImageList({ images }) {
  console.log(images);
  return (
    <div className="ImageList">
      {images.map(image => (
        <p
          className="Image"
          key={image.lastModified}
          onClick={openBlobInNewTab(image)}
        >
          {image.name}
        </p>
      ))}
    </div>
  );
}

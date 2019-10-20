import React from "react";

export default function ImageList({ images }) {
  console.log(images);
  return (
    <div className="ImageList">
      {images.map(image => (
        <p className="Image" key={image.lastModified}>
          {image.name}
        </p>
      ))}
    </div>
  );
}

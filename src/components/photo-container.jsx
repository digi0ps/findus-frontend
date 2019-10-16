import React from "react";
import Photo from "./photo";

function PhotoContainer({ title, photos }) {
  return (
    <div>
      <h2 className="Photos-header">{title}</h2>
      <div className="Photos-container">
        {photos.map(photo => (
          <Photo key={photo.id} {...photo} />
        ))}
      </div>
    </div>
  );
}

export default PhotoContainer;

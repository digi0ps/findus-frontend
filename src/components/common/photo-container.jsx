import React from "react";
import Photo from "../photo";

function PhotoContainer({ title, photos, isGrouped = false }) {
  return (
    <div>
      <h2 className="Photos-header">{title}</h2>
      <div className="Photos-container">
        {photos.map(photo => (
          <Photo isGrouped={isGrouped} key={photo.id} {...photo} />
        ))}
        {!photos.length && "No photos here."}
      </div>
    </div>
  );
}

export default PhotoContainer;

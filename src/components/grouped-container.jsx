import React from "react";
import PhotoContainer from "./photo-container";

function GroupedContainer({ bucket }) {
  return (
    <div className="Grouped-container">
      {Object.entries(bucket).map(([person_name, photos]) => (
        <PhotoContainer title={person_name} photos={photos} />
      ))}
    </div>
  );
}

export default GroupedContainer;

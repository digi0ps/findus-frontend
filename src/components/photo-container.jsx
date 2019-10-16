import React from "react";

function PhotoContainer({ title, children }) {
  return (
    <div>
      <h2 className="Photos-header">{title}</h2>
      <div className="Photos-container">{children}</div>
    </div>
  );
}

export default PhotoContainer;

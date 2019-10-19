import React, { useState, useRef } from "react";

function DragBox({
  children,
  onDrop = () => null,
  dragText = "Drop your photos here",
}) {
  const [dragging, setDragging] = useState(0);
  const dragBox = useRef(null);

  const preventEvent = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = e => {
    preventEvent(e);
    setDragging(dragging + 1);
  };

  const handleDragLeave = e => {
    preventEvent(e);

    if (!dragging) return;

    setDragging(dragging - 1);
  };

  const handleDrop = e => {
    preventEvent(e);
    console.log(e.dataTransfer);
    setDragging(0);
    const { files } = e.dataTransfer;
    if (files && files.length) {
      onDrop(files);
      e.dataTransfer.clearData();
    }
  };

  return (
    <div
      className="Dragbox"
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={preventEvent}
      onDrop={handleDrop}
      ref={dragBox}
    >
      {!!dragging && (
        <div className="Cover">
          <p>{dragText}</p>
        </div>
      )}

      {children}
    </div>
  );
}

export default DragBox;

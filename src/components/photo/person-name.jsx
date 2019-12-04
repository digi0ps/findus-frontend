import React, { useState, useRef } from "react";
import { post_person } from "../../helpers/api";

function PersonName({ person }) {
  const text = person ? person.name : "Couldn't identify.";

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(text);
  const inputEl = useRef(null);

  const handleClick = e => setEditMode(true);
  const handleChange = e => setName(e.target.value);

  const handleBlur = async e => {
    e.preventDefault();
    if (name === text) {
      setEditMode(false);
      return;
    }

    const data = {
      person_id: person.id,
      name,
    };

    const response = await post_person(data);
    if (response && response.person_name) {
      setEditMode(false);
    }
  };

  return (
    <span className="Person-name" onClick={handleClick}>
      {person && editMode ? (
        <input
          type="text"
          ref={inputEl}
          value={name}
          autoFocus
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ) : (
        name
      )}
    </span>
  );
}

export default PersonName;

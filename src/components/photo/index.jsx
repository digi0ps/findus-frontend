import React, { useState } from "react";

// import Loader from "./loader";
import PersonName from "./person-name";
import { BASE_URL } from "../../helpers/constants";

function Photo({ id, image, persons, isGrouped }) {
  const [isLoading, setIsLoading] = useState(true);
  const handleOnLoad = () => setIsLoading(false);

  return (
    <div className="Photo" key={id}>
      <div className={isLoading ? "hidden" : ""}>
        <img
          alt="Gallery"
          height="200px"
          src={`${BASE_URL}${image}`}
          onLoad={handleOnLoad}
        />
        <br />
        {!isGrouped &&
          persons.map(person => <PersonName key={person.id} person={person} />)}
      </div>
    </div>
  );
}

export default Photo;

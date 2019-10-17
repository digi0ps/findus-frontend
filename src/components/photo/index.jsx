import React, { useState } from "react";

// import Loader from "./loader";
import PersonName from "../person-name";
import { BASE_URL } from "../../helpers/constants";

function Photo({ id, image, persons }) {
  const [isLoading, setIsLoading] = useState(true);
  const handleOnLoad = () => setIsLoading(false);

  return (
    <div className="photo" key={id}>
      <div className={isLoading ? "hidden" : ""}>
        <img
          alt="Gallery"
          height="200px"
          src={`${BASE_URL}${image}`}
          onLoad={handleOnLoad}
        />
        <br />
        <PersonName person={persons} />
      </div>
    </div>
  );
}

export default Photo;

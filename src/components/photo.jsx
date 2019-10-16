import React from "react";

import PersonName from "./person-name";
import { BASE_URL } from "../helpers/constants";

function Photo({ id, image, persons }) {
  return (
    <div className="photo" key={id}>
      <img alt="Gallery" height="200px" src={`${BASE_URL}${image}`} />
      <br />
      <PersonName person={persons} />
    </div>
  );
}

export default Photo;

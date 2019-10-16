import React from "react";

import PersonName from "./person-name";
import { BASE_URL } from "../../helpers/constants";

function Photo({ id, image, persons }) {
  return (
    <div className="photo" key={id}>
      <img alt="Gallery" height="300px" src={`${BASE_URL}${image}`} />
      <br />
      People in picture: <PersonName photoid={id} person={persons} />
      <hr />
    </div>
  );
}

export default Photo;

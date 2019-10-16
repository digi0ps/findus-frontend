import React from "react";
import { BASE_URL } from "../../helpers/constants";

function Photo({ id, image, persons }) {
  return (
    <div className="photo" key={id}>
      <img alt="Gallery" height="300px" src={`${BASE_URL}${image}`} />
      <br />
      People in picture: {persons ? persons.person_name : "Couldn't identify."}
      <hr />
    </div>
  );
}

export default Photo;

import React, { useState } from "react";

import GroupedContainer from "../home/grouped-container";

import Uploader from "../uploader";

import { post_search } from "../../helpers/api";

function Search() {
  const [result, setResult] = useState(null);
  const [isFound, setIsFound] = useState(false);

  const handleSubmit = async (...args) => {
    const data = await post_search(...args);
    setIsFound(data.found);
    setResult(data.result);

    console.log(data);
  };

  return (
    <div className="Search">
      <Uploader submitPhoto={handleSubmit} multiple={false} />
      <div className="Search-result">
        {result
          ? `Found ${Object.keys(result).length} person(s) in the image`
          : "Upload an image to fetch images of all persons in it"}
        {result ? (
          isFound ? (
            <GroupedContainer bucket={result} />
          ) : (
            "Oops couldn't match with any existing persons."
          )
        ) : null}
      </div>
    </div>
  );
}

export default Search;

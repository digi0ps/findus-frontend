import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = () => (
  <ContentLoader
    height={250}
    width={250}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="0" y="70" rx="5" ry="5" width="250" height="250" />
  </ContentLoader>
);

export default MyLoader;

import React from "react";

import PhotoContainer from "./photo-container";
import GroupedContainer from "./grouped-container";

export default function Home({ isLoading, photos, bucket, mode, toggleMode }) {
  return (
    <>
      <aside>
        Mode <button onClick={toggleMode}>{mode}</button>
      </aside>

      {isLoading ? "Your photos are loading" : null}

      <main>
        {mode === "all" ? (
          <PhotoContainer title="All Photos" photos={photos} />
        ) : (
          <GroupedContainer bucket={bucket} />
        )}
      </main>
    </>
  );
}

import React, { useState, useEffect } from "react";
import * as api from "./helpers/api";

import Uploader from "./components/uploader";
import PhotoContainer from "./components/photo-container";
import GroupedContainer from "./components/grouped-container";

import { groupPhotosIntoBucket } from "./helpers/utils";
import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const photos = await api.get_photos();
      const persons = await api.get_persons();

      setPhotos(photos.reverse());
      setPersons(persons);
      setLoading(false);
    }

    fetchData();
  }, []);

  const addNewPhoto = newPhoto => {
    setPhotos([newPhoto, ...photos]);
  };

  const bucket = groupPhotosIntoBucket(persons, photos);

  const [mode, setMode] = useState(localStorage["display_mode"] || "all");

  useEffect(() => {
    localStorage["display_mode"] = mode;
  }, [mode]);

  const toggleMode = () => setMode(mode === "all" ? "grouped" : "all");

  return (
    <div className="App">
      <header className="App-header">FindUs - People Gallery</header>
      <aside>
        Upload image: <Uploader addNewPhoto={addNewPhoto} />
        <br />
        Mode: <button onClick={toggleMode}>{mode}</button>
      </aside>
      {loading ? "Your photos are loading" : null}
      <main>
        {mode === "all" ? (
          <PhotoContainer title="All Photos" photos={photos} />
        ) : (
          <GroupedContainer bucket={bucket} />
        )}
      </main>
    </div>
  );
}

export default App;

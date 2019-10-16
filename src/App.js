import React, { useState, useEffect } from "react";
import * as api from "./helpers/api";

import Photo from "./components/photo";
import Uploader from "./components/uploader";

import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const photos = await api.get_photos();

      setPhotos(photos.reverse());
      setLoading(false);
    }

    fetchData();
  }, []);

  const addNewPhoto = newPhoto => {
    setPhotos([newPhoto, ...photos]);
  };

  return (
    <div className="App">
      <header className="App-header">FindUs - People Gallery</header>
      <aside>
        Upload image: <Uploader addNewPhoto={addNewPhoto} />
        <br />
        <br />
      </aside>
      <main>
        {loading ? "Your photos are loading" : null}
        {photos.map(photo => (
          <Photo key={photo.id} {...photo} />
        ))}
      </main>
    </div>
  );
}

export default App;

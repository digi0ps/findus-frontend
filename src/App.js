import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://127.0.0.1:8000";

  useEffect(() => {
    async function fetchData() {
      const url = `${BASE_URL}/api/gallery/`;
      const response = await axios(url);

      setPhotos(response.data);
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">FindUs - People Gallery</header>
      <main>
        {loading ? "Your photos are loading" : null}
        {photos.map(photo => (
          <div className="photo" key={photo.id}>
            <img
              alt="Gallery"
              height="300px"
              src={`${BASE_URL}${photo.image}`}
            />
            <br />
            People in picture: {photo.persons.person_name}
            <hr />
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;

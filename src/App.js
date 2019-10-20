import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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

  const addNewPhoto = newPhotos => {
    setPhotos([...newPhotos, ...photos]);
  };

  const bucket = useMemo(() => groupPhotosIntoBucket(persons, photos), [
    persons,
    photos,
  ]);

  const [mode, setMode] = useState(localStorage["display_mode"] || "all");

  useEffect(() => {
    localStorage["display_mode"] = mode;
  }, [mode]);

  const toggleMode = () => setMode(mode === "all" ? "grouped" : "all");

  return (
    <div className="App">
      <header className="App-header">FindUs - People Gallery</header>

      <Router>
        <Switch>
          <Route path="/uploader/" strict>
            <Uploader addNewPhoto={addNewPhoto} />
          </Route>
          <Route path="/" strict>
            <aside>
              Mode <button onClick={toggleMode}>{mode}</button>
            </aside>

            {loading ? "Your photos are loading" : null}

            <main>
              {mode === "all" ? (
                <PhotoContainer title="All Photos" photos={photos} />
              ) : (
                <GroupedContainer bucket={bucket} />
              )}
            </main>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import * as api from "./helpers/api";

import Home from "./components/home";
import Uploader from "./components/uploader";

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
      <Router>
        <header className="App-header">
          <Link to="/">FindUS</Link>
        </header>

        <Switch>
          <Route path="/uploader/" strict>
            <Uploader addNewPhoto={addNewPhoto} />
          </Route>
          <Route path="/" strict>
            <Home
              photos={photos}
              bucket={bucket}
              isLoading={loading}
              mode={mode}
              toggleMode={toggleMode}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

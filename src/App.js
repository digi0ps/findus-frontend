import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { usePhotos, usePersons } from "./helpers/hooks";

import Home from "./components/home";
import Uploader from "./components/uploader";

import { groupPhotosIntoBucket } from "./helpers/utils";
import "./App.css";

function App() {
  const persons = usePersons();
  const [photos, loading, addNewPhoto] = usePhotos();

  const bucket = useMemo(() => groupPhotosIntoBucket(persons, photos), [
    persons,
    photos,
  ]);

  const [mode, setMode] = useState(localStorage["display_mode"] || "all");
  const toggleMode = () => setMode(mode === "all" ? "grouped" : "all");

  useEffect(() => {
    localStorage["display_mode"] = mode;
  }, [mode]);

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Link to="/">FindUS</Link>
          <Link to="/uploader/">Upload</Link>
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

import { useState, useEffect } from "react";
import * as api from "./api";

export function usePhotos() {
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

  const addNewPhoto = newPhotos => {
    setPhotos([...newPhotos, ...photos]);
  };

  return [photos, loading, addNewPhoto];
}

export function usePersons() {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const persons = await api.get_persons();
      setPersons(persons);
    }

    fetchData();
  }, []);

  return persons;
}

export const groupPhotosIntoBucket = (persons, photos) => {
  const bucket = {};

  persons.forEach(({ id, person_name }) => {
    bucket[person_name] = photos.filter(
      photo => photo.persons.findIndex(p => p.id === id) > -1,
    );
  });

  return bucket;
};

export const openBlobInNewTab = blob => e => {
  e.preventDefault();
  const w = window.open("");
  w.onload = () => {
    w.location = URL.createObjectURL(blob);
  };
};

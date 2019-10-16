export const groupPhotosIntoBucket = (persons, photos) => {
  const bucket = {};

  persons.forEach(({ id, person_name }) => {
    bucket[person_name] = photos.filter(
      photo => photo.persons && photo.persons.id === id,
    );
  });

  return bucket;
};

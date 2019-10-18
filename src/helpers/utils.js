export const groupPhotosIntoBucket = (persons, photos) => {
  const bucket = {};

  persons.forEach(({ id, person_name }) => {
    bucket[person_name] = photos.filter(
      photo => photo.persons.findIndex(p => p.person_name === person_name) > -1,
    );
  });

  return bucket;
};

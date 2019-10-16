import axios from "axios";
import { BASE_URL } from "./constants";

export async function get_photos() {
  const url = `${BASE_URL}/api/gallery/`;
  const response = await axios(url);

  return response.data;
}

export async function get_persons() {
  const url = `${BASE_URL}/api/person/`;
  const response = await axios(url);

  return response.data;
}

export async function post_photo(form_data) {
  const url = `${BASE_URL}/api/gallery/`;
  const response = await axios.post(url, form_data, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });

  return response.data;
}

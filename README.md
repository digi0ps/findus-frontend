# FindUS - The People Gallery

📚Frontend for the project FindUs done for the course Content Based Image Retrieval (CSE3018). 📚

⚛️ Done completely using **Hooks** in **React** ⚛️

## About FindUs

FindUs is a Web App which gives users a *photo gallery on steroids*. User's can upload and store images on the website. The faces of people are identified in the images uploaded. This allows user to label them, group photos by person and retrieve similar images of a person from a search image.

## Features
- Upload multiple images using file-chooser, drag & drop or webcam.
- Label Person names on the fly.
- View all photos or group them by person.
- Upload an image of a person to display other photos of that person.


## Routes
`/`: Home, where all photos are displayed.

`/uploader`: Uploader, where you can upload images to the gallery.

`/search`: Search, to upload an image and get photos of all thee persons in the image.

## Structure
- `src/`: Contains the root container for App and folders for sub components.
  - `components/`: Contains all React component code. Subfolder for each major component. Common folder for components being shared multiple components.
  - `helpers/`: Contains JavaScript code which provide utility to React components.
    - `api.js`: Abstracts all API calls into function calls.
    - `hooks.js`: Adds custom hooks to manage photos and persons.

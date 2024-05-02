export const constant = {
  cardList: {
    fullName: "Full Name",
    age: "Age",
  },
  common: {
    title: "Contact App",
  },
  form : {
    Submit: "Save Changes",
    firstName: "First Name",
    lastName: "Last Name",
  },
  link: {
    emptyProfile: "https://res.cloudinary.com/dpnjbs730/image/upload/v1714620156/goloojgekk7f30gzdawe.jpg"
  }
};

export const config = {
  cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
  uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
};

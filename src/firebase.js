// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-86025.firebaseapp.com",
  projectId: "mern-estate-86025",
  storageBucket: "mern-estate-86025.firebasestorage.app",
  messagingSenderId: "1088259577551",
  appId: "1:1088259577551:web:d7ec46da20e733037289ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app};

// import React from 'react'
// import { Cloudinary } from '@cloudinary/url-gen';
// import { auto } from '@cloudinary/url-gen/actions/resize';
// import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
// import { AdvancedImage } from '@cloudinary/react';

// const App = () => {
//   const cld = new Cloudinary({ cloud: { cloudName: 'dzqlawzxf' } });
  
//   // Use this sample image or upload your own via the Media Explorer
//   const img = cld
//         .image('cld-sample-5')
//         .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
//         .quality('auto')
//         .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

//   return (<AdvancedImage cldImg={img}/>);
// };

// export default App;

// import { v2 as cloudinary } from 'cloudinary';

// // Cloudinary Configuration
// cloudinary.config({
//     cloud_name: 'dzqlawzxf',
//     api_key: '945116645385391',
//     api_secret: import.meta.VITE_CLOUDINARY_API_KEY, // Replace with your actual API secret
// });

// /**
//  * Upload a single image to Cloudinary.
//  * @param {File} file - The file to upload.
//  * @returns {Promise<string>} - The secure URL of the uploaded image.
//  */
// export const uploadImage = async (file) => {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();

//         // Convert file to Base64
//         reader.onload = async () => {
//             try {
//                 const result = await cloudinary.uploader.upload(reader.result, {
//                     folder: 'listings', // Optional: folder to organize files
//                 });
//                 resolve(result.secure_url);
//             } catch (error) {
//                 reject(error);
//             }
//         };

//         reader.onerror = (error) => {
//             reject(error);
//         };

//         reader.readAsDataURL(file); // Read file as Base64
//     });
// };

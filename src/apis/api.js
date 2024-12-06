import axios from "axios";
// VITE_BACKEND_URL= https://job-finder-backend-1444.onrender.com
//  VITE_BACKEND_URL= https://localhost:3000
// const backendUrl = "http://localhost:3000";
const backendUrl = "https://job-finder-backend-1444.onrender.com";
const api = axios.create({
  baseURL:backendUrl,
//   baseURL:"https://job-finder-backend-1444.onrender.com",

//   headers: {
//     "Content-Type": "application/json",
//   },
});


export default api;
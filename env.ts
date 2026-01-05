import {  EnvEnum } from "./src/enums/index";



export const appEnv = {
  [EnvEnum.PRODUCTION]: {
    apiUrl: "https://salarylnb-backend.onrender.com/",
    // Ajoutez d'autres variables d'environnement si nécessaire
  },
  [EnvEnum.LOCAL]: {
    apiUrl: "http://localhost:3000",
    // Ajoutez d'autres variables d'environnement si nécessaire
  },
  [EnvEnum.TEST]: {
    apiUrl: "https://staging-api.example.com",
    // Ajoutez d'autres variables d'environnement si nécessaire
  },
};

//
import axios from "axios";

const instance = axios.create({
  baseURL: "https://omsappapi.azurewebsites.net/api/",
});

export default instance;
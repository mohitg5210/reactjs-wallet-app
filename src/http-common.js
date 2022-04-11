import axios from "axios";

export default axios.create({
  baseURL: "https://61f8ee0b783c1d0017c4482c.mockapi.io/api/v1",
  headers: {
    "Content-type": "application/json"
  }
});
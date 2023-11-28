import axios from "axios"

const baseURL = "http://192.168.31.66:8080"

export const instance = axios.create({
  baseURL: `${baseURL}/api`,
});
import axios from "axios";
import { MyEvent } from "@/types";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getEvents(perPage: number, page: number) {
    return apiClient.get(`/events?_limit=${perPage}&_page=${page}`);
  },
  getEvent(id: number) {
    return apiClient.get("/events/" + id);
  },
  postEvent(event: MyEvent) {
    return apiClient.post("/events", event);
  }
};

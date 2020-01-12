import Vue from "vue";
import Vuex from "vuex";
import { AppState, User, MyEvent } from "@/types";
import EventService from "@/services/EventService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: "abc123", name: "Adam Jahr" } as User,
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community"
    ],
    events: [] as MyEvent[]
  } as AppState,
  mutations: {
    ADD_EVENT(state: AppState, event: MyEvent) {
      state.events.push(event);
    }
  },
  actions: {
    createEvent({ commit }, event: MyEvent) {
      return EventService.postEvent(event).then(() => {
        commit("ADD_EVENT", event);
      });
    }
  },
  getters: {
    catLength: (state: AppState): number => state.categories.length,
    getEventById: (state: AppState) => (id: number) =>
      state.events.find(event => event.id === id)
  },
  modules: {}
});

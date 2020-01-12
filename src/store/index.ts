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
    events: [] as MyEvent[],
    event: null
  } as AppState,
  mutations: {
    ADD_EVENT(state: AppState, event: MyEvent) {
      state.events.push(event);
    },
    SET_EVENTS(state: AppState, events: MyEvent[]) {
      state.events = events;
    },
    SET_EVENT(state: AppState, event: MyEvent) {
      state.event = event;
    },
    SET_EVENTS_TOTAL(state: AppState, eventsTotal: number) {
      state.eventsTotal = eventsTotal;
    }
  },
  actions: {
    createEvent({ commit }, event: MyEvent) {
      return EventService.postEvent(event).then(() => {
        commit("ADD_EVENT", event);
      });
    },

    fetchEvents({ commit }, { perPage, page }) {
      return EventService.getEvents(perPage, page)
        .then(response => {
          commit(
            "SET_EVENTS_TOTAL",
            parseInt(response.headers["x-total-count"])
          );
          commit("SET_EVENTS", response.data);
        })
        .catch(error => {
          console.warn("There was an eroor: " + error.response);
        });
    },

    fetchEvent({ commit, getters }, eventId: number) {
      const event = getters.getEventById(eventId);
      if (event) {
        commit("SET_EVENT", event);
      } else {
        EventService.getEvent(eventId)
          .then(response => {
            commit("SET_EVENT", response.data);
          })
          .catch(error => {
            console.warn("There was an eroor: " + error.response);
          });
      }
    }
  },
  getters: {
    catLength: (state: AppState): number => state.categories.length,
    getEventById: (state: AppState) => (id: number) =>
      state.events.find(event => event.id === id)
  },
  modules: {}
});

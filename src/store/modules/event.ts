import EventService from "@/services/EventService";
import { MyEvent, EventState } from "@/types";

export const namespaced = true;

export const state = {
  events: [] as MyEvent[],
  event: null,
  eventsTotal: 0
};

export const mutations = {
  ADD_EVENT(state: EventState, event: MyEvent) {
    state.events.push(event);
  },
  SET_EVENTS(state: EventState, events: MyEvent[]) {
    state.events = events;
  },
  SET_EVENT(state: EventState, event: MyEvent) {
    state.event = event;
  },
  SET_EVENTS_TOTAL(state: EventState, eventsTotal: number) {
    state.eventsTotal = eventsTotal;
  }
};
export const actions = {
  createEvent({ commit }: { commit: Function }, event: MyEvent) {
    return EventService.postEvent(event).then(() => {
      commit("ADD_EVENT", event);
    });
  },

  fetchEvents(
    { commit }: { commit: Function },
    { perPage, page }: { perPage: number; page: number }
  ) {
    return EventService.getEvents(perPage, page)
      .then(response => {
        commit("SET_EVENTS_TOTAL", parseInt(response.headers["x-total-count"]));
        commit("SET_EVENTS", response.data);
      })
      .catch(error => {
        console.warn("There was an eroor: " + error.response);
      });
  },

  fetchEvent(
    { commit, getters }: { commit: Function; getters: eventGetters },
    eventId: number
  ) {
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
};

export const getters = {
  getEventById: (state: EventState) => (id: number) =>
    state.events.find(event => event.id === id)
};

type eventGetters = {
  getEventById: Function;
};

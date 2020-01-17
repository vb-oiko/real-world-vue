import EventService from "@/services/EventService";
import { MyEvent, EventState, Notification, NotificationState } from "@/types";

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
  createEvent(
    { commit, dispatch }: { commit: Function; dispatch: Function },
    event: MyEvent
  ) {
    return EventService.postEvent(event)
      .then(() => {
        commit("ADD_EVENT", event);

        const notification = {
          type: "success",
          message: "Your event has been created"
        } as Notification;

        dispatch("notification/add", notification, { root: true });
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: "There was an error creating your event: " + error.message
        } as Notification;

        dispatch("notification/add", notification, { root: true });

        throw error;
      });
  },

  fetchEvents(
    { commit, dispatch }: { commit: Function; dispatch: Function },
    { perPage, page }: { perPage: number; page: number }
  ) {
    return EventService.getEvents(perPage, page)
      .then(response => {
        commit("SET_EVENTS_TOTAL", parseInt(response.headers["x-total-count"]));
        commit("SET_EVENTS", response.data);
      })
      .catch(error => {
        const notification = {
          type: "error",
          message: "There was an error fetching events: " + error.message
        } as Notification;

        dispatch("notification/add", notification, { root: true });
      });
  },

  fetchEvent(
    {
      commit,
      getters,
      dispatch
    }: { commit: Function; getters: eventGetters; dispatch: Function },
    eventId: number
  ) {
    const event = getters.getEventById(eventId);
    if (event) {
      commit("SET_EVENT", event);
      return event;
    } else {
      return EventService.getEvent(eventId)
        .then(response => {
          commit("SET_EVENT", response.data);
          return response.data;
        })
        .catch(error => {
          const notification = {
            type: "error",
            message: "There was an error fetching event: " + error.message
          } as Notification;

          dispatch("notification/add", notification, { root: true });
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

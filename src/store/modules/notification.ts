import { Notification, NotificationState } from "@/types";

export const namespaced = true;

export const state: NotificationState = {
  notifications: []
};

let nextId = 1;

export const mutations = {
  PUSH(state: NotificationState, notification: Notification) {
    state.notifications.push({
      ...notification,
      id: nextId
    });
    nextId += 1;
  },

  DELETE(state: NotificationState, notificationId: number) {
    state.notifications = state.notifications.filter(
      notification => notification.id !== notificationId
    );
  }
};

export const actions = {
  add({ commit }: { commit: Function }, notification: Notification) {
    commit("PUSH", notification);
  },
  remove({ commit }: { commit: Function }, notificationId: number) {
    commit("DELETE", notificationId);
  }
};

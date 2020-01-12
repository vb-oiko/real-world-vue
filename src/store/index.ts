import Vue from "vue";
import Vuex from "vuex";
import { AppState } from "@/types";
import * as user from "@/store/modules/user";
import * as event from "@/store/modules/event";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    event
  },
  state: {
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community"
    ]
  } as AppState,
  getters: {
    catLength: (state: AppState): number => state.categories.length
  }
});

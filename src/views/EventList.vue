<template>
  <div class="about">
    <h1>Events for {{ user.user.name }}</h1>
    <event-card v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Previuos Page</router-link
      >
    </template>
    <template v-else>
      <span style="fontWeight:600; color: grey;">Previuos Page</span>
    </template>
    |
    <template v-if="page * event.perPage < event.eventsTotal">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
        >Next Page</router-link
      >
    </template>
    <template v-else>
      <span style="fontWeight:600; color: grey;">Next Page</span>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EventCard from "../components/EventCard.vue";
import { mapState } from "vuex";
import store from "@/store";

function getPageEvents(routeTo: any, next: Function) {
  const curentPage = parseInt(routeTo.query.page as string) || 1;
  store
    .dispatch("event/fetchEvents", {
      page: curentPage
    })
    .then(() => {
      routeTo.params.page = curentPage;
      next();
    });
}

export default Vue.extend({
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },

  beforeRouteEnter(routeTo: any, routeFrom, next) {
    getPageEvents(routeTo, next);
  },

  beforeRouteUpdate(routeTo: any, routeFrom, next) {
    getPageEvents(routeTo, next);
  },

  computed: {
    ...mapState(["event", "user"])
  }
});
</script>

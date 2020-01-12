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
    <template v-if="page * perPage < event.eventsTotal">
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

const PER_PAGE = 3;

export default Vue.extend({
  components: {
    EventCard
  },

  computed: {
    page() {
      return parseInt(this.$route.query.page as string) || 1;
    },
    ...mapState(["event", "user"]),
    perPage() {
      return PER_PAGE;
    }
  },
  created() {
    this.$store.dispatch("event/fetchEvents", {
      perPage: PER_PAGE,
      page: (this as any).page
    });
  }
});
</script>

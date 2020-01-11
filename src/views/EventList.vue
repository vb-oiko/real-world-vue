<template>
  <div class="about">
    <h1>Events Listing</h1>
    <event-card v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EventCard from "../components/EventCard.vue";
import EventService from "@/services/EventService";

export default Vue.extend({
  components: {
    EventCard
  },
  data() {
    return {
      events: []
    };
  },
  created() {
    EventService.getEvents()
      .then(response => {
        this.events = response.data;
      })
      .catch(error => {
        console.warn("There was an eroor: " + error.response);
      });
  }
});
</script>

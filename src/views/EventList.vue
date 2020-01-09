<template>
  <div class="about">
    <h1>Events Listing</h1>
    <event-card />
  </div>
</template>

<script lang="ts">
import EventCard from "../components/EventCard.vue";

export default {
  components: {
    EventCard
  }
};
</script>

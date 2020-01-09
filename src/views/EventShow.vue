<template>
  <div>
    <h1>Showing event #{{ id }}</h1>
    <event-card></event-card>
  </div>
</template>

<script>
import EventCard from "../components/EventCard.vue";
export default {
  props: ["id"],
  components: {
    EventCard
  }
};
</script>

<style></style>

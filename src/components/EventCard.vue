<template>
  <router-link
    class="event-link"
    :to="{ name: 'event-show', params: { id: event.id } }"
  >
    <div class="event-card -shadow">
      <span class="eyebrow">{{ event.date }} on {{ event.time }}</span>
      <h4 class="title">{{ event.title }}</h4>
      <base-icon name="users">{{ attending }} attending</base-icon>
    </div>
  </router-link>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    event: Object
  },
  computed: {
    attending() {
      return (this as any).event.attendees
        ? (this as any).event.attendees.length
        : 0;
    }
  }
});
</script>

<style scoped>
.event-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.event-card > .title {
  margin: 0;
}
.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>

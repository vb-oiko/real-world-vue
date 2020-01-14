<template>
  <div class="notification-container">
    <notification-bar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NotificationBar from "@/components/NotificationBar.vue";
import { mapState } from "vuex";

export default Vue.extend({
  components: {
    NotificationBar
  },
  computed: mapState("notification", ["notifications"])
});
</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 0;
  right: 0;
  padding-right: 40px;
}
</style>

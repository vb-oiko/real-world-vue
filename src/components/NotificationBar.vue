<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Notification } from "@/types";
import { mapActions } from "vuex";

export default Vue.extend({
  props: {
    notification: {
      type: Object,
      required: true
    }
  },

  computed: {
    notificationTypeClass() {
      return `-text-${(this.notification as Notification).type}`;
    }
  },

  methods: mapActions("notification", ["remove"]),

  mounted() {
    (this as any).timeout = setTimeout(() => {
      console.log("removing notification #" + (this as any).notification.id);

      (this as any).remove((this as any).notification.id);
    }, 5000);
  },

  beforeDestroy() {
    clearTimeout((this as any).timeout);
  }
});
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
  background-color: #dddddd;
  padding: 0.1em 1em;
  line-height: 1;
}
</style>

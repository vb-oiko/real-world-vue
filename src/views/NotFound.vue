<template>
  <div>
    <h1>Oops!</h1>
    <h3>The {{ resource }} you are looking for doesn't exist</h3>
    <router-link :to="{ name: 'event-list' }"
      >Back to the home page</router-link
    >
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    resource: {
      type: String,
      required: true
    }
  }
});
</script>

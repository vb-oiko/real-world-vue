<template>
  <div>
    <h1>Create Event {{ user.name }}</h1>
    <p>There are {{ catLength }} categories</p>
    <p>{{ getEventById(1) }}</p>
    <ul>
      <li v-for="category in categories" :key="category">{{ category }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters } from "vuex";
import { AppState } from "@/store";

export default Vue.extend({
  computed: {
    ...mapGetters(["catLength", "getEventById"]),
    ...mapState(["user", "categories"])
  }
});
</script>

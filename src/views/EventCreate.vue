<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>

      <h3>Name and describe your event</h3>
      <base-input
        type="text"
        label="Title"
        placeholder="Add an event title"
        v-model="event.title"
        class="field"
      />

      <base-input
        type="text"
        label="Description"
        placeholder="Add an event description"
        v-model="event.description"
        class="field"
      />

      <h3>Where is your event?</h3>
      <base-input
        type="text"
        label="Location"
        placeholder="Add an event location"
        v-model="event.location"
        class="field"
      />

      <h3>When is your event?</h3>

      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>

      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>

      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import Datepicker from "vuejs-datepicker";
import { mapState, mapGetters } from "vuex";
import { AppState, User, MyEvent } from "@/types";
import NProgress from "nprogress";
import nProgress from "nprogress";

export default Vue.extend({
  components: {
    Datepicker
  },
  data(): any {
    const times: string[] = new Array(24).fill("").map((_, ind) => ind + ":00");
    return {
      times,
      categories: this.$store.state.categories,
      event: (this as any).createFreshEventObject() as Event
    };
  },
  methods: {
    createEvent() {
      NProgress.start();
      this.$store
        .dispatch("event/createEvent", this.event)
        .then(() => {
          this.$router.push({
            name: "event-show",
            params: { id: this.event.id }
          });
          this.event = this.createFreshEventObject();
        })
        .catch(() => {
          console.warn("There was a problem creating the event");
          NProgress.done();
        });
    },

    createFreshEventObject(): MyEvent {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 10000000);
      return {
        id,
        user,
        category: "",
        organizer: user,
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendies: []
      } as MyEvent;
    }
  }
});
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>

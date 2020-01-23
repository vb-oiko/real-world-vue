import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "@/views/EventList.vue";
import EventShow from "@/views/EventShow.vue";
import EventCreate from "@/views/EventCreate.vue";
import NotFound from "@/views/NotFound.vue";
import NetworkIssue from "@/views/NetworkIssue.vue";
import NProgress from "nprogress";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
    props: true
  },
  {
    path: "/event/create",
    name: "event-create",
    component: EventCreate
  },
  {
    path: "/event/:id",
    name: "event-show",
    component: EventShow,
    props: true,
    beforeEnter(routeTo: any, routeFrom: object, next: Function) {
      NProgress.start();
      store
        .dispatch("event/fetchEvent", parseInt((routeTo as any).params.id))
        .then(event => {
          routeTo.params.event = event;
          next();
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            next({ name: "404", params: { resource: "event" } });
          } else {
            next({ name: "network-issue" });
          }
        });
    }
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
    props: true
  },
  {
    path: "/network-issue",
    name: "network-issue",
    component: NetworkIssue
  },
  {
    path: "*",
    redirect: { name: "404", params: { resource: "page" } }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;

import Vue from 'vue';

// eslint-disable-next-line import/prefer-default-export
export const EventBus = new Vue({
  methods: {
    notify(eventName, eventParams) {
      this.$emit(eventName, eventParams);
    },
  },
});

export function setupBus() {
  Object.defineProperties(Vue.prototype, {
    $bus: {
      get() {
        return EventBus;
      },
    },
  });
}

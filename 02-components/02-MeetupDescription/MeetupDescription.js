import {defineComponent} from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupDescription',
  props: {
    description: {
      type: String,
    },
  },

  template: `<template v-if="description">
    <p class="meetup-description">{{ description }}</p>
  </template>`,
});

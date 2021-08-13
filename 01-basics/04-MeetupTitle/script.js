 import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const app = createApp({
  data() {
    return {
      id: null,
      title: null,
    };
  },

  watch: {
    async id(newValue, oldValue) {
      await this.getTitle(newValue);
    },
  },

  methods: {
    async getTitle(id) {
      const response = await fetch(`https://course-vue.javascript.ru/api/meetups/${id}`).then((res) => res.json());
      this.title = response.title;
    },
  },
});

app.mount('#app');

import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from './components/MeetupView.js';
import { fetchMeetupById } from './meetupService.js';

export default defineComponent({
  name: 'PageMeetup',
  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },
  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      meetup: null,
      loading: null,
      error: null,
    };
  },
  watch: {
    meetupId: {
      immediate: true,
      async handler(value) {
        this.loading = true;
        this.meetup = null;
        this.error = null;
        try {
          this.meetup = await fetchMeetupById(value);
        } catch (error) {
          this.error = error.message;
        }
        this.loading = false;
      },
    },
  },
  template: `
    <div class="page-meetup">
    <!-- meetup view -->
    <meetup-view v-if="meetup" :meetup="meetup"/>
    <ui-container v-else-if="loading">
      <ui-alert>Загрузка...</ui-alert>
    </ui-container>

    <ui-container v-else-if="error">
      <ui-alert>{{ error }}</ui-alert>
    </ui-container>
    </div>`,
});

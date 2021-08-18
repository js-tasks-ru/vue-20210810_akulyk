import {defineComponent} from '../vendor/vue.esm-browser.js';
import UiAlert from '../UiAlert.js';
import UiContainer from '../UiContainer.js';
import MeetupDescription from './MeetupDescription.js';
import MeetupInfo from './MeetupInfo.js';
import MeetupCover from './MeetupCover.js';
import MeetupAgenda from './MeetupAgenda.js';

export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupDescription,
    MeetupInfo,
    MeetupCover,
    MeetupAgenda,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>
    <!-- meetup cover-->
    <meetup-cover :title="meetup.title" :image="meetup.image"/>
    <ui-container>
      <div class="meetup">
        <div class="meetup__content">
          <h3>{{ meetup.title }}</h3>
          <meetup-description :description="meetup.description"/>

          <h3>Программа</h3>
          <!-- meetup agenda -->
          <template v-if="meetup.agenda && meetup.agenda.length">
            <meetup-agenda :agenda="meetup.agenda"/>
          </template>
          <ui-alert v-else>Программа пока пуста...</ui-alert>
        </div>
        <div class="meetup__aside">
          <!-- meetup info -->
          <meetup-info
            :organizer="meetup.organizer"
            :date="meetup.date"
            :place="meetup.place"
          />
        </div>
      </div>
    </ui-container>
    </div>`,
});

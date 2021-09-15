<template>
  <div v-if="messages.length" class="toasts">
    <div v-for="message in messages" :key="message.id" class="toast" :class="['toast_' + message.type]">
      <ui-icon v-if="message.icon" class="toast__icon" :icon="message.icon" />
      <span>{{ message.text }}</span>
      <span v-if="message.closable" class="close">
        <ui-icon class="toast__icon" icon="trash" @click="remove(message.id)" />
      </span>
    </div>
  </div>
</template>

<script>
import UiIcon from './UiIcon';
let id = 0;
const iconMap = {
  success: 'check-circle',
  error: 'alert-circle',
};

export default {
  name: 'TheToaster',
  components: { UiIcon },
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    toast(text, type, options = {}) {
      const icon = iconMap[type];
      const message = {
        id: id++,
        text,
        type,
        icon,
        timeout: options.timeout !== undefined ? options.timeout : 5000,
        closable: options.closable !== undefined ? options.closable : true,
      };
      this.messages.push(message);
      if (message.timeout) {
        setTimeout(() => {
          this.remove(message.id);
        }, message.timeout);
      }
    },
    remove(messageId) {
      this.messages = this.messages.filter((m) => m.id !== messageId);
    },
    success(text, options = {}) {
      this.toast(text, 'success', options);
    },
    error(text, options = {}) {
      this.toast(text, 'error', options);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

.close {
  cursor: pointer;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

.toast.toast_warning {
  color: var(--orange);
}

.toast.toast_info {
  color: var(--blue);
}
</style>

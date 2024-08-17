import './assets/main.css';
/* add all icon we need to the font-awesome library */
import '@/icons/fontAwesomeIconConfig';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Aura from '@primevue/themes/aura';
import { createPinia } from 'pinia';
import Button from 'primevue/button';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { createApp } from 'vue';


import App from './App.vue';
import router from './router';

import { i18n } from '@/i18n/config';
import { MainPreset } from '@/PrimeviewPresets/MainPreset';

const app = createApp(App);

// eslint-disable-next-line vue/no-reserved-component-names,vue/multi-word-component-names
app.component('Button', Button);
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(createPinia());
app.use(i18n);
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: MainPreset,
  }
});
app.use(ToastService);

app.mount('#app');

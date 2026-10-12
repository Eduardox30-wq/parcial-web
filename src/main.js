import { createApp } from 'vue'
import './style.css'
import App from './app.vue'
import i18n from "./i18n.js";
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Tooltip from 'primevue/tooltip';
import {
    Button,
    Card,
    Checkbox,
    Column,
    ConfirmationService,
    ConfirmDialog,
    DataTable,
    Dialog,
    DialogService,
    Drawer,
    FileUpload,
    FloatLabel,
    IconField,
    InputIcon,
    InputNumber,
    InputText,
    Menu,
    Rating,
    Row,
    Select,
    SelectButton,
    Tag,
    Toast,
    Textarea,
    ToastService,
    Toolbar
} from "primevue";
import router from "./router.js";
import pinia from "./pinia.js";

const app = createApp(App);

app.use(i18n);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    },
    ripple: true
});
app.use(ConfirmationService);
app.use(DialogService);
app.use(ToastService);

app.component('pv-button',         Button);
app.component('pv-card',           Card);
app.component('pv-column',         Column);
app.component('pv-confirm-dialog', ConfirmDialog);
app.component('pv-checkbox',       Checkbox);
app.component('pv-data-table',     DataTable);
app.component('pv-dialog',         Dialog);
app.component('pv-select',         Select);
app.component('pv-select-button',  SelectButton);
app.component('pv-file-upload',    FileUpload);
app.component('pv-float-label',    FloatLabel);
app.component('pv-icon-field',     IconField);
app.component('pv-input-icon',     InputIcon);
app.component('pv-input-text',     InputText);
app.component('pv-input-number',   InputNumber);
app.component('pv-menu',           Menu);
app.component('pv-rating',         Rating);
app.component('pv-row',            Row);
app.component('pv-drawer',         Drawer);
app.component('pv-tag',            Tag);
app.component('pv-textarea',       Textarea);
app.component('pv-toolbar',        Toolbar);
app.component('pv-toast',          Toast);

app.directive('tooltip',           Tooltip);

app.use(router);
app.use(pinia);

app.mount('#app');
import Vue from 'vue';
//import axios from "axios";
//import VueAxios from "vue-axios";
import App from './App.vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay,faEllipsisV,faSearch,faUser ,faEllipsisH,faPause,faStepBackward,faStepForward,faVolumeUp,faVolumeMute,faVolumeDown,faCircleNotch} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();
window.bus = new Vue();

library.add(faPlay); 
library.add(faEllipsisV); 
library.add(faSearch); 
library.add(faPause); 
library.add(faUser); 
library.add(faEllipsisH); 
library.add(faStepBackward); 
library.add(faStepForward); 
library.add(faVolumeUp); 
library.add(faVolumeMute); 
library.add(faCircleNotch); 
library.add(faVolumeDown); 

Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  render: h => h(App),
}).$mount('#app')

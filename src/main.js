import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import extensions from './packages';

Vue.config.productionTip = false

extensions(Vue, vuetify);
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

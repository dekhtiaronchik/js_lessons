import Vue from 'vue'
import App from './App.vue'

import store from '../store'
import router from '../router'
import modal from './plugins/ModalWindow'
import context from './plugins/ContextMenu'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(modal)
Vue.use(context)

new Vue({
  render: h => h(App),
  store,
  vuetify,
  router
}).$mount('#app')
import Vue from 'vue';
import App from './App.vue';
import Graph from './components/Graph.vue';

Vue.config.productionTip = false
Vue.component('Graph', Graph);

new Vue({
  render: h => h(App),
}).$mount('#app')

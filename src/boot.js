import Vue from 'vue'
import vmdl from 'vue-mdl'
import App from './App'
import 'gsap'

vmdl.registerAll(Vue)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

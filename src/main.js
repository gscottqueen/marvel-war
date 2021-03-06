// import modules
import Vue from 'vue'

//global assignments
import axios from 'axios';//axios is our api wrapper now declared as api. in api.js

// import our vues
import App from './App.vue'


//rendering our app
new Vue({
  el: '#app',
  render: h => h(App)
})

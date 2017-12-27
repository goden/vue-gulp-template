import Vue from 'vue/dist/vue.min.js';
import $ from 'jquery';
import util from './util';
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);

// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

// process.env.NODE_ENV = 'development';

var vm = new Vue({
    el: '#app',
    data: {
        // message: 'This is a message from index page!',
    },
    methods: {
    },
    mounted: function () {
        // console.log(this.jqueryRunnable());
    }
});
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
window.Vuex = require('vuex');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('chart-container', require('./components/ChartContainer.vue').default);



/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
Vue.use(Vuex);
import Echo from 'laravel-echo'
import Pusher from "pusher-js"

const store = new Vuex.Store({
    state: {
        tempData: []
    },
    mutations: {
        fetchData (state) {
            axios.get('/api/data')
                .then((response) => {
                    state.tempData = response.data.data;
                })
            },
        newdata (state, payload) {
            if (state.tempData.length >=30) {
                state.tempData.shift();
            }
            state.tempData.push(Number(payload.temperature));
            }
        }
    });

const app = new Vue({
    el: '#app',
    store,
    methods: {
        sendStartCommand: function () {
            axios.get('/api/start');
        },
    },
    mounted() {
        store.commit('fetchData');
        let echo = new Echo({
            broadcaster: 'pusher',
            key: '651f2f089aaf0bf120d3',
            cluster: 'eu',
            forceTLS: true
        });

        this.channel = echo.channel('my-channel');
        this.channel.listen('.my-event', (data) => {
            store.commit('newdata', data);
        });

    },
    template: `
        <div class="app">
            <chart-container></chart-container>
            <div class="controls">
                <button v-on:click="sendStartCommand">Старт!</button>
            </div>
        </div>
        `
});

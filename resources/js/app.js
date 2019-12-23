require('./bootstrap');

window.Vue = require('vue');
Vue.component('chart-container', require('./components/ChartContainer.js').default);

import {store} from './components/store.js';
const app = new Vue({
    el: '#app',
    store,
    methods: {
        sendStartCommand: function () {
            axios.get('/api/start');
        },
        sendStopCommand: function () {
            axios.get('/api/stop');
        },
    },
    mounted() {
        store.dispatch('fetchData');
        this.channel = Echo.channel('my-channel');
        this.channel.listen('.my-event', (data) => {
            store.dispatch('newData', data);
        });

    },
    template: `
            <div class="app">
            <chart-container></chart-container>
            <div class="controls">
                <button v-on:click="sendStartCommand">Старт!</button>
                <button v-on:click="sendStopCommand">Стоп</button>
            </div>
            </div>
            `
});

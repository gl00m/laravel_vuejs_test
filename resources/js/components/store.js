import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        tempData: []
    },
    mutations: {
        fetchData (state, payload) {
            state.tempData = payload;
        },
        newData (state, payload) {
            if (state.tempData.length >=30) {
                state.tempData.shift();
            }
            state.tempData.push(Number(payload.temperature));
        }
    },
    actions: {
        fetchData (context) {
            axios.get('/api/data')
                .then((response) => {
                    if (response.data.success) {
                        context.commit('fetchData', response.data.data)
                    }
                })
        },
        newData (context, payload) {
            context.commit('newData', payload)
        }
    }
});
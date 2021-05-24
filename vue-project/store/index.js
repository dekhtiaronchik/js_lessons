import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        paymentsList: [],
        categoryList: [],
    },
    getters: {
        getPaymentsList: state => state.paymentsList,
        getFullPaymentValue: state => {
            return state.paymentsList
                .reduce((res, cur) => res + cur.value, 0)
        },
        getCategoryList: state => state.categoryList,
    },
    mutations: {
        setPaymentsListData(state, payload) {
            state.paymentsList = payload;
        },
        addDataToPaymentsList(state, payload) {
            state.paymentsList.push(payload)
        },
        setCategories(state, payload) {
            if (!Array.isArray(payload)) {
                payload = [payload]
            }
            state.categoryList.push(...payload)
        },
    },
    actions: {
        fetchData({
            commit
        }) {
            return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve([{
                                date: '28.03.2020',
                                category: 'Food',
                                value: 169,
                            },
                            {
                                date: '24.03.2020',
                                category: 'Transport',
                                value: 360,
                            },
                            {
                                date: '24.03.2020',
                                category: 'Food',
                                value: 532,
                            },
                            {
                                id: 1,
                                date: "13.05.2021",
                                category: "education",
                                value: 500,
                            },
                        ])
                    }, 1000)
                })
                .then(res => {
                    commit('setPaymentsListData', res)
                })
        },

        loadCategories({
            commit
        }) {
            return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(['Food', 'Transport', 'Education', 'Entertainment'])
                    }, 1000)
                })
                .then(res => {
                    commit('setCategories', res)
                })
        },
    }
})
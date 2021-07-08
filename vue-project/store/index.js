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
        getPaymentChart: state => {
            if (!Array.isArray(state.paymentsList)) {
                return {}
            }
            return state.paymentsList.reduce((acc, paymentItem) => {
                if (acc[paymentItem.category]) {
                    acc[paymentItem.category] += paymentItem.value
                } else {
                    acc[paymentItem.category] = paymentItem.value
                }
                return acc
            }, {})
        }
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
        deleteItem(state, payload) {
            state.paymentsList = state.paymentsList.filter(item => item.id !== payload);
        },
        updateItem(state, payload) {
            const itemForUpdate = state.paymentsList.find(item => item.id === payload.id);
            if (itemForUpdate) {
                Object.assign(itemForUpdate, payload)
            }
        }
    },
    actions: {
        fetchData({
            commit
        }) {
            return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve([{
                                id: 123,
                                date: '28.03.2020',
                                category: 'Food',
                                value: 169,
                            },
                            {
                                id: 126,
                                date: '24.03.2020',
                                category: 'Transport',
                                value: 360,
                            },
                            {
                                id: 125,
                                date: '24.03.2020',
                                category: 'Food',
                                value: 532,
                            },
                            {
                                id: 124,
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
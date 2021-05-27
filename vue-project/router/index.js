import Vue from 'vue'
import Router from 'vue-router'

import PageDashboard from "../src/pages/PageDashboard.vue";
import PageAbout from "../src/pages/PageAbout.vue";
import Page404 from "../src/pages/Page404.vue";
// import PaymentForm from "../src/components/PaymentForm.vue";

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/dashboard',
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: PageDashboard
        },
        {
            path: '/about',
            name: 'about',
            component: PageAbout
        }, {
            path: '*',
            component: Page404
        },
        {
            path: "/dashboard/add/payment/:category",
            component: PageDashboard,
            props: (route) => ({
                query: route.query.value,
                showPaymentForm: true
            }),
        }
    ],
})
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


const app = new Vue({
    el: '#app',
    data: {
        showCart: false,
    },

    methods: {
        getRequest(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
    },
});
Vue.component('search', {
    data() {
        return {
            searchLine: '',
        }
    },
    methods: {
        filter() {
            let regexp = new RegExp(this.searchLine, 'i');
            this.$root.$refs.products.filteredProducts = this.$root.$refs.products.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `
            <form action="#" class="search-form" @submit.prevent="filter">
                <input type="text" class="search-field" v-model="searchLine">
                <button class="btn-search" type="submit">
                    Поиск
                </button>
            </form>
    `
});
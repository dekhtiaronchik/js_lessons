Vue.component('search', {
    data() {
        return {
            searchLine: '',
        }
    },
    methods: {
        search() {
            this.$emit('search', this.searchLine);
        }
    },
    template: `
            <form action="#" class="search-form" @submit.prevent="search">
                <input type="text" class="search-field" v-model="searchLine">
                <button class="btn-search" type="submit">
                    Поиск
                </button>
            </form>
    `
});
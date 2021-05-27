<template>
  <div class="payment-form">
    <input
      class="payment-form__input"
      type="date"
      v-model="date"
      :data="date"
    />
    <select class="payment-form__select" v-model="category">
      <option
        v-for="option in getCategoryList"
        v-bind:key="option.index"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
    <input
      class="payment-form__input"
      placeholder="Payment amount"
      v-model.number="value"
    />
    <button class="payment-form__button" @click="add">ADD +</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "PaymentForm",
  props: {},
  data() {
    return {
      date: "",
      category: "",
      value: 0,
    };
  },
  computed: { ...mapGetters(["getCategoryList"]) },
  methods: {
    ...mapActions(["loadCategories"]),
    add() {
      const { date, value, category } = this;
      this.$emit("addToList", { date, category, value });
    },
  },
  mounted() {
    if (!this.getCategoryList.length) {
      this.loadCategories();
    }
  },
  created() {
    this.date = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
    this.value = this.$route.query.value;
    this.category = this.$route.params.category;
    // const currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
    // const valueFromRoute = this.$route.query.value;
    // const categoryFromRoute = this.$route.params.category;
    // if (currentDate || valueFromRoute || categoryFromRoute) {
    //   this.date = currentDate;
    //   this.value = valueFromRoute;
    //   this.category = this.$route.params.category;
    // }
  },
};
</script>


<style scoped lang="scss">
.payment-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  width: 300px;
  height: 150px;
  position: absolute;
  z-index: 1;
  background: rgb(255, 255, 255);
  -webkit-box-shadow: 1px 1px 7px -1px rgba(0, 0, 0, 0.97);
  box-shadow: 1px 1px 7px -1px rgba(0, 0, 0, 0.97);
}

.payment-form__input {
  padding: 5px;
  margin-bottom: 5px;
  width: 250px;
}

.payment-form__select {
  padding: 5px;
  margin-bottom: 5px;
  width: 265px;
}

.payment-form__button {
  padding: 10px 30px;
  width: 100px;
  margin-top: 10px;
}
</style>

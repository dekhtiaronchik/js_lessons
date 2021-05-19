<template>
  <div class="payment-form">
    <input
      class="payment-form__input"
      placeholder="Payment date"
      v-model="date"
    />
    <input
      class="payment-form__input"
      placeholder="Payment category"
      v-model="category"
    />
    <input
      class="payment-form__input"
      placeholder="Payment amount"
      v-model.number="value"
    />
    <button class="payment-form__button" @click="add">ADD +</button>
  </div>
</template>

<script>
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
  methods: {
    add() {
      const { date, category, value } = this;
      this.$emit("addToList", { date, category, value });
    },
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

.payment-form__button {
  padding: 10px 30px;
  width: 100px;
  margin-top: 10px;
}
</style>

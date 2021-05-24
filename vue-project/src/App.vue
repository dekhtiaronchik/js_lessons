<template>
  <div id="app">
    <div class="payment-info">
      <header class="header">My personal costs</header>
      <main>
        <button
          class="payment-info__button"
          @click="showshowPaymentForm = !showshowPaymentForm"
        >
          ADD NEW COST +
        </button>
        <PaymentForm v-show="showshowPaymentForm" @addToList="onDataAdded" />
        <PaymentsList />
      </main>
    </div>
    <div class="diagram"></div>
  </div>
</template>

<script>
import PaymentForm from "./components/PaymentForm.vue";
import PaymentsList from "./components/PaymentsList.vue";

import { mapMutations, mapActions } from "vuex";
export default {
  name: "App",
  components: {
    PaymentForm,
    PaymentsList,
  },
  data() {
    return {
      showshowPaymentForm: false,
    };
  },
  methods: {
    ...mapMutations(["setPaymentsListData", "addDataToPaymentsList"]),
    ...mapActions(["fetchData"]),
    onDataAdded(data) {
      this.addDataToPaymentsList(data);
      this.showshowPaymentForm = false;
    },
  },
  created() {
    this.setPaymentsListData(this.fetchData());
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position: relative;

  .header {
    font-size: 36px;
    font-weight: 500;
    padding-bottom: 20px;
  }

  .payment-info__button {
    padding: 10px;
  }

  button {
    cursor: pointer;
    background-color: rgb(107, 182, 169);
    color: white;
    text-align: center;
    border: none;
  }

  button:focus {
    outline: none;
  }
}
</style>

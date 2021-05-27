<template>
  <div>
    <button
      class="payment-info__button"
      @click="showPaymentForm = !showPaymentForm"
    >
      ADD NEW COST +
    </button>
    <PaymentForm v-show="showPaymentForm" @addToList="onDataAdded" />
    <PaymentsList />
  </div>
</template>

<script>
import PaymentForm from "../components/PaymentForm.vue";
import PaymentsList from "../components/PaymentsList.vue";

import { mapMutations, mapActions } from "vuex";
export default {
  name: "PageDashboard",
  components: {
    PaymentForm,
    PaymentsList,
  },
  data() {
    return {
      showPaymentForm: false,
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
.payment-info__button {
  padding: 10px;
}
</style>
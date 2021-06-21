<template>
  <div>
    <button class="payment-info__button" @click="showPaymentForm">
      ADD NEW COST +
    </button>
    <transition name="fade">
      <PaymentFormModal />
    </transition>
    <PaymentsList />
  </div>
</template>

<script>
import PaymentsList from "../components/PaymentsList.vue";
import PaymentFormModal from "../components/modalWindows/PaymentFormModal";

import { mapActions, mapMutations } from "vuex";
export default {
  name: "PageDashboard",
  components: {
    PaymentsList,
    PaymentFormModal,
  },
  methods: {
    ...mapMutations(["setPaymentsListData", "addDataToPaymentsList"]),
    ...mapActions(["fetchData"]),
    showPaymentForm() {
      this.$modal.show("paymentform");
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
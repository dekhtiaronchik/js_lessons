<template>
  <div>
    <button
      class="payment-info__button"
      @click="showPaymentForm = !showPaymentForm"
    >
      ADD NEW COST +
    </button>
    <PaymentForm
      v-show="showPaymentForm"
      @addToList="onDataAdded"
      :initialValues="initialValues"
    />
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
      initialValues: {
        date: "",
        value: 0,
        category: "",
      },
    };
  },
  methods: {
    ...mapMutations(["setPaymentsListData", "addDataToPaymentsList"]),
    ...mapActions(["fetchData"]),
    onDataAdded(data) {
      this.addDataToPaymentsList(data);
      this.showPaymentForm = false;
    },
  },
  created() {
    this.setPaymentsListData(this.fetchData());
    const valueLink = Number(this.$route.query.value);
    const categoryLink = this.$route.params.category;
    const currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
    if (valueLink > 0 || categoryLink) {
      this.showPaymentForm = true;
      this.initialValues.value = valueLink;
      this.initialValues.category = categoryLink;
      this.initialValues.date = currentDate;
      setTimeout(() => {
        this.addDataToPaymentsList(this.initialValues);
        this.showPaymentForm = false;
      }, 2000);
    }
  },
  mounted() {},
};
</script>

<style lang="scss">
.payment-info__button {
  padding: 10px;
}
</style>
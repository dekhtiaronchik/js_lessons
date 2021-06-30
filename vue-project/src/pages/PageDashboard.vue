<template>
  <v-container>
    <div class="text-h5 text-sm-h3 mb-8">My personal costs</div>
    <v-row>
      <v-col>
        <v-btn color="teal" dark @click="showPaymentForm">
          ADD NEW COST <v-icon>mdi-plus</v-icon>
        </v-btn>
        <transition name="fade">
          <PaymentFormModal />
        </transition>
        <PaymentsList />
      </v-col>
      <v-col>
        <Diagram :chartData="getChartData" :options="options" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaymentsList from "../components/PaymentsList.vue";
import Diagram from "../components/Diagram";
import PaymentFormModal from "../components/modalWindows/PaymentFormModal";

import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "PageDashboard",
  components: {
    PaymentsList,
    PaymentFormModal,
    Diagram,
  },
  data() {
    return {
      chartData: {
        labels: ["Food", "Transport", "Education", "Entertainment"],
        datasets: [
          {
            backgroundColor: ["#f89922", "#f81357", "#f87979", "#f84500"],
            data: [1, 2, 3, 4],
          },
        ],
      },
      options: {},
    };
  },
  computed: {
    ...mapGetters(["getPaymentChart", "getPaymentsList"]),
    getChartData() {
      const groupedValues = this.getPaymentChart;
      return {
        labels: Object.keys(groupedValues),
        datasets: [
          {
            backgroundColor: ["#f89922", "#f81357", "#f87979", "#f84500"],
            data: Object.values(groupedValues),
          },
        ],
      };
    },
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
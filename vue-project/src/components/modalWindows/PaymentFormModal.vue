<template>
  <v-dialog v-model="shown" :width="400">
    <v-card>
      <PaymentForm
        @addToList="onDataAdded"
        :initialValues="initialValues"
        :id="settings && settings.id"
      />
    </v-card>
  </v-dialog>
</template>

<script>
import PaymentForm from "../PaymentForm";
import { mapMutations, mapActions } from "vuex";
export default {
  name: "PaymentFormModal",
  components: {
    PaymentForm,
  },
  data() {
    return {
      shown: "",
      initialValues: {
        date: "",
        value: 0,
        category: "",
      },
      settings: {},
    };
  },
  methods: {
    ...mapMutations(["setPaymentsListData", "addDataToPaymentsList"]),
    ...mapActions(["fetchData"]),
    onDataAdded(data) {
      this.addDataToPaymentsList(data);
      this.onClose();
    },
    onShow({ name, settings }) {
      this.shown = name;
      this.settings = settings;
    },
    onClose() {
      this.shown = "";
    },
  },
  created() {
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
  mounted() {
    this.$modal.EventBus.$on("show", this.onShow);
    this.$modal.EventBus.$on("close", this.onClose);
  },
};
</script>

<style scopped lang='scss'>
.modal {
  position: absolute;
}
</style>
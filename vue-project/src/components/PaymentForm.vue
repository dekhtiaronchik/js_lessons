<template>
  <v-card class="text-left pa-8">
    <v-text-field v-model="date" label="Date" :date="date"></v-text-field>
    <v-select
      v-model="category"
      label="Category"
      :items="getCategoryList"
    ></v-select>
    <v-text-field v-model.number="value" label="Value"></v-text-field>
    <v-btn color="teal" dark @click="save">
      ADD <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "PaymentForm",
  props: {
    initialValues: {
      date: String,
      category: String,
      value: Number,
    },
    id: Number,
  },
  data() {
    return {
      date: "",
      category: "",
      value: 0,
    };
  },
  computed: {
    ...mapGetters(["getCategoryList", "getPaymentsList"]),
  },
  methods: {
    ...mapActions(["loadCategories"]),
    ...mapMutations(["updateItem"]),
    save() {
      const { date, value, category } = this;
      const payload = { date, value, category };
      if (this.id) {
        payload.id = this.id;
        this.updateItem(payload);
      } else {
        this.$emit("addToList", { date, category, value });
      }
      this.$modal.close();
    },
  },
  created() {
    if (!this.getCategoryList.length) {
      this.loadCategories();
    }
    this.date = this.initialValues.date;
    this.category = this.initialValues.category;
    this.value = this.initialValues.value;
  },
  mounted() {
    if (this.id) {
      const item = this.getPaymentsList.find((p) => p.id === this.id);
      if (item) {
        this.date = item.date;
        this.category = item.category;
        this.value = item.value;
      }
    }
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

<template>
  <div class="paymentsList">
    <table class="paymentsList-table">
      <thead>
        <tr>
          <th class="paymentsList-table__col_small">#</th>
          <th class="paymentsList-table__col_big">Date</th>
          <th class="paymentsList-table__col_big">Category</th>
          <th class="paymentsList-table__col_small">Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in getPaymentsList" v-bind:key="item.index">
          <td class="paymentsList-table__col_small">{{ index + 1 }}</td>
          <td class="paymentsList-table__col_big">
            {{ item.date.split("-").reverse().join(".") }}
          </td>
          <td class="paymentsList-table__col_big">{{ item.category }}</td>
          <td class="paymentsList-table__col_small">{{ item.value }}</td>
        </tr>
      </tbody>
    </table>
    <Pagination />
  </div>
</template>

<script>
import Pagination from "./Pagination.vue";

import { mapGetters } from "vuex";
export default {
  name: "PaymentsList",
  components: {
    Pagination,
  },
  methods: {},
  computed: {
    ...mapGetters(["getPaymentsList"]),
  },
};
</script>


<style scoped lang="scss">
.paymentsList {
  padding-top: 20px;
}

.paymentsList-table {
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #dddddd;
  border-collapse: collapse;
  text-align: left;
}
.paymentsList-table th {
  font-weight: bold;
  padding: 10px;
  border: 1px solid #dddddd;
}
.paymentsList-table td {
  border: 1px solid #dddddd;
  padding: 10px;
}

.paymentsList-table__col_small {
  width: 60px;
}

.paymentsList-table__col_big {
  width: 120px;
}
</style>

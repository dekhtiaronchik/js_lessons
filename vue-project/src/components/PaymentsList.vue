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
        <tr v-for="(item, index) in getPaymentsList" v-bind:key="item.id">
          <td class="paymentsList-table__col_small">{{ index + 1 }}</td>
          <td class="paymentsList-table__col_big">
            {{ item.date.split("-").reverse().join(".") }}
          </td>
          <td class="paymentsList-table__col_big">{{ item.category }}</td>
          <td class="paymentsList-table__col_small">{{ item.value }}</td>
          <td
            class="paymentsList-table__col_context"
            @click="onContextMenuClick(item.id)"
          >
            ...
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination />
  </div>
</template>

<script>
import Pagination from "./Pagination.vue";

import { mapGetters, mapMutations } from "vuex";
export default {
  name: "PaymentsList",
  components: {
    Pagination,
  },
  methods: {
    ...mapMutations(["deleteItem"]),
    onContextMenuClick(id) {
      const items = [
        {
          text: "delete",
          action: () => {
            this.deleteItem(id);
          },
        },
        {
          text: "edit",
          action: () => {
            console.log("edit", id);
            this.$modal.show("paymentform", { id });
          },
        },
      ];
      this.$context.show({ event, items });
    },
  },
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

.paymentsList-table__col_context {
  width: 20px;
  cursor: pointer;
}
</style>

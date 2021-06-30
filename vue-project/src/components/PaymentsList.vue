<template>
  <v-container>
    <v-row>
      <v-col :cols="1">#</v-col>
      <v-col :cols="3">Date</v-col>
      <v-col :cols="3">Category</v-col>
      <v-col :cols="2">Value</v-col>
      <v-col :cols="1"></v-col>
    </v-row>
    <v-row v-for="(item, index) in getPaymentsList" v-bind:key="item.id">
      <v-col :cols="1">{{ index + 1 }}</v-col>
      <v-col :cols="3">{{ item.date }}</v-col>
      <v-col :cols="3">{{ item.category }}</v-col>
      <v-col :cols="2">{{ item.value }}</v-col>
      <v-col
        :cols="1"
        @click="onContextMenuClick(item.id)"
        class="paymentsList-table__col_context"
      >
        <v-icon>mdi-dots-vertical</v-icon>
        <ContextMenu />
      </v-col>
    </v-row>
    <Pagination />
  </v-container>
</template>

<script>
import Pagination from "./Pagination.vue";
import ContextMenu from "./modalWindows/ContextMenu";

import { mapGetters, mapMutations } from "vuex";
export default {
  name: "PaymentsList",
  components: {
    Pagination,
    ContextMenu,
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
// .paymentsList {
//   padding-top: 20px;
// }

// .paymentsList-table {
//   width: 100%;
//   margin-bottom: 20px;
//   border: 1px solid #dddddd;
//   border-collapse: collapse;
//   text-align: left;
// }
// .paymentsList-table th {
//   font-weight: bold;
//   padding: 10px;
//   border: 1px solid #dddddd;
// }
// .paymentsList-table td {
//   border: 1px solid #dddddd;
//   padding: 10px;
// }

// .paymentsList-table__col_small {
//   width: 60px;
// }

// .paymentsList-table__col_big {
//   width: 120px;
// }

.paymentsList-table__col_context {
  cursor: pointer;
}
</style>

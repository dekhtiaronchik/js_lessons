<template>
  <div class="context" v-if="shown" :style="styles">
    <div
      v-for="item in items"
      :key="item.text"
      @click="onClick(item)"
      class="context__item"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      shown: false,
      xPos: 0,
      yPos: 0,
    };
  },
  methods: {
    onClick(item) {
      item.action();
      this.onClose();
    },
    onShow({ items, caller }) {
      this.shown = true;
      this.items = items;
      this.setPosition(caller);
    },
    onClose() {
      this.shown = false;
      this.items = [];
    },
    setPosition(caller) {
      const computed = caller.getBoundingClientRect();
      this.xPos = computed.left;
      this.yPos = computed.top;
    },
  },
  computed: {
    styles() {
      return {
        top: `${this.yPos}px`,
        left: `${this.xPos + 15}px`,
      };
    },
  },
  mounted() {
    this.$context.EventBus.$on("show", this.onShow);
    this.$context.EventBus.$on("close", this.onClose);
  },
};
</script>

<style lang="scss">
.context {
  height: 40px;
  width: 100px;
  position: absolute;
  background: rgb(255, 255, 255);
  -webkit-box-shadow: 1px 1px 4px -1px rgba(0, 0, 0, 0.5);
  box-shadow: 1px 1px 4px -1px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.context__item:hover {
  background: rgb(223, 236, 229);
}
</style>
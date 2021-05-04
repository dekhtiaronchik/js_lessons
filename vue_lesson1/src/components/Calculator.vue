<template>
  <div class="calculator">
    <div class="display">
      <input v-model.number="operand1" />
      <input v-model.number="operand2" />
      = {{ result }}
    </div>
    <div class="keyboard">
      <button @click="calculate('sum')">+</button>
      <button @click="calculate('sub')">-</button>
      <button @click="calculate('div')">/</button>
      <button @click="calculate('mul')">*</button>
      <button @click="calculate('intDiv')">integer division</button>
      <button @click="calculate('exp')">exponentiation</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  data() {
    return {
      operand1: 0,
      operand2: 0,
      result: 0,
    };
  },
  methods: {
    calculate(operation) {
      switch (operation) {
        case "sum":
          this.result = this.operand1 + this.operand2;
          break;
        case "sub":
          this.result = this.operand1 - this.operand2;
          break;
        case "div":
          this.result = this.operand1 / this.operand2;
          break;
        case "mul":
          this.result = this.operand1 * this.operand2;
          break;
        case "intDiv":
          this.result = Math.trunc(this.operand1 / this.operand2);
          break;
        case "exp":
          this.result = Math.pow(this.operand1, this.operand2);
          break;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

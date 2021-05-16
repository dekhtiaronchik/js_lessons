<template>
  <div class="calculator">
    <div class="display">
      <input v-model="operand1" ref="op1" />
      <input v-model="operand2" ref="op2" />
      = {{ result }}
    </div>
    <div class="keyboard">
      <button
        v-for="operation in operations"
        :key="operation.name"
        @click="calculate(operation.name)"
      >
        {{ operation.desctiption }}
      </button>
    </div>
    <div class="error" v-if="error">{{ error }}</div>
    <div class="numbers_block">
      <input type="checkbox" id="checkbox" v-model="showKeyboard" />
      <label for="checkbox">Отобразить экранную клавиатуру</label>
      <div v-show="showKeyboard">
        <button v-for="number in numbers" :key="number" @click="onNumberClick">
          {{ number }}
        </button>
        <button @click="onDeleteNumber">Удалить</button>
        <input
          type="radio"
          id="op1"
          value="Операнд1"
          ref="radio1"
          v-model="picked"
          @click="chooseOperand('op1')"
        />
        <label for="op1">Операнд1</label>
        <input
          type="radio"
          id="op2"
          value="Операнд2"
          ref="radio2"
          v-model="picked"
          @click="chooseOperand('op2')"
        />
        <label for="op2">Операнд2</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  data() {
    return {
      operations: [
        {
          name: "sum",
          desctiption: "+",
          action: (op1, op2) => op1 + op2,
        },
        {
          name: "sub",
          desctiption: "-",
          action: (op1, op2) => op1 - op2,
        },
        {
          name: "mul",
          desctiption: "*",
          action: (op1, op2) => op1 * op2,
        },
        {
          name: "div",
          desctiption: "/",
          action: (op1, op2) => op1 / op2,
        },
        {
          name: "intDiv",
          desctiption: "Целочисленное деление",
          action: (op1, op2) => Math.trunc(op1 / op2),
        },
        {
          name: "exp",
          desctiption: "Возведение в степень",
          action: (op1, op2) => Math.pow(op1, op2),
        },
      ],
      operand1: "",
      operand2: "",
      result: 0,
      error: "",
      numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      showKeyboard: false,
      picked: false,
    };
  },
  methods: {
    chooseOperand(op) {
      if (op === "op1") {
        const op1 = this.$refs.op1;
        op1.focus();
      } else if (op === "op2") {
        const op2 = this.$refs.op2;
        op2.focus();
      }
    },

    onNumberClick(event) {
      this.error = "";
      if (this.$refs.radio1.checked === true) {
        const buttonName = event.target.textContent.replace(/\s+/g, "");
        this.operand1 = this.operand1 + buttonName;
      } else if (this.$refs.radio2.checked === true) {
        const buttonName = event.target.textContent.replace(/\s+/g, "");
        this.operand2 = this.operand2 + buttonName;
      } else {
        this.error = "Выберите операнд!";
        return;
      }
    },

    onDeleteNumber() {
      this.error = "";
      if (this.$refs.radio1.checked === true) {
        this.operand1 = this.operand1.slice(0, -1);
      } else if (this.$refs.radio2.checked === true) {
        this.operand2 = this.operand2.slice(0, -1);
      } else {
        this.error = "Выберите операнд!";
        return;
      }
    },

    calculate(operation) {
      const operand1 = Number(this.operand1);
      const operand2 = Number(this.operand2);
      this.error = "";
      if (operand2 === 0 && (operation === "div" || operation === "intDiv")) {
        this.error = "Деление на 0!";
        return;
      }
      const config = this.operations.find(
        (operationConfig) => operationConfig.name === operation
      );
      if (config) {
        this.result = config.action(operand1, operand2);
      }
    },
  },
};
</script>


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
.error {
  padding: 20px;
  border: 1px solid red;
}
.numbers_block {
  padding-top: 50px;
}
</style>

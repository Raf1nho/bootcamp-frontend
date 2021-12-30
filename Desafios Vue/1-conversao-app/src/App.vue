<template>
  <h1>Reais para dólares</h1>
  <div class="label">
    <span id="dolar">
      <InputNumber v-model="dolar" mode="currency" currency="USD" locale="en-US" placeholder="Valor em dólares"/>
    </span>
  </div>
  
  <div class="label">
    <span id="real">
      <InputNumber v-model="real" mode="currency" currency="BRL" locale="pt-BR" placeholder="Valor em reais"/>
      <label for="real"></label>
    </span>
  </div>
  
  <div class="label">
    <Button label="Limpar" @click='clear'/>
    <Button class='btn' label="Converter" @click='convert'/>
  </div>  

  <div class="label" v-if="res">
    <p >Com {{real}} reais é possível comprar {{res}} dólares a {{dolar}} cada </p>
  </div>
</template>

<script>

export default {
  data() {
    return {
      real: null,
      dolar: null,
      res: null,
      description: ''
    }
  },
  methods: {
    convert() {
      this.res = (this.real / this.dolar).toFixed(2)
    },
    clear: function() {
      this.real = null,
      this.dolar = null,
      this.res = null,
      this.description = ''
    }
  }
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.label {
  margin-top: 15px
}

.btn {
  margin-left: 13px !important;
}

input {
  height: 30px;
  width: 200px;
}
</style>

<template>
  <div class="title">Faça a viagem dos seus sonhos</div>
  <div>Use milhas para ter os melhores pacotes de viagens e aproveite suas férias!</div>

  <div class="body">
    <div class="ret viagem">
      <div class="select">
        <label for="origem-pais">País de origem:</label>
        <select @change="onChangeOrigin($event)" name="origem-pais" id="origem-pais"
         >
         <option value="none" selected disabled hidden>
          Selecione um país
          </option>
          <option v-for="(item, index) in location" :key="index">
            {{item.country}}
            </option>
        </select>
      </div>

      <div class="select">
        <label for="origem-cid">Cidade de origem:</label>
        <select :disabled='!selectCitiesOrigin' name="origem-cid" id="origem-cid" @change="chooseOrigin($event)">
          <option value="none" selected disabled hidden>
          Selecione uma cidade
          </option>
          <option v-for="(item, index) in selectCitiesOrigin" :key="index">
            {{item.city}}
          </option>
        </select> 
      </div>

      <div class="select">
        <label for="destino-pais">País de destino:</label>
        <select @change="onChangeDestiny($event)" 
        name="origem-pais" 
        id="origem-pais">
        <option value="none" selected disabled hidden>
          Selecione um país
          </option>
          <option v-for="(item, index) in location" :key="index">
            {{item.country}}
            </option>
        </select>
      </div>

      <div class="select">
        <label for="destino-cid">Cidade de destino:</label>
        <select :disabled='!selectCitiesDestiny' name="destino-cid" id="destino-cid" @change="chooseDestiny($event)">
          <option value="none" selected disabled hidden>
          Selecione uma cidade
          </option>
          <option v-for="(item, index) in selectCitiesDestiny" :key="index">
            {{item.city}}
          </option>
        </select>
      </div>
      
      <div class="passageiros">
        <div >
        <label for="adultos">Adultos:</label><br>
          <button :disabled="adultos == 1" @click='adultos--'>-</button>
          <input v-model="adultos" type="number" id='adultos' class="qtd">
          <button @click='adultos++'>+</button>
        </div>
        
        <div >
        <label for="criancas">Crianças:</label><br>
          <button :disabled="criancas == 0" @click='criancas--'>-</button>
        <input v-model="criancas" type="number" id='criancas' class='qtd'>
        <button @click='criancas++'>+</button>
        </div>
      </div>

      <div class="classe">
        <div>
          <input type="radio" id="economica" name="classe" value="Econômica" v-model="voo">
          <label for="economica">Econômica</label>
        </div>
        <div>
          <input type="radio" id="executiva" name="classe" value="Executiva" v-model="voo">
          <label for="executiva">Executiva</label>
        </div>
      </div>

      <div class="select">
        <label for="milhas">Utilizar <input class="inputMilhas" type="number" name="milhas" v-model="milhas" id="milhas"> Milhas</label>
        <input :disabled='!voo' type="range" id="milhas" name="milhas"
         min="0" :max="milhasMax" step="1" v-model='milhas'>
      </div>

      <div class="select erro title">
        <p>{{erro}}</p>
      </div>

    </div>

    <div class="ret resumo">
      <p class="title">Resumo da viagem</p>
      <p> Origem: {{selectedOrigin}} {{origin}}</p>
      <p>Destino: {{selectedDestiny}} {{destiny}}</p>
      <p>Distância: {{distance}} km</p>
      <p>{{adultos}} adulto(s), {{criancas}} criança(s)</p>
      <p>Tipo de vôo: Classe {{voo}}</p>
      <p>{{valorPorAdulto}} por adulto </p>
      <p>{{valorPorCrianca}} por criança </p>
      <p>Milhas: {{milhas}}</p>
      <p>Valor abatido por milhas: {{descontoMilhas}}</p>
      <p>Total: {{total}}</p>
      <div class="finish">
        <button :disabled="erro != ''" class="btn-finish">Continuar</button>
      </div>
    </div>
  </div>
</template>

<script>
// import {getCountry} from '../service/location.service.js'
import { onBeforeUpdate, ref} from 'vue'

export default {
  name: 'Viagens',

  setup() {
    const location = ref([])
    const selectedOrigin = ref("")
    const selectCitiesOrigin = ref("")
    const selectedDestiny = ref("")
    const selectCitiesDestiny = ref("")
    const origin = ref("")
    const destiny = ref("")
    const adultos = ref(1)
    const criancas = ref(0)
    const voo = ref("")
    const originLatitude = ref(0)
    const originLongitude = ref(0)
    const destinationLatitude = ref(0)
    const destinationLongitude = ref(0)
    const distance = ref(0)
    const valorPorAdulto = ref(0) 
    const valorPorCrianca = ref(0)
    const milhas = ref(0)
    const descontoMilhas = ref(0)
    const total = ref(0)
    const milhasMax = ref(50)
    const erro = ref("")



    fetch("http://localhost:3000/countries")
      .then((resp) => {
        resp.json().then((result) => {
           location.value = result
        })
      })

    onBeforeUpdate(() => {
      validaValores()
      if (originLatitude.value != 0 && originLongitude.value != 0 && destinationLatitude.value != 0 && destinationLongitude.value != 0) {
        getDistance(originLatitude.value, originLongitude.value, destinationLatitude.value, destinationLongitude.value)
      }
    })

    const onChangeOrigin = (event) => {
      selectedOrigin.value = event.target.value
      for (let item of location.value) {
        if (item.country == selectedOrigin.value) {
          selectCitiesOrigin.value = item.cities
          origin.value = ""
        }
      }
    } 

    const onChangeDestiny = (event) => {
      selectedDestiny.value = event.target.value
      for (let item of location.value) {
        if (item.country == selectedDestiny.value) {
          selectCitiesDestiny.value = item.cities
          destiny.value = ""
        }
      }
    } 

    const chooseOrigin = (event) => {
      origin.value = event.target.value
      for (let item of selectCitiesOrigin.value) {
        if (item.city == origin.value) {
          originLatitude.value = item.latitude
          originLongitude.value = item.longitude
        }
      }
    }

    const chooseDestiny = (event) => {
      destiny.value = event.target.value
      for (let item of selectCitiesDestiny.value) {
        if (item.city == destiny.value) {
          destinationLatitude.value = item.latitude
          destinationLongitude.value = item.longitude
        }
      }
    }


    // Calcula distância abaixo

    function degreesToRadians(degrees){
      let pi = Math.PI;
      return degrees * (pi/180);
    }

    function getDistance(
      originLatitude, originLongitude, destinationLatitude, destinationLongitude) {
      
      const EARTH_RADIUS = 6_371.071; // Earth
      const diffLatitudeRadians = degreesToRadians(
      destinationLatitude - originLatitude
      );
      const diffLongitudeRadians = degreesToRadians(
        destinationLongitude - originLongitude
      );
      const originLatitudeRadians = degreesToRadians(originLatitude);
      const destinationLatitudeRadians = degreesToRadians(destinationLatitude);
      const kmDistance =
      2 *
      EARTH_RADIUS *
      Math.asin(
        Math.sqrt(
        Math.sin(diffLatitudeRadians / 2) * Math.sin(diffLatitudeRadians / 2)
        +
        Math.cos(originLatitudeRadians) *
        Math.cos(destinationLatitudeRadians) *
        Math.sin(diffLongitudeRadians / 2) *
        Math.sin(diffLongitudeRadians / 2)
        )
      );
      distance.value = kmDistance.toFixed(2)
      return kmDistance;
    }

    // Calcula valores abaixo

    function calculaValores(){
      if (selectedOrigin.value == selectedDestiny.value) {
        valorPorAdulto.value = (distance.value * 0.3) * adultos.value
        valorPorCrianca.value = (distance.value * 0.15) * criancas.value
      } else {
        valorPorAdulto.value = (distance.value * 0.5) * adultos.value
        valorPorCrianca.value = (distance.value * 0.25) * criancas.value
      }
    }

    function calculoClasse() {
      if (voo.value == "Executiva") {
        valorPorAdulto.value *= 1.8 
        valorPorCrianca.value *= 1.4
      }
    }

    function calculoMilhas() {
      milhasMax.value = ((valorPorAdulto.value +  valorPorCrianca.value) * 50).toFixed(0)
      descontoMilhas.value = milhas.value * 0.02
    }

    function calculaTotal() {
      total.value = valorPorAdulto.value +  valorPorCrianca.value - descontoMilhas.value
      
    }

    function formataValor() {
      if (total.value < 0) {
        total.value = 0
      } 
      valorPorAdulto.value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorPorAdulto.value)
      valorPorCrianca.value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorPorCrianca.value)
      descontoMilhas.value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(descontoMilhas.value)
      total.value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total.value)
    }

    // Validação de valores

    function validaValores(){
        if (adultos.value < 1) {
          erro.value = "Selecione ao menos 1 (um) adulto"
        } else if (origin.value == destiny.value && origin.value != "" && destiny.value != "") {
          erro.value = "Não é possível viajar para a mesma cidade de origem e destino"
          voo.value = ""
        } else if (descontoMilhas.value < 0) {
          erro.value = "Desconto das milhas não pode ser negativo"
        } else if (milhas.value < 0) {
          erro.value = "Quantidade de milhas não pode ser negativa"
        } else {
          calculaValores()
          calculoClasse()
          calculoMilhas()
          calculaTotal()
          formataValor()
          erro.value = ""
        }
        
    }
    


    return {  location, onChangeOrigin, selectedOrigin, selectCitiesOrigin, selectedDestiny, selectCitiesDestiny, onChangeDestiny, adultos, criancas, origin, destiny, chooseOrigin, chooseDestiny, voo, originLatitude, originLongitude, destinationLatitude, destinationLongitude, getDistance, distance, calculaValores, valorPorAdulto, valorPorCrianca, milhas, descontoMilhas, total, erro, milhasMax}
  }
 
}
</script>

<style scoped>
.title {
  font-weight: bold;
  margin-bottom:1rem;
  text-align: center;
}

.body {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 0 10vw 0 15vw;
}

.ret {
  border: 1px solid grey;
  margin-top: 1.5rem;
  padding: 1rem ;
  text-align: left;
  flex: 1 0 0;
  max-height: 532px;
}
.select {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
.classe {
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
.erro {
  color: red;
  font-weight: 500
}
.qtd {
  width: 35px;
  height: 35px;
  padding: 0;
  text-align: center;
  font-size: 18px;
  margin-top: .5rem;
  border: 0;
}
button:not(.btn-finish) {
  width: 35px;
  height: 35px;
  text-align: center;
  font-size: 18px;
  margin: 0 4px;
  border: 0;
  border-radius: 5px;
  cursor: pointer
}
.btn-finish {
  height: 35px;
  text-align: center;
  font-size: 18px;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
}
.finish {
  margin-top:2rem;
  text-align: center;
}
select {
  border: 0;
  font-size: 18px;
  height: 35px;
  background-color: #efefef;
  border-radius: 5px;
  cursor: pointer
}
.passageiros {
  display: flex;
  justify-content: space-around
}
.adultos, .criancas {
  display: flex;
  flex-direction: column;
}
.inputMilhas {
  width: 70px;
  border: none;
  font-size:18px;
  text-align: center;
  color: #2c3e50;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

</style>

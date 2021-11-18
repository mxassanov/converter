<template>
  <div class="h-screen container m-auto flex items-center justify-between">

    <div class="w-4/12 h-48 bg-gray-200 rounded-lg">
      <p class="pt-8 font-mono text-lg text-gray-500">
        {{ currencyNameInput }}
      </p>
    <div class="flex justify-around">
      <select
        @change="convertation"
        v-model="currencyData[0].selected"
        class="form-select w-20 mt-2 h-10
          border-b-2 border-blue-400 outline-none bg-gray-200 font-bold text-2xl mt-10"
      >
        <option
          v-for="country in state.getCountries" :key="country"
        >{{ country }}
        </option>
      </select>

      <input
        @input="convertation"
        v-model="currencyData[0].inputed" type="text"
        onkeyup="this.value = this.value.replace(/[^\d]/g,'')"
        class="border-b-2 border-blue-400 outline-none w-32 h-10 bg-gray-200
        mt-10 font-bold text-2xl"
      />
    </div>
  </div>

      <SwapButton @clicked="currencyDataReverse" />

  <div class="w-4/12 h-48 bg-gray-200 rounded-lg">
    <p class="pt-8 font-mono text-lg text-gray-500">
      {{ currencyNameResult }}
    </p>
    <div class="flex justify-around">
      <select
        @change="convertation"
        v-model="currencyData[1].selected"
        class="form-select w-20 mt-2 h-10
          border-b-2 border-blue-400 outline-none bg-gray-200 font-bold text-2xl mt-10"
      >
        <option
          v-for="country in state.getCountries" :key="country"
        >{{ country }}
        </option>
      </select>

      <input
        v-model="currencyData[1].result"
        type="number"
        readonly
        class=" border-b-2 border-blue-400 outline-none w-32 h-10 bg-gray-200
        mt-10 font-bold text-2xl"
      />
    </div>
  </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SwapButton from '@/components/SwapButton.vue';
import storeOfCurrencies from '@/stores/storeOfCurrencies';
import { Observer } from 'mobx-vue';
import { TCurrency } from '@/types';

@Observer
@Component({
  components: {
    SwapButton
  },
})

export default class Converter extends Vue {
  state = new storeOfCurrencies();
  // eslint-disable-next-line
  currencyData:any[] = [
    {
      selected: 'RUB',
      inputed: '',
      names: 'Российский рубль'
    },
    {
      selected: 'USD',
      result: null,
      names: 'Доллар США'
    }
  ];

  currencyDataReverse():void {
    this.currencyData.reverse();
  }

  mounted():void {
    this.state.fetchCurrencies();
  }

  get currencyNameInput():string {
    return this.currencyData[0].selected === 'RUB' ? 'Российский рубль' : this.currencyData[0].names
  }

  get currencyNameResult ():string {
    const check = ():string => {
    if (this.currencyData[1].selected === 'USD') return 'Доллар США';
    if (this.currencyData[1].selected === 'RUB') return 'Российский рубль';
    else return this.currencyData[1].names;
    }

    return check();
  }

  convertation():void {
    let defCurrency = { Value: 1, Nominal: 1};

    let firstCurrency:TCurrency = this.state.getCurrencies[this.currencyData[0].selected] ?? defCurrency;
    this.currencyData[0].names = firstCurrency.Name;
    let firstCurrencyValue:number = firstCurrency.Value * Number(this.currencyData[0].inputed);
    let firstCurrencyNominal:number = firstCurrency.Nominal;

    let secondCurrency:TCurrency = this.state.getCurrencies[this.currencyData[1].selected] ?? defCurrency;
    this.currencyData[1].names = secondCurrency.Name;
    let secondCurrencyValue:number = secondCurrency.Value;
    let secondCurrencyNominal:number = secondCurrency.Nominal;

    let result:number = (firstCurrencyValue / firstCurrencyNominal) / (secondCurrencyValue / secondCurrencyNominal);

    this.currencyData[1].result = result ? Math.floor(result * 10000) / 10000 : null;
  }
}
</script>

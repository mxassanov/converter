<template>
  <div class="min-h-screen h-full container m-auto flex flex-col">

    <form class="relative w-8/12 mx-auto mb-5" @submit.prevent>
    <svg
        width="20" height="20" fill="currentColor"
        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
    </svg>
    <input
        v-model="filterValue"
        class="focus:border-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border-4 border-gray-200 rounded-md py-2 pl-10"
        type="text" aria-label="Filter currencies"
        placeholder="Filter currencies" />
  </form>

    <CurrencyLayout
      v-for="currencyObj in currenciesData"
      :key="currencyObj.ID"
      :data="currencyObj"
      class="mx-auto mb-4"
     />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CurrencyLayout from "@/components/CurrencyLayout.vue";
import storeOfCurrencies from '@/stores/storeOfCurrencies';
import { TCurrency, TCurrenciesObj } from '@/types';

@Component({
  components: {
    CurrencyLayout,
  },
})

export default class Currencies extends Vue {
  state = new storeOfCurrencies();
  filterValue = '';

  mounted():void {
    this.state.fetchCurrencies();
  }

  get filteredData():TCurrenciesObj {
    let result:TCurrenciesObj = {};
      for (const currencyCode in this.state.getCurrencies) {
        let currency:TCurrency = this.state.getCurrencies[currencyCode];
        let search:string = this.filterValue.trim();
        if (currency.Name.includes(search) || currency.CharCode.includes(search.toUpperCase())) {
            result[currencyCode] = currency;
        }
      }
      return result;
    }

  get currenciesData() {
    return this.filterValue.length > 1 ? this.filteredData : this.state.getCurrencies;
  }
}
</script>

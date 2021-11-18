<template>
  <div class="w-8/12 h-24 bg-gray-200 rounded-lg flex flex-col px-6">
    <p class="pt-4 pb-2 font-mono text-md text-gray-600 flex">
      {{ data.Name }}
    </p>
    <div class="flex justify-between text-xl font-bold">
      <div class="flex">
        <span class="mr-8">{{ data.Nominal }} {{ data.CharCode }}</span>
        <span class="mr-10">⟵⟶</span>
        <span>{{ data.Value }} RUB</span>
      </div>
      <span :class="currencyValueStyle">{{ currencyValueResult }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { TCurrency } from "@/types";

@Component
export default class CurrencyLayout extends Vue {
  @Prop({})
  readonly data!: TCurrency;

  get currencyValue(): number {
    return (
      Math.floor(
        (Number(this.data.Value) - Number(this.data.Previous)) * 10000
      ) / 10000
    );
  }

  get currencyValueResult(): string {
    return this.currencyValue
      ? `🠑 ${this.currencyValue}`
      : `🠓  ${this.currencyValue}`;
  }

  get currencyValueStyle(): string {
    return this.currencyValue ? "text-green-400" : "text-red-400";
  }
}
</script>
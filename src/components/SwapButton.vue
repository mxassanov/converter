<template>
  <button
    @click="clicked"
    class="
      p-3
      rounded-full
      bg-gray-200
      w-18
      h-18
      border-4 border-blue-500
      transform
      hover:scale-110
    "
  >
    <Icon
      icon="mdi:arrow-left-right"
      width="40"
      height="40"
      color="rgb(59, 130, 246)"
    />
  </button>
</template>

<script lang="ts">
import { Component, Vue, Emit } from "vue-property-decorator";
import { Icon } from "@iconify/vue2";

@Component({
  components: {
    Icon,
  },
})
export default class SwapButton extends Vue {
  @Emit()
  clicked() {
    return null;
  }
}
</script>
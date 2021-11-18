<template>
  <div id="app" class="bg-blue-500">
    <div class="navigation bg-blue-500">
      <ul class="flex border-b">
        <li class="-mb-px mr-1">
          <router-link
            to="/"
            exact
            :class="routerLinkStyles"
            active-class="border-l border-t border-r rounded-t"
          >
            Список валют
          </router-link>
        </li>
        <li class="mr-1">
          <router-link
            to="/converter"
            :class="routerLinkStyles"
            active-class="border-l border-t border-r rounded-t -mb-px"
          >
            Конвертер
          </router-link>
        </li>
      </ul>
    </div>

    <div class="mt-3">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  computed: {
    routerLinkStyles() {
      return "bg-blue-500 inline-block py-2 px-4 text-gray-100 hover:text-black font-bold";
    },
  },
});
</script>

<style>
#app {
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.2) inset;
  background-color: #f9f9fd;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgb(59, 130, 246);
}
</style>

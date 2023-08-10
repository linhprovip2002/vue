<template>
  <div id="app">
    <header>
      <NavbarComponent />
    </header>
    <body>
      <router-view />
    </body>
  </div>
</template>

<script>
import NavbarComponent from "./components/Navbar/narbar.vue";
export default {
  name: "App",
  components: {
    NavbarComponent,
  },
};
</script>
<style>
/* Your styles here */
</style>
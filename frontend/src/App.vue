<template>
  <div id="app">
    <HeaderComponent />
    <main class="content">
      <router-view />
    </main>
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "/src/components/Header.vue";
import FooterComponent from "/src/components/Footer.vue";

export default {
  components: { HeaderComponent, FooterComponent}
};

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content{
  flex: 1;
  overflow-y: auto;
}

body {
  background-color: rgb(45, 45, 45);
  margin: 0;
}
</style>

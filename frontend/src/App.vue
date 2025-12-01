<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/contact">Contact</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: rgb(31, 163, 163);
}

nav a.router-link-exact-active {
  color: rgb(255, 102, 82);
}
body {
  background-color: rgb(45, 45, 45);
  margin: 0;
}
</style>

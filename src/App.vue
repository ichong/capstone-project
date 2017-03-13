<template>
  <div id="app">
    <div id="header-container">
      <h1>Wedding Tasklist</h1>
    </div>
    
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body {
  margin: 0;
  line-height: 1;
  font-family: "Lato", sans-serif;
  background-color: #F9EAE1;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #84828F;
  margin: 0;
  background-color: #F9EAE1;
}

#header-container {
  position: relative;
  height: 30vh;
  width: 100%;
  margin: 0 auto;
  /*background-image: url('/capstone-project/static/cover.jpg');*/
  background: #fff;
  border-bottom: 1px solid #999;
  background-size: cover;
}

#header-container h1 {
  margin: 0 auto;
  text-align: center;
  position: absolute;
  top: 40%;
  width: 100%;
  font-size: 52px;
  /*font-family: 'Pacifico', cursive;*/
  font-family: 'Clicker Script', cursive;
  color: #333;
}

#header-container:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.2);
}

#header {
  display: block;
  width: 70%;
  margin: auto;
}

</style>

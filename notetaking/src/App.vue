<template>
  <div id="app">
    <Login v-if="!isLogging" v-on:loginUser="changeLoginStatus($event)"/>
    <Note v-if="isLogging"  v-on:logOutUser="changeLoginStatus($event)"/>
  </div>
</template>

<script>
import  Login from "./components/Login";
import  Note from "./components/Note";
export default {
  name: 'app',
  components: {
    Login,
    Note,
  },
  data() {
    return {
      isLogging:true,
    }
  },
  methods: {
    changeLoginStatus(event){
	  console.log('In change Login Status');
	  this.isLogging=event;
	  
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

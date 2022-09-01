<template>
  <div id="app">
    <Header />
    <Background />
    <Main />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header/Header'
import Background from './components/Background/Background'
import Main from './components/Main/Main'
import Footer from './components/Footer/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Background,
    Main,
    Footer
  }
}
</script>

<style>
@import url('../normalize.css');
@import url('../styles.css');
</style>

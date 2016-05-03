<template>
  <div id="app">
    <map-controller></map-controller>
    <pedometer-controller></pedometer-controller>
  </div>
</template>

<script>
import MapController from './MapController'
import PedometerController from './PedometerController'

require('style!css!normalize-css/normalize.css')
require('style!css!material-design-lite/material.min.css')
require('material-design-lite/material.min.js')

export default {
  components: {
    MapController,
    PedometerController
  }
}
</script>

<style>
html {
  height: 100%;
}
body {
  height: 100%;
  overflow: hidden;
}
#app{
  height: 100%;
}
</style>

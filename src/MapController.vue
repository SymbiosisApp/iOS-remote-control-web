<template>
  <div class="map-controller">
    <div v-el:map class="map"></div>
    <div class="controls">
      <mdl-button>Button</mdl-button>
      <mdl-slider :value.sync="amount" min="0" max="100"></mdl-slider>
    </div>
  </div>

</template>

<script>
import {load, Map, Marker} from 'vue-google-maps'

export default {
  components: {
    Map
  },
  ready () {
    var map;
    var mapElem = this.$els.map
    function initMap() {
      map = new google.maps.Map(mapElem, {
        center: {lat: 48.87251, lng: 2.3853973},
        zoom: 16
      });
    }
    window['vueGoogleMapsInit'] = () => {
      setTimeout(initMap, 200)
    }
    load('AIzaSyAIHiKtyQ2FO-mBG3jVQA4XqgKsEqlwwFk')
  },
  data () {
    return {
      amount: 0
    }
  }
}
</script>

<style lang="sass" scoped>
  .map-controller{
    height: 50%;
    width: 100%;
    position: relative;
  }
  .map{
    position: absolute;
    left: 0;
    top: 0;
    right: 50%;
    bottom: 0;
  }
  .controls{
    position: absolute;
    padding: 10px;
    left: 50%;
    top: 0;
    right: 0;
    bottom: 0;
  }
</style>

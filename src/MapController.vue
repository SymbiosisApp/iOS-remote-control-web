<template>
  <div class="map-controller">
    <div v-el:map class="map"></div>
    <div class="controls">
      <div class="me-position">
        <mdl-textfield floating-label="lat" :value.sync="lat"></mdl-textfield>
        <mdl-textfield floating-label="lng" :value.sync="lng"></mdl-textfield>
      </div>
      <div>
        <mdl-textfield class="duration" floating-label="Duration" :value="textVal" @input="textChange"></mdl-textfield>
        <mdl-slider :value="sliderPos" min="200" max="10000" @input="sliderChange"></mdl-slider>
      </div>
      <div>
        <mdl-button @click="go">Go !</mdl-button>
        <mdl-button @click="stop">Stop</mdl-button>
      </div>
    </div>
  </div>

</template>

<script>
import {load, Map, Marker} from 'vue-google-maps'
import socket from './socket'
import padStart from 'lodash/padStart'

// socket.on('news', function (data) {
//   console.log(data);
//   socket.emit('my other event', { my: 'data' });
// });

export default {
  components: {
    Map
  },
  ready () {
    var mapElem = this.$els.map
    var vm = this
    function initMap() {
      vm.map = new google.maps.Map(mapElem, {
        center: {lat: 48.87251, lng: 2.3853973},
        zoom: 16
      });

      // Objectif
      vm.marker = new google.maps.Marker({
        map: vm.map,
        draggable: true,
        position: {lat: vm.lat, lng: vm.lng}
      });
      google.maps.event.addListener(vm.marker, 'drag', function () {
        vm.lat = vm.marker.position.lat()
        vm.lng = vm.marker.position.lng()
      })
      vm.map.addListener('click', function(e) {
        vm.lat = e.latLng.lat()
        vm.lng = e.latLng.lng()
        vm.marker.setPosition({
          lat: vm.lat,
          lng: vm.lng
        })
      });


      // Me
      var meIcon = {
        path: 'M-10,0a10,10 0 1,0 20,0a10,10 0 1,0 -20,0 z',
        fillColor: 'rgb(95, 130, 204)',
        fillOpacity: 0.8,
        scale: 1,
        strokeColor: 'white',
        strokeWeight: 5
      }
      vm.markerMe = new google.maps.Marker({
        position: vm.me,
        icon: meIcon,
        map: vm.map
      });
    }
    window['vueGoogleMapsInit'] = () => {
      setTimeout(initMap, 200)
    }
    load('AIzaSyAIHiKtyQ2FO-mBG3jVQA4XqgKsEqlwwFk')

    socket.on('UPDATE_ME_POSITION', function (data) {
      vm.updateMePosition(data)
    })
  },
  data () {
    return {
      sliderPos: 0,
      time: 0,
      textVal: "0",
      timeMult: 1.5,
      lat: 48.87251,
      lng: 2.3853973,
      me: { lat: 48.87251, lng: 2.3853973 },
      map: null,
      marker: null,
      markerMe: null,
      animPos: null
    }
  },
  methods: {
    go () {
      this.stop()
      var position = {
        lat: this.me.lat,
        lng: this.me.lng
      }
      var data = {
        time: this.time,
        lat: this.lat,
        lng: this.lng,
      }
      this.animPos = TweenMax.to(position, this.time / 1000, {
        lat: this.lat,
        lng: this.lng,
        onUpdate: function (self) {
          socket.emit('SET_ME_POSITION', { lat: position.lat, lng: position.lng });
        }
      })
      console.log(data)
    },
    stop () {
      if (this.animPos) {
        this.animPos.kill()
      }
    },
    textChange (e) {
      var valArr = e.target.value.split(':')
      var val = 0
      if (valArr.length == 1) {
        val = parseInt(valArr[0], 10)
      } else
      if (valArr.length == 2) {
        val = (parseInt(valArr[0], 10) * 60) + parseInt(valArr[1], 10)
      }
      if (!isNaN(val)) {
        this.time = val
        // this.sliderPos = Math.floor(Math.pow(val, (1/this.timeMult)) * 2)
        this.sliderPos = val
      }
    },
    sliderChange (e) {
      var val = e.target.value
      // var total = Math.floor(Math.pow(val, this.timeMult) / 2)
      var total = val
      this.time = total
      var min = padStart(Math.floor(total/60), 2, '0')
      var sec = padStart(total % 60, 2, '0')
      // this.textVal = `${min}:${sec}`
      this.textVal = total
    },
    updateMePosition (data) {
      this.me = data
      this.markerMe.setPosition(data)
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
  .me-position{
    padding: 10px 10px 0 10px;
  }
  .me-position > div {
    width: 48%;
    display: inline-block;
  }
  .duration{
    margin-left: 10px;
  }
</style>

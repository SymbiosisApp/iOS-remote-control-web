<template>
  <div class="pedometer-controller">
    <div  v-el:ped class="pedometer">Steps : {{counterSteps}}</div>
    <div class="steps">
      <mdl-textfield floating-label="Pedometer" :value.sync="steps"></mdl-textfield>
    </div>
    <div>
      <mdl-button @click="add">Add</mdl-button>
      <mdl-button @click="restart">Restart</mdl-button>
    </div>
  </div>
</template>

<script>
import socket from './socket'

export default {
  ready: function() {
    var vm = this
    socket.on('UPDATE_PEDOMETER', function (data) {
      vm.countSteps(data)
    })
    //each minutes emit value of pedometer
  },
  data () {
    return {
      steps: 0,
      counterSteps : 0
    }
  },
  methods: {
    add () {
      const vm = this
      var steps = this.steps
      socket.emit('SET_PEDOMETER', steps);
    },
    countSteps (data) {
      this.counterSteps = parseInt(this.counterSteps) + parseInt(data)
    },
    restart () {
      this.counterSteps = 0
      this.steps = 0
    }
  }
}
</script>

<style lang="sass" scoped>
  .pedometer-controller{
    margin-left: 20px;
    margin-top: 20px;
  }
  .steps{
    width: 10%;
  }
</style>

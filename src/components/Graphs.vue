<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet color="transparent">
          <v-sparkline
            :value="graphValues"
            color="secondary"
            height="100"
            padding="10"
            stroke-linecap="round"
            smooth
          >
          </v-sparkline>
        </v-sheet>
        <div class="text-h6 font-weight-black">
          {{graphTitle}}
        </div>
        <div class="text-caption">
          Last {{dateType}}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props:['graphValues', 'graphTitle', 'dateType']
}
</script>

<style>

</style>
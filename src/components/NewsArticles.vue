<template>
  <v-row class="">
    <v-col cols="12"> 
      <a :href="item.url">
        <div class="text-body-1 font-weight-bold text-uppercase">
          {{item.title}}
        </div>
        <div class="text-body-1 grey--text">
          {{item.description}}
        </div>
      </a>
    </v-col>
    <v-col cols="12">
      <v-divider></v-divider>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props:['item']
}
</script>

<style>

</style>
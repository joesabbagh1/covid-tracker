<template>
  <v-row class="">
    <v-col cols="12"> 
      <a :href="item.url" class="text-decoration-none text-body-1 grey--text text--darken-2 ">
        {{item.title}}
      </a>
    </v-col>
    <v-col cols="12" class="py-0" align="right">
      Source: {{item.source}}
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
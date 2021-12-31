<template>
  <v-row>
    <v-col cols="3" class="pa-1">
      <div>
        {{selected}}
      </div>
      <div>
        <v-select
          @input="onChange"
          v-model="selected"
          :items="countries"
          label="Select"
          solo
          single-line
        >
        </v-select>
      </div>
    </v-col>
    <v-col cols="3" class="pa-1">
      <div>
        <div class="red lighten-5 red--text text-h5 font-weight-black pa-4 rounded-t-lg pb-0">
          {{ numberWithCommas(daily.total_cases) }}
        </div>
        <div class="red lighten-5 red--text text-h6 font-weight-regular pb-1">
          +{{ numberWithCommas(dailyNew.total_cases) }}
        </div>
        <div class="red lighten-4 red--text text-subtitle-1 font-weight-bold rounded-b-lg">
          Comfirmed
        </div>
      </div>
    </v-col>
    <v-col cols="3" class="pa-1">
      <div class="green lighten-5 green--text text-h5 font-weight-black pa-4 rounded-t-lg pb-0">
        {{ numberWithCommas(daily.recovered) }}
      </div>
      <div class="green lighten-5 green--text text-h6 font-weight-regular pb-1">
        +{{ numberWithCommas(dailyNew.recovered) }}
      </div>
      <div class="green lighten-4 green--text text-subtitle-1 font-weight-bold rounded-b-lg">
        Recovered
      </div>
    </v-col>
    <v-col cols="3" class="pa-1">
      <div class="grey lighten-2 grey--text text--darken-2 text-h5 font-weight-black pa-4 rounded-t-lg pb-0">
        {{ numberWithCommas(daily.deaths) }}
      </div>
      <div class="grey lighten-2 grey--text text--darken-2 text-h6 font-weight-regular pb-1">
        +{{ numberWithCommas(dailyNew.deaths) }}
      </div>
      <div class="grey lighten-1 grey--text text--darken-2 text-subtitle-1 font-weight-bold rounded-b-lg pb-1">
        Death
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['daily','dailyNew','countries'],

  data() {
    return {
      selected: 0,
    }
  },

  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },

    onChange() {
      const country = this.countries.find((item) => item.ID === this.selected)
      this.$emit('get-country', country)
    },
    yo(){
      console.log(this.selected)
    }
  },

  computed:{
  }
}
</script>

<style>

</style>
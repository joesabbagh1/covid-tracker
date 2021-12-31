<template>
  <v-row>
    <!-- <v-col cols="3" class="pa-1">
      <div>
        {{selected}}
      </div>
      <div>
        <v-select
          v-model="selected"
          :items="CountriesTitles"
          menu-props="auto"
          label="Select"
          solo
          prepend-icon="mdi-map"
          single-line
        >
        </v-select>
      </div>
    </v-col> -->
    <v-col cols="3" class="pa-1">
      <div>
        <div class="red lighten-5 red--text text-h5 font-weight-black pa-4 rounded-t-lg">
          {{ numberWithCommas(stats.total_cases) }}
        </div>
        <div class="red lighten-4 red--text text-subtitle-1 font-weight-bold rounded-b-lg">
          Comfirmed
        </div>
      </div>
    </v-col>
    <v-col cols="3" class="pa-1">
      <div class="green lighten-5 green--text text-h5 font-weight-black pa-4 rounded-t-lg">
        {{ numberWithCommas(stats.recovered) }}
      </div>
      <div class="green lighten-4 green--text text-subtitle-1 font-weight-bold rounded-b-lg">
        Recovered
      </div>
    </v-col>
    <v-col cols="3" class="pa-1">
      <div class="grey lighten-2 grey--text text--darken-2 text-h5 font-weight-black pa-4 rounded-t-lg">
        {{ numberWithCommas(stats.deaths) }}
      </div>
      <div class="grey lighten-1 grey--text text--darken-2 text-subtitle-1 font-weight-bold rounded-b-lg">
        Death
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['stats'],

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
  },

  computed:{
  }
}
</script>

<style>

</style>
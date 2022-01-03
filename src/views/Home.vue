<template>
  <main v-if="!loading" class="indigo lighten-5">
    <v-container fluid>
      <v-row class="pl-16">
        <v-col cols="9" class="pt-16">
          <v-row>
            <v-col cols="12" align="center">
              <DataBoxes :daily="dailyData" :countries="countries" :dailyNew="newData" @get-country="changeSelectedCountry" />
            </v-col>
          </v-row>
          <v-row justify="start" class="">
            <v-col cols="2" class="pa-7 pl-0">
              <v-select
                v-model="graphsDate"
                :items="dateSelection"
                background-color="grey lighten-1"
                flat
                solo
                dense
                label="last month"
                @input="changeGraphDate"
              >
              </v-select>
            </v-col>
          </v-row>
          <v-row class="">
            <v-col cols="6" align="center" class="pa-6">
              <div
                class="mx-auto"
                color="grey lighten-4"
              >
                <v-sheet color="transparent">
                  <v-sparkline
                    :value="TotalCases"
                    color="secondary"
                    height="100"
                    padding="10"
                    stroke-linecap="round"
                    smooth
                  >
                  </v-sparkline>
                </v-sheet>
                <div class="text-h6 font-weight-black">
                  Total Cases 
                </div>
                <div class="text-caption">
                  the last month
                </div>
              </div>
            </v-col>
            <v-col cols="6" align="center" class="pa-6">
              <div>
                <v-sheet color="transparent">
                  <v-sparkline
                    :value="TotalDeaths"
                    color="secondary"
                    height="100"
                    padding="10"
                    stroke-linecap="round"
                    smooth
                  >
                  </v-sparkline>
                </v-sheet>
                <div class="text-body-1 font-weight-black">
                  Total Deaths
                </div>
                <div class="text-caption">
                  the last month
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row class="pt-16">
            <v-col cols="6" align="center" class="pa-6">
              <div
                class="mx-auto"
                color="grey lighten-4"
              >
                <v-sheet color="transparent">
                  <v-sparkline
                    :value="NewCases"
                    color="secondary"
                    height="100"
                    padding="10"
                    stroke-linecap="round"
                    smooth
                  >
                  </v-sparkline>
                </v-sheet>
                <div class="text-body-1 font-weight-black">
                  New Cases
                </div>
                <div class="text-caption">
                  the last month
                </div>
              </div>
            </v-col>
            <v-col cols="6" align="center" class="pa-6">
              <div
                class="mx-auto"
                color="grey lighten-4"
              >
                <v-sheet color="transparent">
                  <v-sparkline
                    :value="NewDeaths"
                    color="secondary"
                    height="100"
                    padding="20"
                    stroke-linecap="round"
                    smooth
                  >
                  </v-sparkline>
                </v-sheet>
                <div class="text-body-1 font-weight-black">
                  New Deaths
                </div>
                <div class="text-caption">
                  the last month
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="3" class="pt-16 pl-8">
          <v-container fluid class="pb-16">
            <v-row class="" justify="center" align="center">
              <v-col cols="8" align="center" class="pr-0">
                <v-progress-circular
                  :size="150"
                  :width="15"
                  :rotate="-90"
                  :value="recoveryPercentage"
                  color="green"
                >
                  <div class="text-h4">
                    {{recoveryPercentage}}%
                  </div>
                </v-progress-circular>
              </v-col>
              <v-col cols="1" class="pl-0">
                <div class="text-body-1 font-weight-black pt-4" style="writing-mode: vertical-rl; text-orientation: mixed;">
                  Recovery Rate
                </div>
              </v-col>
            </v-row>
            <v-row justify="center" align="center">
              <v-col cols="8" align="center" class="pr-0">
                <v-progress-circular
                  :size="150"
                  :width="15"
                  :rotate="-90"
                  :value="deathPercentage"
                >
                  <div class="text-h4">
                    {{deathPercentage}}%
                  </div>
                </v-progress-circular>
              </v-col>
              <v-col cols="1" class="pl-0">
                <div class="text-body-1 font-weight-black pt-4" style="writing-mode: vertical-rl; text-orientation: mixed;">
                  Death Rate
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col class="text-h3 pt-0" align="center">
                NEWS
              </v-col>
            </v-row>
              <template v-for="(item, index) in news" >
                <Articles :key="item.title" :item="item" v-if="index < newsIndex" />
              </template>
              <v-col class="pl-0 pt-6">
                <v-btn @click="newsIndex += 5">
                  Show More
                </v-btn>
              </v-col>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </main>
  <main class="white" v-else>
    <v-conainer fluid fill-height class="white">
      <v-row justify="center" align="center">
        <v-col align="center">
          <v-img width="100" :src="require('../assets/hourglass.gif')" />
        </v-col>
      </v-row>
    </v-conainer>
  </main>
</template>

<script>
import DataBoxes from '../components/DataBoxes.vue'
import Articles from '../components/NewsArticles.vue'
import axios from "axios";

  export default {
    components: { Articles, DataBoxes },

    data(){
      return{
        news:[],
        newsIndex:4,
        loading: true,
        countryTitle: 'Global',
        countries:[],
        dateData: [],
        dailyData:[],
        newData:[],
        countriesData:[],
        selectedCountry: '',
        dateSelection:['month','year'],
        graphsDate: 'month',
        // cases: null,
        // recovered: null,
        // activeCases: null,
        // deaths: null,
      }
    },

    async created() {
      this.fetchNewsData()
      await this.fetchCovidDataMonth()
      await this.fetchCovidSummaryData()
      await this.fetchGlobalHistoryData()
      this.loading = false
    },

    methods: {
      async fetchCovidDataMonth(country) {

        const options = {
          method: 'GET',
          url: 'https://coronavirus-map.p.rapidapi.com/v1/spots/month',
          params: {region: `${country}`},
          headers: {
            'x-rapidapi-host': 'coronavirus-map.p.rapidapi.com',
            'x-rapidapi-key': '4775c01834msh095a5c3918e458fp11cc9djsn1bbceae4a4c6'
          }
        };
        let self = this
        axios.request(options).then(function (response) {
          self.dateData = Object.values(response.data.data);

        }).catch(function (error) {
          console.error(error);
        });
      },
      async fetchCovidDataYear(country) {

        const options = {
          method: 'GET',
          url: 'https://coronavirus-map.p.rapidapi.com/v1/spots/year',
          params: {region: `${country}`},
          headers: {
            'x-rapidapi-host': 'coronavirus-map.p.rapidapi.com',
            'x-rapidapi-key': '4775c01834msh095a5c3918e458fp11cc9djsn1bbceae4a4c6'
          }
        };
        let self = this
        axios.request(options).then(function (response) {
          self.dateData = Object.values(response.data.data);

        }).catch(function (error) {
          console.error(error);
        });
      },
      async fetchCovidSummaryData() {

        const options = {
          method: 'GET',
          url: 'https://coronavirus-map.p.rapidapi.com/v1/summary/latest',
          headers: {
            'x-rapidapi-host': 'coronavirus-map.p.rapidapi.com',
            'x-rapidapi-key': '4775c01834msh095a5c3918e458fp11cc9djsn1bbceae4a4c6'
          }
        };
        let self = this
        axios.request(options).then(function (response) {
          self.countries = Object.keys(response.data.data.regions)
          self.dailyData = response.data.data.summary
          self.newData = response.data.data.change   
          self.countriesData = response.data.data.regions
        }).catch(function (error) {
          console.error(error);
        });
      },
      
      async fetchNewsData(){
        const options = {
          method: 'GET',
          url: 'https://covid-19-news5.p.rapidapi.com/news',
          headers: {
            'x-rapidapi-host': 'covid-19-news5.p.rapidapi.com',
            'x-rapidapi-key': '4775c01834msh095a5c3918e458fp11cc9djsn1bbceae4a4c6'
          }
        };
        let self = this
        axios.request(options).then(function (response) {
          self.news = response.data
          for (let i = self.news.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [self.news[i], self.news[j]] = [self.news[j], self.news[i]];
          }
        }).catch(function (error) {
          console.error(error);
        });
      },

      async fetchGlobalHistoryData(){
        const options = {
          method: 'GET',
          url: 'https://coronavirus-map.p.rapidapi.com/v1/spots/summary',
          headers: {
            'x-rapidapi-host': 'coronavirus-map.p.rapidapi.com',
            'x-rapidapi-key': '4775c01834msh095a5c3918e458fp11cc9djsn1bbceae4a4c6'
          }
        };
        let self = this
        axios.request(options).then(function (response) {
          self.dateData = Object.values(response.data.data);
        }).catch(function (error) {
          console.error(error);
        });
      },

      changeSelectedCountry(country) {
        this.selectedCountry = country
        this.dailyData = this.countriesData[country]
        this.newData = this.countriesData[country].change
        if (this.graphsDate === 'month') {
          this.fetchCovidDataMonth(country)
        }
        if (this.graphsDate === 'year') {
          this.fetchCovidDataYear(country)
        }
      },

      changeGraphDate(){
        if (this.graphsDate === 'month') {
          this.fetchCovidDataMonth(this.selectedCountry)
        }
        if (this.graphsDate === 'year') {
          this.fetchCovidDataYear(this.selectedCountry)
        }
      }
      // async clearCountryData() {
      //   this.loading = true
      //   const data = await this.fetchCovidData()
      //   this.title = 'Global'
      //   this.stats = data.Global
      //   this.loading = false
      // },
    },

    computed:{
      TotalCases(){
        const cases = this.dateData.map((item)=>{
          return item.total_cases
        })
        cases.reverse()
        if (this.graphsDate === 'month') {
          cases.splice(0, cases.length-23)
        }
        return cases
      },
      TotalDeaths(){
        const cases = this.dateData.map((item)=>{
          return item.deaths
        })
        cases.reverse()
        if (this.graphsDate === 'month') {
          cases.splice(0, cases.length-23)
        }
        return cases
      },
      NewCases(){
        const allCases = this.dateData
        const newCases = []
        for (let i = 1; i < 23 ; i++) {
          let newCase = Math.abs(allCases[i].total_cases - allCases[i+1].total_cases)
          newCases.push(newCase)
        }
        newCases.reverse()
        const result = newCases.filter(v => v!==0)
        console.log(result)
        return result
      },
      NewDeaths(){
        const allCases = this.dateData
        const newDeaths = []
        for (let i = 1; i < 23; i++) {
          let newDeath = Math.abs(allCases[i].deaths - allCases[i-1].deaths)
          newDeaths.push(newDeath)
        }
        newDeaths.reverse()
        const result = newDeaths.filter(v => v!==0)
        return result
      },
      recoveryPercentage(){
        const recoveredPercentage = (this.dailyData.recovered*100)/(this.dailyData.total_cases - this.dailyData.active_cases)
        return recoveredPercentage.toFixed(2)
      },
      deathPercentage(){
        return (this.dailyData.death_ratio * 100).toFixed(2)
      }
    }
  }
</script>

<style>

</style>
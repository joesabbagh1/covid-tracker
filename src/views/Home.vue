<template>
  <main v-if="!loading">
    <v-container fluid>
      <v-row class="pl-16">
        <v-col cols="9" class="pt-16">
          <v-row>
            <v-col cols="12" align="center">
              <DataBoxes :daily="dailyData" :countries="countries" :dailyNew="newData" @get-country="changeSelecyedCountry" />
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
                    :value="TotalCases"
                    color="secondary"
                    height="100"
                    padding="10"
                    stroke-linecap="round"
                    smooth
                  >
                  </v-sparkline>
                </v-sheet>
                <div class="text-body-1 font-weight-black">
                  Total Cases
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
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="3" class="pt-16">
          <v-container>
            <v-row>
              <v-col class="text-h3">
                NEWS
              </v-col>
            </v-row>
              <template v-for="item in news" >
                <Articles :key="item.title" :item="item" />
              </template>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
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
        loading: true,
        countryTitle: 'Global',
        countries:[],
        dateData: [],
        dates:[],
        dailyData:[],
        newData:[]
      }
    },

    async created() {
      // this.fetchNewsData()
      await this.fetchCovidData()
      await this.fetchCovidSummaryData()
      // this.dataDate = data.Date
      // this.stats = data.Global
      // this.countries = data.Countries
      this.loading = false
    },

    methods: {
      async fetchCovidData(country) {

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
          self.dates = Object.keys(response.data.data);
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
          self.dailyData = response.data.data.summary
          self.newData = response.data.data.change
          self.countries = Object.keys(response.data.data.regions)
          console.log(self.countries)
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
          console.log(self.news)
        }).catch(function (error) {
          console.error(error);
        });
      },

      changeSelecyedCountry(country) {
        this.countryTitle = country
        this.fetchCovidData(country)
      },
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
        return cases
      },
      TotalDeaths(){
        const cases = this.dateData.map((item)=>{
          return item.deaths
        })
        cases.reverse()
        return cases
      },
      NewCases(){
        const allCases = this.dateData
        const newCases = []
        for (let i = 1; i < allCases.length - 1; i++) {
          let newCase = Math.abs(allCases[i].total_cases - allCases[i+1].total_cases)
          newCases.push(newCase)
        }
        newCases.reverse()
        return newCases
      },
      NewDeaths(){
        const allCases = this.dateData
        const newCases = []
        for (let i = 1; i < allCases.length - 1; i++) {
          let newCase = allCases[i].deaths - allCases[i-1].deaths
          newCases.push(newCase)
        }
        newCases.reverse()
        return newCases
      },
      DailyNewCase(){
        const current = this.dateData[0].total_cases - this.dateData[1].total_cases
        return current
      },
      DailyNewDeath(){
        const current = this.dateData[0].deaths - this.dateData[1].deaths
        return current
      },
    }
  }
</script>

<style>

</style>
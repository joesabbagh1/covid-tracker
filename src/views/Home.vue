<template>
  <main v-if="!loading">
    <v-container fluid>
      <v-row class="pl-16">
        <v-col cols="9" class="pt-16">
          <v-row>
            <v-col cols="12" align="center">
              <DataBoxes @get-country="getCountryData" :stats="stats" :countries="countries" />
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
                    :labels="Months"
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
              <div>
                <v-sheet color="transparent">
                  <v-sparkline
                    :value="NewDeaths"
                    :labels="Months"
                    color="secondary"
                    height="100"
                    padding="10"
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
          <v-row class="pt-16">
            <v-col cols="6" align="center" class="pa-6">
              <div
                class="mx-auto"
                color="grey lighten-4"
              >
                <v-sheet color="transparent">
                  <v-sparkline
                    :value="NewCases"
                    :labels="Months"
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
                    :value="NewDeaths"
                    :labels="Months"
                    color="secondary"
                    height="100"
                    padding="10 "
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
        Months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        NewCases:[
          0,16,167,200,400,1200,3000,10000,7000,2000,1000,150
        ],
        NewDeaths:[
          0,5,8,10,20,22,27,40,50,100,300,150
        ],
        loading: true,
        title: 'Global',
        dataDate: '',
        stats: {},
        countries: [],
      }
    },
    mounted(){
      this.fetchNewsData()
    },
    methods: {
      async fetchCovidData() {
        const res = await fetch('https://api.covid19api.com/summary')
        const data = await res.json()
        return data
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
      setNewsData(data){
        this.news = data
      },
      getCountryData(country) {
        this.stats = country
        this.title = country.Country
      },
      // async clearCountryData() {
      //   this.loading = true
      //   const data = await this.fetchCovidData()
      //   this.title = 'Global'
      //   this.stats = data.Global
      //   this.loading = false
      // },
    },
    async created() {
      const data = await this.fetchCovidData()
      // const newsData= await this.fetchNewsData()
      // console.log(newsData)
      this.dataDate = data.Date
      this.stats = data.Global
      this.countries = data.Countries
      this.loading = false
    },
  }
</script>

<style>

</style>
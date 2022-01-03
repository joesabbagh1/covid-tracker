<template>
  <h1>yo</h1>
</template>

<script>
export default {
  data(){
    return{
      yo:[12,12,32,432,53,5,354535,35,353,0,0,0,0,0,0,3,4]
    }
  },
  created(){
    const res = this.yo.filter(v => v!==0)
    console.log(res)
  }
}
</script>

<style>

</style>
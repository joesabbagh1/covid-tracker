<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="7" class="pa-0">
        <v-progress-circular
          :size="150"
          :width="15"
          :rotate="-90"
          :value="percentage"
          :color="color"
        >
          <div class="text-h4">
            {{percentage}}%
          </div>
        </v-progress-circular>
      </v-col>
      <v-col cols="1" class="pa-0">
        <div class="text-body-1 font-weight-black pt-4" style="writing-mode: vertical-rl; text-orientation: mixed;">
          {{title}}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props:['percentage', 'title', 'color']
}
</script>

<style>

</style>
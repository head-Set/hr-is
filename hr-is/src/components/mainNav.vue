<template>
  <v-app-bar
    color=#0080ff
    dark
    height=70
  >
    <v-spacer/>
    <v-btn outlined rounded elevation=10 depressed @click="$router.push('/')">home</v-btn>
    <v-divider vertical class="mx-4"/>
    <v-btn outlined rounded elevation=10 depressed >login</v-btn>
  </v-app-bar>
</template>

<script>
export default {

}
</script>

<style>

</style>
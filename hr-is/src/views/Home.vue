<template>
  <div>
    <topnav/>
  <v-row justify=center>
    <h1>Welcome To the Family</h1>
  </v-row>
  </div>
</template>

<script>
import topnav from '@/components/mainNav'
export default {
  name: 'Home',
  components: {
    topnav
  }
}
</script>

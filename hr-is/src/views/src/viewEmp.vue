<template>
  <div>
    <topnav />
    <h1> {{empId}} </h1>
    <pre>
      {{employee}}
    </pre>
  </div>
</template>

<script>
import topnav from "@/components/topnav";
import {mapGetters} from 'vuex'
export default {
  components: { topnav },
  computed:{
    ...mapGetters(['employee']),
      empId(){return this.$route.params.emp_id}
  },
  created(){
    
  }
};
</script>

<style>
</style>
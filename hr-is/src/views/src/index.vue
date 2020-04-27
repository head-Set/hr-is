<template>
  <div>
    <topnav />
    <v-data-table
      :headers="headers"
      :items="employees"
      :items-per-page="5"
      :search="search"
      :custom-filter="filterOnlyCapsText"
      caption="Mluc HR-Is"
    >
      <template v-slot:top>
        <v-col cols="10" sm="6">
          <v-text-field
            outlined
            width="50"
            v-model="search"
            label="Search Employee Here"
            class="mx-4"
          ></v-text-field>
        </v-col>
      </template>
      <template v-slot:item.actions="{ item }">
        <!-- <v-icon small class="mr-2" @click="viewEmp(item.id)">mdi-eye</v-icon> -->
        <!-- <v-icon small @click="deleteEmp(item)">mdi-delete</v-icon> -->
        <v-btn outlined small color="success" class="mr-2" dark @click="viewEmp(item.id)" :id="item.emp_no">View</v-btn>
        <v-btn outlined small color="red" dark @click="deleteEmp(item)" :id="item.emp_no">Delete</v-btn>
      </template>
      <template v-slot:no-data>
        <small>No-Data or No Internet Connection</small>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import topnav from "@/components/topnav";
import { mapGetters } from "vuex";
export default {
  components: { topnav },
  data: () => ({
    headers: [
      {
        text: "Employee Name",
        align: "start",
        value: "name"
      },
      { text: "Collage", value: "depts" },
      { text: "Salary Grade", value: "salary" },
      { text: "Step", value: "step" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    search: null
  }),
  computed: {
    ...mapGetters(["employees",'employee'])
  },
  beforeCreate() {
    this.$store.dispatch("fetchEmps");
  },
  methods: {
    async viewEmp(item){
      await this.$store.dispatch('viewEmp',item)
      .then(resp=>{
        if(!resp){
          alert("goo")
        }else{
          this.$router.push(`/viewEmployee/${item}`)
        }
      })
    },
    async deleteEmp(item) {
      const index = await this.employees.indexOf(item);
      const ask = confirm(
        "Are you sure you want to delete employee? " + item.name
      );
      if (ask) {
        await this.employees.splice(index, 1);
        await this.$store.dispatch('deleteEmp',item.id)
      } else {
        alert("Successfully Failed");
      }
    },
    filterOnlyCapsText(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLocaleLowerCase().indexOf(search) !== -1 ||
        value.toString().toLocaleUpperCase().indexOf(search) !== -1 
        // value.indexOf(search) !== -1
      );
    }
  },
  beforeRouteEnter(to, fron, next) {
    const isLoggedIn = localStorage.getItem("token");
    if (isLoggedIn == null || isLoggedIn == undefined) {
      alert("You Should Log In First");
      next("/login");
    } else {
      next();
    }
  }
};
</script>

<style>
</style>
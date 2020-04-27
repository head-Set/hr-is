<template>
  <div>
    <topnav />
    <V-row justify="center">
      <v-card shaped :loading="load" class="card" width="500" elevation="16" outlined>
        <v-card-title primary-title>
          <v-col>
            <h3 class="headline mb-0">Login</h3>
            <div>Here</div>
          </v-col>
        </v-card-title>
        <v-form v-model="valid" ref="form" lazy-validation class="form">
          <v-text-field label="Employee Number" v-model="emp_no" :rules="numonly" outlined required></v-text-field>
          <v-text-field label="Password" v-model="pass" type="password" outlined required></v-text-field>
          <v-card-actions>
            <v-btn @click="submit" color="primary" :loading="load" :disabled="!valid">submit</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </V-row>
  </div>
</template>

<script>
import topnav from "@/components/mainNav";
export default {
  components: { topnav },
  data: () => ({
    valid: true,
    load: false,
    emp_no: null,
    pass: null,
    numonly: [v => /^[0-9]+$/.test(v) || "Employee Number must be valid"]
  }),
  methods: {
    async submit() {
      let self = this;
      self.load = true;
      let data = {
        emp_no: self.emp_no,
        pass: self.pass
      };
      await this.$store.dispatch("login", data).then(response => {
        setTimeout(() => {
          self.load = false;
          if (response != true) {
            console.log(response);
          } else {
            self.$router.push('/home')
          }
        }, 3000);
      });
    }
  }
};
</script>
<style scoped>
.card {
  margin-top: 50px;
  padding-left: 20px;
  padding-right: 20px;
}
/* .form{
    padding:100px;
} */
</style>
<template>
  <v-app>
    <v-app-bar app color="red" dark dense>
      <v-toolbar-title class="pl-3 text-h5">Tracker</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <div class="d-flex">
        <NavigationDrawer></NavigationDrawer>

        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import NavigationDrawer from "./components/NavigationDrawer";

export default {
  name: "App",

  components: {
    NavigationDrawer
  },

  data: () => ({
    //
  })
};
</script>

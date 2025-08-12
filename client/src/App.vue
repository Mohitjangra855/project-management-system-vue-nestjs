<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
    <HeaderCom />
    <div class="allPages py-16 px-4">
      <router-view />
    </div>
    <FooterCom />
  </div>
</template>
<script setup>
import { provide, onBeforeMount } from "vue";
import { fetchCurrentUser } from "./Services/currentUser";
import { globalData } from "./Services/global";
onBeforeMount(async () => {
  try {
    const data = await fetchCurrentUser();
    globalData.currentUser = data;
    // console.log("app data: ",globalData)
  } catch (err) {
    console.log("error: ", err);
  }
}),
  provide("globalData", globalData);
</script>
<script>
import HeaderCom from "./includes/Header.vue";
import FooterCom from "./includes/Footer.vue";
export default {
  name: "App",
  components: {
    HeaderCom,
    FooterCom,
  },
};
</script>
<style>
body {
  margin: 0;
  padding: 0;
}
.allPages {
  margin: 0 auto;
  max-width: 1200px;
}
</style>

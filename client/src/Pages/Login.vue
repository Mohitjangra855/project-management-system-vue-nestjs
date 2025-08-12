<template>
  <SuccessMessage 
    :message="success" 
    :show="!!success" 
    @close="success = ''" 
  />
    <ErrorMessage
    :message="errorMessage"
    :show="!!errorMessage"
    @close="errorMessage = ''"
  />
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-gradient-to-br from-gray-900/90 via-blue-900/90 to-purple-900/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-6 border border-purple-500/20 relative z-10 overflow-hidden">
      <!-- Animated Background Blobs inside content only -->
      <div class="absolute inset-0 overflow-hidden rounded-2xl">
        <div class="absolute -top-20 -right-20 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div class="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div class="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      <div class="text-center space-y-2 relative z-10">
        <h2 class="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Welcome Back</h2>
        <p class="text-sm text-gray-300">Please log in to continue your journey</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6 relative z-10">
        <div class="space-y-2">
          <label for="email" class="text-sm font-medium text-white mb-2 flex items-center gap-2">
            <i class="fa-solid fa-envelope text-blue-400"></i>
            Email Address
          </label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            placeholder="you@example.com"
            class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
            required
          />
        </div>

        <div class="relative space-y-2">
          <label for="password" class="text-sm font-medium text-white mb-2 flex items-center gap-2">
            <i class="fa-solid fa-lock text-purple-400"></i>
            Password
          </label>
          <input
            v-model="form.password"
            :type="isEye ? 'text' : 'password'"
            id="password"
            placeholder="••••••••"
            class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
            required
          />
          <span
            @click="isEye = !isEye"
            class="absolute right-4 top-[42px] text-gray-400 hover:text-white cursor-pointer transition-colors duration-200"
          >
            <i :class="isEye ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"></i>
          </span>
        </div>

        <button
          type="submit"
          class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg transform hover:scale-105 hover:shadow-xl"
        >
          <i class="fa-solid fa-sign-in-alt"></i> 
          Sign In
        </button>
      </form>

      <div class="text-center relative z-10">
        <p class="text-gray-400 text-sm">
          New to ProjectFlow? 
          <span class="text-blue-400 hover:text-blue-300 cursor-pointer font-medium transition-colors duration-200">Contact Admin</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import api from "@/Services/api";
import { setLoggedIn } from "@/utils/auth";
import SuccessMessage from "@/components/SuccessMessage.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
const globalData = inject("globalData");
const isEye = ref(false);
const errorMessage = ref("");
const router = useRouter();

const success = ref("");
const form = ref({
  email: "",
  password: "",
});

const handleLogin = async () => {
  try {
    const response = await api.post("/users/login", form.value, { withCredentials: true });

    if (response.data.status === true) {
      success.value = "✅ Login successful!";
      setTimeout(() => {
        setLoggedIn();
        globalData.currentUser = response.data.user;
        router.push("/");
        success.value = "";
      }, 1000);
    } else {
     errorMessage.value = response.data?.token|| "Login failed!";
     setTimeout(() => {
        errorMessage.value = "";
      }, 2000);
      
    }
  } catch (error) {
    console.error("Login error:", error);
    errorMessage.value = "Login failed. Please try again.";
      setTimeout(() => {
        errorMessage.value = "";
      }, 2000);
      
  }

};
</script>
<script>
export default {
  name: 'LoginPage',
};
</script>
<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
</style>

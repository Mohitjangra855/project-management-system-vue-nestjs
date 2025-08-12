<template >
  <div class="home-page min-h-screen flex items-center justify-center px-4 py-16">
    <div
      class="bg-gradient-to-br from-gray-900/95 via-blue-900/95 to-purple-900/95 backdrop-blur-lg p-8 sm:p-12 rounded-3xl shadow-2xl text-center text-white max-w-4xl border border-purple-500/30 relative overflow-hidden"
    >
      <!-- Animated background elements inside content box only -->
      <div class="absolute inset-0 overflow-hidden rounded-3xl">
        <div class="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-500/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div class="absolute top-20 left-20 w-40 h-40 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div class="relative z-10">
        <div class="mb-8">
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Welcome to ProjectFlow ✨
          </h1>
          <div class="w-32 h-1 bg-gradient-to-r from-yellow-400 to-pink-500 mx-auto rounded-full mb-6"></div>
        </div>
        
        <p class="text-lg sm:text-xl mb-8 leading-relaxed text-gray-200">
          Only <span class="text-yellow-400 font-bold">Admins</span> can
          <span class="text-pink-400 font-bold">register</span> new users into the system.<br />
          Once registered, each user can log in and manage their assigned tasks,
          projects, and progress independently — ensuring secure and role-based
          control over your entire team.
        </p>
        
        <div class="flex justify-center gap-6 flex-wrap">
          <template v-if="isLoggedIn">
            <router-link to="/projects">
              <button
                class="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center gap-3"
              >
                <i class="fa-solid fa-list-check group-hover:animate-bounce"></i>
                Projects
              </button>
            </router-link>
            <router-link to="/team">
              <button
                class="group bg-gradient-to-r from-green-500 to-blue-600 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center gap-3"
              >
                <i class="fa-solid fa-people-group group-hover:animate-bounce"></i>
                Team
              </button>
            </router-link>
          </template>
          <template v-else>
            <router-link to="/login">
              <button
                class="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-red-500 text-black font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center gap-3"
              >
                <i class="fa-solid fa-arrow-right-to-bracket group-hover:animate-bounce"></i>
                Login
              </button>
            </router-link>
          
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isAuthenticated } from "@/utils/auth";
export default {
  name: "HomePage",
  computed: {
    isLoggedIn() {
      return isAuthenticated.value;
    },
  },
};
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
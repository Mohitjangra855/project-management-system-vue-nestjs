<script setup>
import { inject, computed, capitalize } from "vue";

const globalData = inject("globalData");
const currentUser = computed(() => globalData?.currentUser);
</script>

<template class="imp">
  <div
    class="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 shadow-xl fixed w-full z-50 backdrop-blur-sm"
  >
    <nav class="mainHeader sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 w-[86%] lg:w-full">
          <!-- Left: Logo -->
          <div class="lg:m-0 text-xl font-bold">
            <router-link
              to="/"
              class="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent hover:from-pink-500 hover:to-violet-500 transition-all duration-500 text-2xl font-extrabold"
            >
              🚀 ProjectFlow
            </router-link>
          </div>

          <!-- Right: Desktop Navigation -->
          <ul
            class="hidden lg:flex space-x-6 text-white font-medium items-center"
          >
            <li>
              <router-link
                to="/about"
                class="hover:text-yellow-400 transition-colors duration-300"
                >About</router-link
              >
            </li>
            <template v-if="isLoggedIn">
              <li>
                <router-link
                  to="/projects"
                  class="hover:text-green-400 transition-colors duration-300"
                  >Projects</router-link
                >
              </li>

              <li v-if="currentUser?.role === 'ADMIN'">
                <router-link
                  to="/all-employee"
                  class="hover:text-pink-400 transition-colors duration-300"
                  >Employee</router-link
                >
              </li>
              <li>
                <router-link
                  to="/team"
                  class="hover:text-orange-400 transition-colors duration-300"
                  >Team</router-link
                >
              </li>
              <li
                class="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white rounded-full p-2 px-3 min-w-10 text-center profile-button shadow-lg transform hover:scale-110 transition-all duration-300"
                @click.stop="toggleProfile"
              >
                <i class="fa-solid fa-user text-sm"></i>
              </li>
            </template>
            <template v-else>
              <li>
                <router-link
                  to="/login"
                  class="hover:text-emerald-400 transition-colors duration-300"
                  >Login</router-link
                >
              </li>
            </template>
          </ul>

          <!-- Mobile menu toggle -->
          <div class="lg:hidden flex items-center relative">
            <button @click="toggleMenu" class="text-white focus:outline-none">
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  v-if="!isMenuOpen"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <li
              v-if="isLoggedIn"
              class="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white rounded-full p-2 px-3 min-w-10 text-center profile-button list-none text-sm absolute left-10 shadow-lg transform hover:scale-110 transition-all duration-300"
              @click.stop="toggleProfile"
            >
              <i class="fa-solid fa-user text-xs"></i>
            </li>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div v-if="isMenuOpen" class="lg:hidden px-4 pb-4">
          <ul class="space-y-2 text-white font-medium">
            <li>
              <router-link
                @click="toggleMenu"
                to="/about"
                class="block hover:text-yellow-400 transition-colors duration-300"
                >About</router-link
              >
            </li>
            <template v-if="isLoggedIn">
              <li>
                <router-link
                  @click="toggleMenu"
                  to="/projects"
                  class="block hover:text-green-400 transition-colors duration-300"
                  >Projects</router-link
                >
              </li>

              <li v-if="currentUser?.role === 'ADMIN'">
                <router-link
                  @click="toggleMenu"
                  to="/all-employee "
                  class="block hover:text-pink-400 transition-colors duration-300"
                  >Employee</router-link
                >
              </li>
              <li>
                <router-link
                  @click="toggleMenu"
                  to="/team"
                  class="block hover:text-orange-400 transition-colors duration-300"
                  >Team</router-link
                >
              </li>
            </template>
            <template v-else>
              <li>
                <router-link
                  @click="toggleMenu"
                  to="/login"
                  class="block hover:text-emerald-400 transition-colors duration-300"
                  >Login</router-link
                >
              </li>
            </template>
          </ul>
        </div>
        <div
          v-if="isToggleProfile"
          class="absolute right-10 top-[4.1rem] bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 shadow-2xl rounded-2xl p-3 md:p-6 w-40 md:w-56 profile-dropdown backdrop-blur-lg border border-purple-500/30"
          @click.stop
        >
          <ul class="space-y-1 md:space-y-3 text-white">
            <h5
              class="font-bold text-lg bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
            >
              Hello, {{ capitalize(currentUser?.name) }}! 👋
            </h5>
            <hr class="border-purple-500/30" />
            <li
              class="cursor-pointer hover:text-green-400 transition-colors duration-300 p-2 rounded-lg hover:bg-white/10"
              @click="toggleProfile"
            >
              <a
                href="/user/profile"
                class="flex items-center justify-start gap-3"
                ><i class="fa-regular fa-user text-green-400"></i>Profile</a
              >
            </li>

            <li
              class="cursor-pointer hover:text-red-400 transition-colors duration-300 p-2 rounded-lg hover:bg-white/10"
              @click="logout"
            >
              <a href="#" class="flex items-center justify-start gap-3"
                ><i class="fa-solid fa-right-from-bracket text-red-400"></i>
                Logout</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <SuccessMessage :message="success" :show="!!success" @close="success = ''" />
</template>

<script>
import { isAuthenticated, setLoggedOut } from "@/utils/auth";
import api from "@/Services/api";
import SuccessMessage from "@/components/SuccessMessage.vue";

export default {
  name: "HeaderCom",
  components: {
    SuccessMessage,
  },
  data() {
    return {
      success: "",
      isMenuOpen: false,
      isToggleProfile: false,
    };
  },
  mounted() {
    // Add global click listener to close profile dropdown
    document.addEventListener("click", this.handleGlobalClick);
  },
  beforeUnmount() {
    // Remove global click listener
    document.removeEventListener("click", this.handleGlobalClick);
  },
  computed: {
    isLoggedIn() {
      return isAuthenticated.value;
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    async logout() {
      try {
        await api.post("/users/logout", {}, { withCredentials: true });
        console.log("Logged out");
        this.success = "✅ Logout successful!";
        setTimeout(() => {
          setLoggedOut();
          this.isMenuOpen = false;
          this.isToggleProfile = false;
          this.$router.push("/");
          this.success = "";
        }, 1000);
      } catch (err) {
        console.error("Logout failed", err);
      }
    },
    getColorByAlphabet(letter) {
      if (!letter || typeof letter !== "string") return "bg-gray-500";
      const colors = {
        A: "bg-red-500",
        B: "bg-green-500",
        C: "bg-blue-500",
        D: "bg-yellow-500",
        E: "bg-purple-500",
        F: "bg-pink-500",
        G: "bg-indigo-500",
        H: "bg-teal-500",
        I: "bg-rose-500",
        J: "bg-cyan-500",
        K: "bg-amber-500",
        L: "bg-lime-500",
        M: "bg-emerald-500",
        N: "bg-fuchsia-500",
        O: "bg-sky-500",
        P: "bg-orange-500",
        Q: "bg-violet-500",
        R: "bg-blue-600",
        S: "bg-yellow-600",
        T: "bg-pink-600",
        U: "bg-red-600",
        V: "bg-green-600",
        W: "bg-purple-600",
        X: "bg-indigo-600",
        Y: "bg-teal-600",
        Z: "bg-rose-600",
      };
      return colors[letter.toUpperCase()] || "bg-gray-500";
    },
    toggleProfile() {
      this.isToggleProfile = !this.isToggleProfile;
    },
    closeProfileDropdown() {
      console.log("Closing profile dropdown");
      this.isToggleProfile = false;
    },
    handleGlobalClick(event) {
      // Check if click is outside profile button or dropdown
      const profileButton = event.target.closest(".profile-button");
      const profileDropdown = event.target.closest(".profile-dropdown");

      // If click is not on profile button or dropdown, hide profile menu
      if (!profileButton && !profileDropdown && this.isToggleProfile) {
        this.isToggleProfile = false;
      }
    },
  },
};
</script>
<style scoped>
.imp {
  position: fixed;
  top: 0px;
}
.mainHeader {
  margin: 0 auto;
  max-width: 1200px;
}
.nav-link {
  color: rgb(0, 110, 255);
}
.nav-link:hover {
  color: rgb(0, 110, 255);
}
</style>

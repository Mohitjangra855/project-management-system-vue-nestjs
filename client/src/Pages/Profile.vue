<template>
  <SuccessMessage :message="success" :show="!!success" @close="success = ''" />
  <ErrorMessage
    :message="errorMessage"
    :show="!!errorMessage"
    @close="errorMessage = ''"
  />
  <div class="flex items-center justify-center min-h-screen p-4">
    <div
      class="bg-gradient-to-br from-gray-900/90 via-blue-900/90 to-purple-900/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-purple-500/20 relative overflow-hidden"
    >
      <!-- Animated Background Blobs inside content only -->
      <div class="absolute inset-0 overflow-hidden rounded-2xl">
        <div
          class="absolute -top-20 -right-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
        ></div>
        <div
          class="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"
        ></div>
        <div
          class="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-green-400 to-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"
        ></div>
      </div>
      <div class="text-center space-y-2 mb-8 relative z-10">
        <div
          class="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4"
        >
          <i class="fa-solid fa-user text-2xl text-white"></i>
        </div>
        <h2
          class="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
        >
          Update Profile
        </h2>
        <p class="text-gray-300 text-sm">Manage your account information</p>
      </div>

      <form @submit.prevent="updateProfile" class="space-y-6 relative z-10">
        <div class="space-y-2">
          <label
            for="username"
            class="text-sm font-medium text-white flex items-center gap-2"
          >
            <i class="fa-solid fa-user text-blue-400"></i>
            Username
          </label>
          <input
            type="text"
            id="username"
            v-model="form.name"
            placeholder="Enter your username"
            class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
            required
          />
        </div>

        <div class="space-y-2">
          <label
            for="email"
            class="text-sm font-medium text-white flex items-center gap-2"
          >
            <i class="fa-solid fa-envelope text-green-400"></i>
            Email
          </label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            placeholder="Enter your email"
            class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 opacity-50 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
            required
            disabled
          />
          <p
            class="text-right text-purple-400 cursor-pointer font-medium transition duration-300 hover:text-purple-300 text-sm flex items-center justify-end gap-2"
            @click="isActive = !isActive"
          >
            <i class="fa-solid fa-key"></i>
            {{ isActive ? "Cancel" : "Change Password" }}
          </p>
        </div>

        <button
          v-if="!isActive"
          type="submit"
          class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center gap-3 shadow-lg transform hover:scale-105 hover:shadow-xl"
        >
          <i class="fa-solid fa-pen-to-square"></i> Update Profile
        </button>

        <div
          v-if="isActive"
          class="space-y-6 p-6 bg-gray-800/30 rounded-xl border border-gray-600/30"
        >
          <h3
            class="text-lg font-semibold text-white text-center flex items-center justify-center gap-2"
          >
            <i class="fa-solid fa-shield-alt text-yellow-400"></i>
            Change Password
          </h3>

          <form @submit.prevent="updateProfile" class="space-y-4">
            <div class="space-y-2">
              <label
                for="oldPassword"
                class="text-sm font-medium text-white flex items-center gap-2"
              >
                <i class="fa-solid fa-lock text-red-400"></i>
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                v-model="pform.oldPassword"
                placeholder="Enter your old password"
                class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
                required
              />
              <p class="text-red-400 text-sm font-medium" v-if="wrong">
                {{ wrong }}
              </p>
            </div>

            <div class="space-y-2">
              <label
                for="newPassword"
                class="text-sm font-medium text-white flex items-center gap-2"
              >
                <i class="fa-solid fa-key text-green-400"></i>
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                v-model="pform.newPassword"
                placeholder="Enter your new password"
                class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
                required
              />
              <p class="text-red-400 text-sm font-medium" v-if="wrongNew">
                {{ wrongNew }}
              </p>
            </div>

            <div class="space-y-2">
              <label
                for="confirmPassword"
                class="text-sm font-medium text-white flex items-center gap-2"
              >
                <i class="fa-solid fa-check-circle text-blue-400"></i>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                v-model="pform.confirmPassword"
                placeholder="Confirm your new password"
                class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
                required
              />
              <p class="text-red-400 text-sm font-medium" v-if="wrongConf">
                {{ wrongConf }}
              </p>
            </div>

            <button
              type="submit"
              class="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg transform hover:scale-105 hover:shadow-xl"
            >
              <i class="fa-solid fa-save"></i> Update Profile & Password
            </button>
          </form>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { fetchCurrentUser } from "@/Services/currentUser";
import api from "@/Services/api";
import { inject } from "vue";
import { setLoggedOut } from "@/utils/auth";
import SuccessMessage from "@/components/SuccessMessage.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";

export default {
  name: "ProfilePage",
  components: {
    SuccessMessage,
    ErrorMessage,
  },
  setup() {
    const globalData = inject("globalData");
    return { globalData };
  },
  data() {
    return {
      isActive: false,
      wrong: "",
      wrongConf: "",
      wrongNew: "",
      success: "",
      errorMessage: "",
      form: {
        name: "",
        email: "",
      },
      pform: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    };
  },
  mounted() {
    this.getUserProfile();
  },
  methods: {
    async getUserProfile() {
      try {
        const user = await fetchCurrentUser();
        this.form.name = user.name || "";
        this.form.email = user.email || "";

        // Update global data as well
        this.globalData.currentUser = user;
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    },
    async updateProfile() {
      try {
        const profileData = {
          name: this.form.name,
          email: this.form.email,
        };

        // If password change is active, include password data
        if (this.isActive && this.pform.oldPassword && this.pform.newPassword) {
          // Validate passwords first
          if (this.pform.newPassword !== this.pform.confirmPassword) {
            this.wrongConf = "New password and confirm password do not match.";
            this.errorMessage = this.wrongConf;
            setTimeout(() => {
              this.wrongConf = "";
              this.errorMessage = "";
            }, 5000);
            return;
          }

          if (this.pform.oldPassword === this.pform.newPassword) {
            this.wrongNew = "New password cannot be the same as old password.";
            this.errorMessage = this.wrongNew;
            setTimeout(() => {
              this.wrongNew = "";
              this.errorMessage = "";
            }, 5000);
            return;
          }

          // Add password fields to the request
          profileData.oldPassword = this.pform.oldPassword;
          profileData.newPassword = this.pform.newPassword;
        }

        const updatedData = await api.put("/users/profile", profileData);

        // Check if password was being changed
        if (this.isActive && this.pform.oldPassword) {
          console.log("Password change requested:", updatedData.data);
          if (updatedData.data.passData.status) {
            console.log(
              "profile and password updated here successfully",
              updatedData
            );
            this.success =
              `✅ ${updatedData.data.passData.message}` ||
              "✅ Profile and password updated successfully!";
            setTimeout(() => {
              this.success = "";
              // this.logout();
              // this.$router.push("/login");
            }, 2000);

            // Reset password form only on success
            this.pform = {
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            };
            this.isActive = false;
          } else {
            this.wrong = updatedData?.data?.passData?.message || "Password change failed";
            this.errorMessage = this.wrong;
            console.log("Password change failed:", updatedData.data.passData.message);
            setTimeout(() => {
              this.wrong = "";
              this.errorMessage = "";
            }, 5000);

            return;
          }
        } else {
          // Just profile update
          this.success =
            updatedData.data.message || "✅ Profile updated successfully!";
          setTimeout(() => {
            this.success = "";
          }, 3000);

          // Update global user data immediately
          this.globalData.currentUser = {
            ...this.globalData.currentUser,
            name: this.form.name,
            email: this.form.email,
          };

          // Refresh user data from server
          await this.getUserProfile();
        }

        
        if (!this.isActive) {
          // This was a profile-only update, no need to reset anything else
        }
      } catch (error) {
        console.error("Error updating profile:", error);

        // Handle API errors
        if (error.response?.data?.message) {
          // If password section is active, show error but keep section open
          if (this.isActive && this.pform.oldPassword) {
            this.wrong = error.response.data.message;
            console.log("Password error occurred, keeping section open");
            setTimeout(() => {
              this.wrong = "";
            }, 5000);
          } else {
            this.success = "❌ " + error.response.data.message;
            setTimeout(() => {
              this.success = "";
            }, 5000);
          }
        } else {
          // General error handling
          this.success = "❌ An error occurred while updating profile";
          setTimeout(() => {
            this.success = "";
          }, 5000);
        }
      }
    },
    async logout() {
      try {
        await api.post("/users/logout", {}, { withCredentials: true });
        console.log("Logged out");
        setLoggedOut();
        this.isMenuOpen = false;
        this.isToggleProfile = false;
        this.$router.push("/");
      } catch (err) {
        console.error("Logout failed", err);
      }
    },
  },
};
</script>

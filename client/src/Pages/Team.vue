<template>
  <SuccessMessage :message="success" :show="!!success" @close="success = ''" />
  <div class="min-h-screen main-box relative py-8 px-4">
    <div class="max-w-6xl mx-auto relative">
      <div class="max-w-6xl mx-auto relative z-10">
        <div class="text-center space-y-4 mb-12">
          <div
            class="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto flex items-center justify-center"
          >
            <i class="fa-solid fa-users text-3xl text-white"></i>
          </div>
          <h1
            class="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent"
          >
            Team Overview
          </h1>
          <p class="text-gray-300 text-lg">
            Collaborate with your project teams
          </p>
        </div>

        <div class="grid gap-8">
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            :id="`project-${project.id}`"
            class="bg-gradient-to-br from-gray-900/90 via-blue-900/90 to-purple-900/90 backdrop-blur-lg shadow-2xl border border-purple-500/20 rounded-2xl px-8 py-4 hover:shadow-xl hover:scale-105 transition-all duration-300 relative group"
          >
            <div class="flex items-start justify-between mb-6">
              <div class="space-y-2">
                <h2
                  class="text-2xl font-semibold text-white group-hover:text-yellow-400 transition-colors duration-300 flex items-center gap-3"
                >
                  <i class="fa-solid fa-folder-open text-blue-400"></i>
                  {{ project.title }} 
                </h2>
                <p class="text-gray-300 leading-relaxed">
                  {{ project.description }}
                </p>
              </div>

              <!-- Show delete button only to ADMIN -->
              <button
                v-if="role === 'ADMIN'"
                class="text-red-500 cursor-pointer hover:scale-110 transition-transform duration-200"
                @click="
                  showDeleteConfirm = true;
                  projectId = project.id;
                "
                title="Delete Project"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div class="space-y-4">
              <h3
                class="text-lg font-semibold text-white flex items-center gap-2"
              >
                <i class="fa-solid fa-user-friends text-purple-400"></i>
                Team Members
                <span
                  class="text-sm bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full"
                >
                  {{ project.teamMembers.length }}
                </span>
              </h3>

              <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 grid-flow-row"
              >
                <div
                  v-for="member in project.teamMembers"
                  :key="member._id"
                  class="bg-gray-800/50 border border-gray-600/30 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-3 hover:bg-gray-700/50 transition-all duration-300 group"
                >
                  <div
                    class="w-10 h-10 text-md text-white rounded-full flex items-center justify-center font-bold shadow-lg transition-transform duration-300 group-hover:scale-110"
                    :class="
                      getColorByAlphabet(member.name.charAt(0).toUpperCase())
                    "
                  >
                    {{ member.name.charAt(0).toUpperCase() }}
                  </div>
                  <div class="flex-1">
                    <p
                      class="font-xs text-white group-hover:text-yellow-400 transition-colors duration-300 overflow-hidden h-7"
                    >
                      {{ capitalize(member.name) }}
                    </p>
                    <p class=" text-[10px] text-gray-400">
                      {{ member.position || "Developer" }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Delete Confirmation Modal -->
        <div
          v-if="showDeleteConfirm"
          class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-[999]"
        >
          <div
            class="relative bg-gray-800/95 border border-gray-600 rounded-xl p-6 w-full max-w-sm mx-4 shadow-2xl"
          >
            <button
              @click="showDeleteConfirm = false"
              class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <i class="fa-solid fa-times"></i>
            </button>
            <h3 class="text-lg font-semibold text-white mb-4">
              Are you sure you want to delete this project?
            </h3>
            <p class="text-gray-300 mb-6">
              This action cannot be undone. All associated data will be lost.
            </p>
            <button
              @click="projectDelete(projectId)"
              class="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg transform hover:scale-105 hover:shadow-xl"
            >
              <i class="fa-solid fa-trash"></i> Delete Project
            </button>
          </div>
        </div>
        <!-- Empty State -->
        <div v-if="filteredProjects.length === 0" class="text-center py-16">
          <div
            class="w-24 h-24 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full mx-auto flex items-center justify-center mb-6"
          >
            <i class="fa-solid fa-users-slash text-3xl text-gray-400"></i>
          </div>
          <h3 class="text-2xl font-semibold text-gray-300 mb-2">
            No Teams Found
          </h3>
          <p class="text-gray-400">You're not assigned to any projects yet.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/Services/api";
import { inject } from "vue";
import SuccessMessage from "@/components/SuccessMessage.vue";
// @click="projectDelete(project.id)"
export default {
  name: "TeamPage",
  components: {
    SuccessMessage,
  },
  data() {
    return {
      showDeleteConfirm: false,
      projectId: "",
      success: "",
      projects: [],
      globalData: inject("globalData"), // get global user data
    };
  },
  computed: {
    role() {
      return this.globalData?.currentUser?.role;
    },
    filteredProjects() {
      const user = this.globalData?.currentUser;
      if (!user) return [];

      // Admin sees all projects
      if (user.role === "ADMIN") {
        return this.projects;
      }

      // Employee sees only their assigned projects
      const filtered = this.projects.filter((project) =>
        project.teamMembers.some((member) => member.id === user.id)
      );
      console.log("Filtered Projects:", filtered);
      return filtered;
    },
  },
  mounted() {
    this.getProjects();
  },
  methods: {
    async getProjects() {
      try {
        const res = await api.get("/project");
        this.projects = res.data;

        // Wait for DOM update before scrolling
        this.$nextTick(() => {
          const hash = window.location.hash;
          if (hash) {
            const el = document.querySelector(hash);
            if (el) {
              // Scroll to the element smoothly
              el.scrollIntoView({ behavior: "smooth", block: "center" });

              // Optional: Highlight the element
              el.classList.add("ring", "ring-yellow-400");
              setTimeout(() => {
                el.classList.remove("ring", "ring-yellow-400");
              }, 2000);
            }
          }
        });
      } catch (err) {
        console.error("Error loading projects:", err);
      }
    },
    async projectDelete(id) {
      try {
        await api.delete(`/project/${id}`);
        this.success = "✅ Project deleted successfully!";
        this.getProjects(); // refresh after delete
        this.projectId = "";
        this.showDeleteConfirm = false;
        setTimeout(() => {
          this.success = "";
        }, 2000);
      } catch (err) {
        console.error("Error deleting project:", err);
      }
    },
    capitalize(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
    getColorByAlphabet(letter) {
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
  },
};
</script>

<style scoped></style>

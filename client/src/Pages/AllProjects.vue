<template>
  <SuccessMessage :message="success" :show="!!success" @close="success = ''" />
  <ErrorMessage
    :message="errorMessage"
    :show="!!errorMessage"
    @close="errorMessage = ''"
  />
  <div class="min-h-screen main-box p-6">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center max-w-6xl mx-auto mb-10">
        <!-- Left side: Heading & description -->
        <div class="space-y-2 text-left">
          <h1
            class="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            All Projects
          </h1>
          <p class="text-gray-300 text-lg">
            Manage and track your project portfolio
          </p>
        </div>

        <!-- Right side: Add Project Button -->
        <button
          v-if="this.globalData?.currentUser?.role === 'ADMIN'"
          @click="resetAndShowAddProject()"
          class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:scale-105 transition-transform duration-300 shadow-lg"
        >
          + Add Project
        </button>
      </div>

      <hr class="border-gray-500 my-8" />

      <!-- Project Cards -->
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 relative z-10">
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="bg-gradient-to-br from-gray-900/90 via-blue-900/90 to-purple-900/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-500/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        >
          <div class="space-y-4">
            <div class="flex items-start justify-between">
              <h2
                class="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors cursor-pointer hover:underline hover:transition-all duration-500"
              >
                <router-link :to="`/team#project-${project.id}`" class="block">
                  {{ project.title }}
                </router-link>
              </h2>
              <div
                v-if="this.globalData?.currentUser?.role === 'ADMIN'"
                class="w-3 h-3 rounded-full text-green-500 cursor-pointer"
                @click="
                  showUpdateProject = true;
                  getProject(project.id);
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6"
                >
                  <path
                    d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"
                  />
                  <path
                    d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"
                  />
                </svg>
              </div>
            </div>

            <p
              class="text-gray-300 text-sm h-12 overflow-hidden leading-relaxed"
            >
              {{ project.description }}
            </p>

            <form
              v-if="
                ifProjectId.includes(project.id) ||
                this.globalData?.currentUser?.role === 'ADMIN'
              "
              @submit="handleSubmit($event, project.id)"
              method="post"
              class="space-y-4"
            >
              <div
                class="bg-gray-800/50 rounded-xl p-4 border border-gray-600/30"
              >
                <h3
                  class="text-lg font-semibold text-white mb-3 flex items-center gap-2"
                >
                  <i class="fa-solid fa-chart-line text-blue-400"></i>
                  Project Status
                </h3>
                <div class="flex gap-3">
                
                  <div class="relative w-full">
                    <select
                      v-model="selectedStatus[project.id]"
                      class="appearance-none w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 cursor-pointer"
                      :class="{
                        'text-yellow-400':
                          selectedStatus[project.id] === 'to_do',
                        'text-blue-400':
                          selectedStatus[project.id] === 'in_progress',
                        'text-red-400':
                          selectedStatus[project.id] === 'testing',
                        'text-green-400':
                          selectedStatus[project.id] === 'completed',
                      }"
                    >
                      <option disabled value="">Select Status</option>
                      <option
                        v-for="s in statusList"
                        :key="s"
                        :value="s"
                        class="bg-gray-800"
                        :class="{
                          'text-yellow-400': s === 'to_do',
                          'text-blue-400': s === 'in_progress',
                          'text-red-400': s === 'testing',
                          'text-green-400': s === 'completed',
                        }"
                      >
                        {{ formetStatus(s) }}
                      </option>
                    </select>

                    <!-- Custom Arrow Icon -->
                    <div
                      class="pointer-events-none absolute inset-y-0 right-2 flex items-center text-white"
                    >
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  <button
                    type="submit"
                    class="bg-gradient-to-r from-green-600 to-teal-600 hover:from-teal-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center shadow-lg transform hover:scale-105"
                  >
                    <i class="fa-solid fa-save"></i>
                  </button>
                </div>
              </div>
            </form>

            <div
              v-else
              class="bg-gray-800/50 rounded-xl p-4 border border-gray-600/30"
            >
              <h3
                class="text-lg font-semibold text-white mb-3 flex items-center gap-2"
              >
                <i class="fa-solid fa-info-circle text-blue-400"></i>
                Project Status
              </h3>
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                :class="{
                  'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30':
                    project.status === 'to_do',
                  'bg-blue-500/20  border-blue-500/30 text-blue-400 border':
                    project.status === 'in_progress',
                  'bg-red-500/20  border-red-500/30 text-red-400 border':
                    project.status === 'testing',
                  'bg-green-500/20 text-green-400 border border-green-500/30':
                    project.status === 'completed',
                }"
              >
                <div
                  class="w-2 h-2 rounded-full mr-2"
                  :class="{
                    'bg-yellow-400': project.status === 'to_do',
                    'bg-blue-400': project.status === 'in_progress',
                    'bg-red-400': project.status === 'testing',
                    'bg-green-400': project.status === 'completed',
                  }"
                ></div>
                {{ capitalize(project.status) }}
              </span>
            </div>

            <div
              class="bg-gray-800/50 rounded-xl p-4 border border-gray-600/30"
            >
              <h4 class="font-semibold text-white mb-3 flex items-center gap-2">
                <i class="fa-solid fa-code text-purple-400"></i>
                Technologies
              </h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Porject PopUp -->
      <div
        v-if="showAddProject"
        class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-[999] lg:w-full"
      >
        <div
          class="relative bg-gray-800/95 border border-gray-600 rounded-2xl p-4 md:p-8 mx-4 shadow-2xl w-full sm:w-[80%] lg:w-[75%] max-h-[90vh] scrollbar-hide overflow-y-auto"
        >
          <button
            @click="showAddProject = false"
            class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <i class="fa-solid fa-xmark text-2xl"></i>
          </button>
          <form
            @submit.prevent="addNewProjectSubmit($event)"
            class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-8 w-full text-left"
          >
            <!-- First Row -->
            <!-- Project Title -->
            <div class="space-y-2">
              <label
                class="text-sm font-medium text-white flex items-center gap-2"
              >
                <i class="fa-solid fa-project-diagram text-blue-400"></i>
                Project Title
              </label>
              <input
                v-model="newProject.title"
                type="text"
                class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
                placeholder="Enter project title"
                required
              />
            </div>

            <!-- Project Status -->
            <div class="space-y-2">
              <label
                class="text-sm font-medium text-white flex items-center gap-2"
              >
                <i class="fa-solid fa-chart-line text-yellow-400"></i>
                Project Status
              </label>
              <select
                v-model="newProject.status"
                class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
                required
              >
                <option disabled value="" class="text-gray-400">
                  Select Initial Status
                </option>
                <option value="to_do" class="bg-gray-800 text-yellow-400">
                  🚀 To Do
                </option>

                <option value="in_progress" class="bg-gray-800 text-blue-400">
                  ⚡ in_progress
                </option>
                <option value="testing" class="bg-gray-800 text-red-400">
                  🔍 testing
                </option>
                <option value="completed" class="bg-gray-800 text-green-400">
                  ✅ Completed
                </option>
              </select>
            </div>

            <!-- Second Row -->
            <!-- Technologies -->
            <div class="space-y-2">
              <label
                class="text-sm font-medium text-white flex items-center gap-2"
              >
                <i class="fa-solid fa-code text-green-400"></i>
                Technologies
              </label>
              <input
                v-model="newProject.technologies"
                type="text"
                class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
                placeholder="e.g. Vue.js, Node.js, MongoDB (comma separated)"
              />
            </div>

            <!-- Team Members -->
            <div class="space-y-2">
              <label
                class="text-sm font-medium text-white flex items-center gap-2"
              >
                <i class="fa-solid fa-users text-pink-400"></i>
                Team Members
              </label>
              <div class="relative">
                <input
                  type="text"
                  :value="selectedTeamMemberNames.join(', ')"
                  readonly
                  class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none cursor-pointer transition-all duration-300 backdrop-blur-sm"
                  @click="dropdownOpen = !dropdownOpen"
                  placeholder="Select team members"
                  required
                />
                <i
                  class="fa-solid fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none transition-transform duration-200"
                  :class="{ 'rotate-180': dropdownOpen }"
                ></i>

                <ul
                  v-if="dropdownOpen"
                  class="absolute z-20 w-full mt-2 bg-gray-800/95 backdrop-blur-lg border border-gray-600 rounded-xl shadow-2xl max-h-48 overflow-y-auto scrollbar-hide"
                >
                  <li
                    v-for="employee in employees"
                    :key="employee.id"
                    @click="toggleTeamMember(employee)"
                    class="px-4 py-3 hover:bg-gray-700/50 cursor-pointer transition-all duration-200 flex items-center justify-between"
                    :class="{
                      'bg-pink-500/20 text-pink-300 border-l-4 border-pink-500':
                        newProject.teamMembers.includes(employee.id),
                      'text-gray-300': !newProject.teamMembers.includes(
                        employee.id
                      ),
                    }"
                  >
                    <span class="flex items-center gap-3">
                      <div
                        class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm"
                      >
                        {{ employee.name.charAt(0).toUpperCase() }}
                      </div>
                      {{ employee.name }}
                    </span>
                    <i
                      v-if="newProject.teamMembers.includes(employee.id)"
                      class="fa-solid fa-check text-pink-400"
                    ></i>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Third Row - Full width description -->
            <div class="space-y-2 md:col-span-2">
              <label
                class="text-sm font-medium text-white flex items-center gap-2"
              >
                <i class="fa-solid fa-align-left text-purple-400"></i>
                Description
              </label>
              <textarea
                v-model="newProject.description"
                class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm resize-none"
                rows="4"
                placeholder="Describe your project goals and requirements"
                required
              ></textarea>
            </div>

            <!-- Submit Button - full width -->
            <div class="md:col-span-2">
              <button
                type="submit"
                class="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg transform hover:scale-105 hover:shadow-xl mt-4"
              >
                <i class="fa-solid fa-rocket"></i>
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
      <!-- Update Project -->
      <div
        v-if="showUpdateProject"
        class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-[999] lg:w-full"
      >
        <div
          class="relative bg-gray-800/95 border border-gray-600 rounded-2xl p-4 md:p-8 mx-4 shadow-2xl w-full sm:w-[80%] lg:w-[75%] max-h-[90vh] scrollbar-hide overflow-y-auto"
        >
          <button
            @click="showUpdateProject = false"
            class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <i class="fa-solid fa-xmark text-2xl"></i>
          </button>
          <form
            @submit.prevent="updateProjectSubmit($event)"
            class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-8 w-full text-left"
          >
            <!-- First Row -->
            <!-- Project Title -->
            <div class="space-y-2">
              <label
                class="text-sm font-medium text-white flex items-center gap-2"
              >
                <i class="fa-solid fa-project-diagram text-blue-400"></i>
                Project Title
              </label>
              <input
                v-model="project.title"
                type="text"
                class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
                placeholder="Enter project title"
                required
              />
            </div>

            <!-- Project Status -->
            <div class="space-y-2">
              <label
                class="text-sm font-medium text-white flex items-center gap-2"
              >
                <i class="fa-solid fa-chart-line text-yellow-400"></i>
                Project Status
              </label>
              <input
                type="text"
                class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm opacity-50"
                :class="{
                  'text-yellow-400': project.status === 'to_do',
                  'text-blue-400': project.status === 'in_progress',
                  'text-red-400': project.status === 'testing',
                  'text-green-400': project.status === 'completed',
                }"
                :value="capitalize(project.status)"
                required
                disabled
              />
            </div>

            <!-- Second Row -->
            <!-- Technologies -->
            <div class="space-y-2">
              <label
                class="text-sm font-medium text-white flex items-center gap-2"
              >
                <i class="fa-solid fa-code text-green-400"></i>
                Technologies
              </label>
              <input
                v-model="project.technologies"
                type="text"
                class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
                placeholder="e.g. Vue.js, Node.js, MongoDB (comma separated)"
              />
            </div>

            <!-- Team Members -->
            <div class="space-y-2">
              <label
                class="text-sm font-medium text-white flex items-center gap-2"
              >
                <i class="fa-solid fa-users text-pink-400"></i>
                Team Members
              </label>
              <div class="relative">
                <input
                  type="text"
                  :value="selectedTeamMemberNames.join(', ')"
                  readonly
                  class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none cursor-pointer transition-all duration-300 backdrop-blur-sm"
                  @click="dropdownOpen = !dropdownOpen"
                  placeholder="Select team members"
                  required
                />
                <i
                  class="fa-solid fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none transition-transform duration-200"
                  :class="{ 'rotate-180': dropdownOpen }"
                ></i>

                <ul
                  v-if="dropdownOpen"
                  class="absolute z-20 w-full mt-2 bg-gray-800/95 backdrop-blur-lg border border-gray-600 rounded-xl shadow-2xl max-h-48 overflow-y-auto scrollbar-hide"
                >
                  <li
                    v-for="employee in employees"
                    :key="employee.id"
                    @click="toggleTeamMember(employee)"
                    class="px-4 py-3 hover:bg-gray-700/50 cursor-pointer transition-all duration-200 flex items-center justify-between"
                    :class="{
                      'bg-pink-500/20 text-pink-300 border-l-4 border-pink-500':
                        project.teamMembers.includes(employee.id),
                      'text-gray-300': !project.teamMembers.includes(
                        employee.id
                      ),
                    }"
                  >
                    <span class="flex items-center gap-3">
                      <div
                        class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm"
                      >
                        {{ employee.name.charAt(0).toUpperCase() }}
                      </div>
                      {{ employee.name }}
                    </span>
                    <i
                      v-if="project.teamMembers.includes(employee.id)"
                      class="fa-solid fa-check text-pink-400"
                    ></i>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Third Row - Full width description -->
            <div class="space-y-2 md:col-span-2">
              <label
                class="text-sm font-medium text-white flex items-center gap-2"
              >
                <i class="fa-solid fa-align-left text-purple-400"></i>
                Description
              </label>
              <textarea
                v-model="project.description"
                class="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm resize-none"
                rows="4"
                placeholder="Describe your project goals and requirements"
                required
              ></textarea>
            </div>

            <!-- Submit Button - full width -->
            <div class="md:col-span-2">
              <button
                type="submit"
                class="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg transform hover:scale-105 hover:shadow-xl mt-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-6"
                >
                  <path
                    d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z"
                  />
                  <path
                    d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z"
                  />
                </svg>

                Update Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/Services/api";
import { inject, watch } from "vue";
import SuccessMessage from "@/components/SuccessMessage.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
export default {
  name: "AllProjects",
  components: {
    SuccessMessage,
    ErrorMessage,
  },
  data() {
    return {
      dropdownOpen: false,
      employees: [],
      newProject: {
        title: "",
        description: "",
        status: "",
        technologies: "",
        teamMembers: [],
      },
      project: {
        title: "",
        description: "",
        status: "",
        technologies: "",
        teamMembers: [],
      },
      showAddProject: false,
      success: "",
      projects: [],
      statusList: ["to_do", "in_progress", "testing", "completed"],
      selectedStatus: {},
      globalData: inject("globalData"),
      ifProjectId: [],
      showUpdateProject: false,
    };
  },
  mounted() {
    this.getAllProjects();
    this.getUsers();

    watch(
      () => this.globalData.currentUser,
      (newVal) => {
        if (newVal && this.projects.length > 0) {
          this.checkAuthProject(); // ✅ Only run if user & projects are loaded
        }
      },
      { immediate: true }
    );
  },
  methods: {
    async getUsers() {
      try {
        const res = await api.get("/users");
        this.employees = [...res.data];
      } catch (err) {
        console.log("this is err: ", err);
      }
    },
    toggleTeamMember(employee) {
      if (this.showAddProject) {
        // For Add Project Modal
        const index = this.newProject.teamMembers.indexOf(employee.id);
        if (index === -1) {
          this.newProject.teamMembers.push(employee.id);
        } else {
          this.newProject.teamMembers.splice(index, 1);
        }
      } else if (this.showUpdateProject) {
        // For Update Project Modal
        const index = this.project.teamMembers.indexOf(employee.id);
        if (index === -1) {
          this.project.teamMembers.push(employee.id);
        } else {
          this.project.teamMembers.splice(index, 1);
        }
      }
    },

    async addNewProjectSubmit(event) {
      event.preventDefault();

      const newProject = {
        ...this.newProject,
        status: this.newProject.status.toLowerCase(),
        technologies: this.newProject.technologies
          .split(",")
          .map((tech) => tech.trim()),
      };

      const data = await api.post("/project", newProject);
      if (data.status === 201) {
        this.success = "✅ Project added successfully!";
        this.getAllProjects();
        setTimeout(() => {
          this.success = "";
          this.showAddProject = false;
        }, 1000);
      } else {
        console.log("showing this err: ", data);
      }

      // Reset form after submission
      this.newProject = {
        title: "",
        description: "",
        status: "",
        technologies: "",
        teamMembers: [],
      };
      this.dropdownOpen = false;
    },
    async handleSubmit(event, projectId) {
      event.preventDefault();

      const status = this.selectedStatus[projectId];
      console.log(
        "getting with projectId status:",
        this.selectedStatus[projectId]
      );
      console.log("status:", status);
      console.log(
        "Selected Status:",
        status,
        " id: ",
        projectId,
        "type of projectId: ",
        typeof projectId
      );
      try {
        const data = await api.patch(`project/${projectId}`, {
          status,
        });

        if (data.status === 200) {
          console.log("successfully updated");
          this.success = "✅ Project status updated successfully!";
          this.getAllProjects();
          setTimeout(() => {
            this.success = "";
          }, 3000);
        } else {
          console.log("something wrong !!", data);
        }
      } catch (err) {
        console.log("error: ", err);
      }
    },
    getAllProjects() {
      try {
        api
          .get("/project")
          .then((res) => {
            this.projects = res.data;
            const map = {};
            res.data.forEach((project) => {
              map[project.id] = project.status;
            });

            this.selectedStatus = map;
            console.log("global data: ", this.globalData?.currentUser?.role);
            this.checkAuthProject();
          })
          .catch((err) => console.log("error: ", err));
      } catch (err) {
        console.log("err: ", err);
      }
    },
    resetAndShowAddProject() {
      // Reset newProject form to clean state
      this.newProject = {
        title: "",
        description: "",
        status: "",
        technologies: "",
        teamMembers: [],
      };
      this.dropdownOpen = false;
      this.showAddProject = true;
    },
    getProject(id) {
      const project = this.projects.find((p) => p.id === id);
      if (project) {
        // Copy project data
        this.project = {
          ...project,
          technologies: Array.isArray(project.technologies)
            ? project.technologies.join(", ")
            : project.technologies,
        };

        // Set team members from assignments
        this.project.teamMembers = project.assignments
          ? project.assignments.map((assignment) => assignment.userId)
          : [];

        this.selectedStatus[project.id] = project.status;
        this.dropdownOpen = false;
      }
    },
    updateProjectSubmit() {
      const updatedProject = {
        ...this.project,
        status: this.project.status.toLowerCase(),
        technologies: this.project.technologies
          .split(",")
          .map((tech) => tech.trim()),
      };

      api
        .patch(`/project/${this.project.id}`, updatedProject)
        .then((res) => {
          if (res.status === 200) {
            this.success = "✅ Project updated successfully!";
            setTimeout(() => {
              this.getAllProjects();
              this.success = "";
              this.showUpdateProject = false;
            }, 1000);
          } else {
            console.log("Error updating project:", res);
          }
        })
        .catch((err) => console.log("Error:", err));
    },
    capitalize(word) {
      if (!word) return "";
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
    checkAuthProject() {
      const userId = this.globalData.currentUser?.id;

      for (let project of this.projects) {
        for (let e of project.assignments) {
          if (e.userId === userId) {
            this.ifProjectId.push(project.id);
          }
        }
      }
    },

    formetStatus(status) {
      // Replace underscore with space, then capitalize each word
      return status
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    },
  },
  computed: {
    selectedTeamMemberNames() {
      if (this.showAddProject) {
        // For Add Project Modal
        return this.employees
          .filter((emp) => this.newProject.teamMembers.includes(emp.id))
          .map((emp) => emp.name);
      } else if (this.showUpdateProject) {
        // For Update Project Modal
        return this.employees
          .filter((emp) => this.project.teamMembers.includes(emp.id))
          .map((emp) => emp.name);
      }
      return [];
    },
    filteredProjects() {
      // If admin, show all projects
      if (this.globalData?.currentUser?.role === "ADMIN") {
        return this.projects;
      }

      // If normal user, show only assigned projects
      const userId = this.globalData?.currentUser?.id;
      if (!userId) return [];

      return this.projects.filter((project) => {
        return (
          project.assignments &&
          project.assignments.some((assignment) => assignment.userId === userId)
        );
      });
    },
  },
};
</script>

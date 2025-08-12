<template>
  <SuccessMessage :message="success" :show="!!success" @close="success = ''" />
  <ErrorMessage
    :message="errorMessage"
    :show="!!errorMessage"
    @close="errorMessage = ''"
  />
  <div class="min-h-screen main-box relative py-8 px-4">
    <div class="max-w-6xl mx-auto relative">
      <div class="max-w-6xl mx-auto relative z-10">
        <div class="grid gap-8">
          <div
            class="bg-gradient-to-br from-gray-900/90 via-blue-900/90 to-purple-900/90 backdrop-blur-lg shadow-2xl border border-purple-500/20 rounded-2xl p-8 relative group"
          >
            <!-- Header Section -->
            <div class="flex items-center justify-between mb-12">
              <div class="space-y-2 text-left">
                <h1 class="text-4xl font-bold text-white">Manage Employees</h1>
                <p class="text-gray-400 text-lg max-w-2xl">
                  View, add, update, and manage all your employees working on
                  different projects in your organization.
                </p>
              </div>

              <button
                @click="isAddEmployee = true"
                class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                + Add Employee
              </button>
            </div>

            <hr class="border-gray-500 my-8" />

            <!-- Header Row -->
            <div
              class="text-xl grid [grid-template-columns:50px_1fr_2fr_1fr_100px] place-items-center h-16 bg-gray-900 rounded-t-lg"
            >
              <div><p class="text-gray-300 leading-relaxed">#</p></div>
              <div><p class="text-gray-300 leading-relaxed">Username</p></div>
              <div><p class="text-gray-300 leading-relaxed">Email</p></div>
              <div><p class="text-gray-300 leading-relaxed">Position</p></div>
              <div><p class="text-gray-300 leading-relaxed">Action</p></div>
            </div>

            <!-- User Rows -->
            <div
              v-for="(user, index) in userData"
              :key="index"
              class="text-md grid [grid-template-columns:50px_1fr_2fr_1fr_120px] place-items-center text-center hover:shadow-xl hover:scale-103 transition-all duration-300 text-gray-300 cursor-pointer hover:bg-gray-800/50 rounded-xl px-4 py-3 my-2 h-12 leading-[1.25] "
            >
              <div>
                <p>{{ index + 1 }}.</p>
              </div>
              <div>
                <p>{{ user.name }}</p>
              </div>
              <div>
                <p>{{ user.email }}</p>
              </div>
              <div>
                <p>{{ user.position }}</p>
              </div>
              <div class="flex gap-4">
                <p
                  class="text-green-500 cursor-pointer hover:scale-110 transition-transform duration-200"
                  @click="
                    getEmployee(user.id);
                    isUpdate = true;
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
                </p>
                <p
                  class="text-red-500 cursor-pointer hover:scale-110 transition-transform duration-200"
                  @click="
                    selectedUser = user;
                    showConfirm = true;
                  "
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
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Employee Modal -->
    <div
      v-if="isAddEmployee"
      class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-[999]"
    >
      <div
        class="relative bg-gray-800/95 border border-gray-600 rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl max-h-[90vh] scrollbar-hide overflow-y-auto"
      >
        <button
          @click="isAddEmployee = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300 z-10"
        >
          <i class="fa-solid fa-xmark text-2xl"></i>
        </button>
        <form @submit.prevent="addEmployee" class="space-y-6">
          <h2 class="text-2xl font-bold text-white mb-6">Add Employee</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2"
                >Name</label
              >
              <input
                type="text"
                v-model="newForm.name"
                class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
                placeholder="Enter employee name"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2"
                >Email</label
              >
              <input
                type="email"
                v-model="newForm.email"
                class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
                placeholder="Enter employee email"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2"
                >Position</label
              >
              <select
                v-model="newForm.position"
                class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
                required
              >
                <option disabled value="">Select position</option>
                <option v-for="p in positions" :key="p" :value="p">
                  {{ capitalize(p) }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2"
                >Password</label
              >
              <input
                type="password"
                v-model="newForm.password"
                class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
                placeholder="Enter employee password"
                required
              />
            </div>
          </div>
          <div class="flex justify-between items-center pt-4">
            <button
              type="button"
              @click="isAddEmployee = false"
              class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                  clip-rule="evenodd"
                />
              </svg>
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Update Employee Modal -->
    <div
      v-if="isUpdate"
      class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-[999]"
      style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh"
    >
      <div
        class="relative bg-gray-800/95 border border-gray-600 rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <button
          @click="isUpdate = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300 z-10"
        >
          <i class="fa-solid fa-xmark text-2xl"></i>
        </button>
        <form @submit.prevent="updateEmployee(form.id)" class="space-y-6">
          <h2 class="text-2xl font-bold text-white mb-6">Update Employee</h2>
          <div class="space-y-4">
            <div class="space-y-2">
              <label for="name" class="block text-sm font-medium text-gray-300"
                >Name</label
              >
              <input
                v-model="form.name"
                type="text"
                id="name"
                placeholder="Enter employee name"
                class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
                required
              />
            </div>
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-gray-300"
                >Email</label
              >
              <input
                v-model="form.email"
                type="email"
                id="email"
                placeholder="Enter employee email"
                class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
                required
              />
            </div>
            <div class="space-y-2">
              <label
                for="position"
                class="block text-sm font-medium text-gray-300"
                >Position</label
              >
              <select
                v-model="form.position"
                id="position"
                class="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
                required
              >
                <option disabled value="" class="text-gray-400">
                  Select position
                </option>
                <option
                  v-for="p in positions"
                  :key="p"
                  :value="p"
                  class="bg-gray-800 text-white"
                >
                  {{ capitalize(p) }}
                </option>
              </select>
            </div>
          </div>
          <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
          <p v-if="success" class="text-green-500 text-sm">{{ success }}</p>
          <button
            type="submit"
            class="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg transform hover:scale-105 hover:shadow-xl"
          >
            <i class="fa-solid fa-pen-to-square"></i>
            Update Employee
          </button>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showConfirm"
      class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-[999]"
      style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh"
    >
      <div
        class="relative bg-gray-800/95 border border-gray-600 rounded-xl p-6 w-full max-w-sm mx-4 shadow-2xl"
      >
        <button
          @click="showConfirm = false"
          class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300 z-10"
        >
          <i class="fa-solid fa-xmark text-xl"></i>
        </button>
        <div class="text-center pt-4">
          <div
            class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <i
              class="fa-solid fa-exclamation-triangle text-red-600 text-2xl"
            ></i>
          </div>
          <h2 class="text-xl font-semibold text-white mb-3">Confirm Delete</h2>
          <p class="text-gray-300 mb-6">
            Are you sure you want to delete
            <span class="font-semibold text-white">{{
              selectedUser?.name
            }}</span
            >? This action cannot be undone.
          </p>
          <div class="flex justify-center gap-3">
            <button
              class="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300 font-medium"
              @click="deleteEmployee(selectedUser.id)"
            >
              Yes, Delete
            </button>
            <button
              class="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300 font-medium"
              @click="showConfirm = false"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SuccessMessage from "@/components/SuccessMessage.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import { onMounted, ref } from "vue";
import api from "@/Services/api";
const isUpdate = ref(false);
const showConfirm = ref(false);
const isAddEmployee = ref(false);
const userData = ref([]);
const selectedUser = ref(null);
const form = ref({
  name: "",
  email: "",
  position: "",
});
const newForm = ref({
  name: "",
  email: "",
  position: "",
  password: "",
});

const positions = [
  "FULLSTACK",
  "FRONTEND",
  "BACKEND",
  "TESTER",
  "DEVOPS",
  "UI_UX_DESIGNER",
  "SCRUM_MASTER",
  "PROJECT_MANAGER",
  "MOBILE_DEVELOPER",
  "DATA_SCIENTIST",
  "ML_ENGINEER",
  "SYSTEM_ARCHITECT",
  "DATABASE_ADMIN",
  "BUSINESS_ANALYST",
  "PRODUCT_OWNER",
];

const error = ref("");
const success = ref("");
const errorMessage = ref("");

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
onMounted(allUserFind);

// Add new employee
async function addEmployee() {
  try {
    const response = await api.post("/users/register", newForm.value);
    console.log("Employee added:", response.data);
    allUserFind(); // Refresh the employee list
    success.value = "Employee added successfully!";
    setTimeout(() => {
      newForm.value = {
        name: "",
        email: "",
        position: "",
        password: "",
      };
      success.value = "";
      isAddEmployee.value = false;
    }, 1000);
    errorMessage.value = "";
  } catch (err) {
    errorMessage.value = "Failed to add employee. Please try again.";
  }
}

// Get all employees
async function allUserFind() {
  try {
    const response = await api.get("/users");
    userData.value = response.data;
    console.log("Employees fetched:", response.data);
  } catch (err) {
    console.error("Failed to fetch employees:", err);
  }
}

// Get employee by ID
const getEmployee = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    form.value = response.data;
    console.log("Employee fetched:", response.data);
  } catch (err) {
    console.error("Failed to fetch employee:", err);
  }
};

// Update employee
const updateEmployee = async (id) => {
  try {
    console.log("updated data", form.value);
    const response = await api.put(`/users/user-profile/${id}`, form.value);
    if (response.data.status === false) {
      errorMessage.value = response.data.message;
      return;
    }
    console.log("Employee updated:", response.data);
    allUserFind(); // Refresh the employee list
    success.value = response.data.message || "Employee updated successfully!";
    setTimeout(() => {
      success.value = "";
      isUpdate.value = false;
    }, 1000);
    errorMessage.value = "";
  } catch (err) {
    console.log("Error updating employee:", err);
    errorMessage.value = "Failed to update employee. Please try again.";
  }
};

//delete employee
const deleteEmployee = async (id) => {
  try {
    await api.delete(`/users/${id}`);
    console.log("Employee deleted:", id);
    allUserFind(); // Refresh the employee list
    success.value = "Employee deleted successfully!";
    setTimeout(() => {
      success.value = "";
      showConfirm.value = false;
    }, 1000);
    errorMessage.value = "";
  } catch (err) {
    errorMessage.value = "Failed to delete employee. Please try again.";
  }
};
</script>

<script>
export default {
  name: "EmployeePage",
};
</script>

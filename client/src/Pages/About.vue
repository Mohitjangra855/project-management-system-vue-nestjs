<template>
  <div
    class="aboutpage min-h-screen flex items-center justify-center px-4"
  >
    <div
      class="bg-gradient-to-br from-gray-900/90 via-blue-900/90 to-purple-900/90 backdrop-blur-lg p-8 sm:p-10 md:p-12 rounded-3xl shadow-2xl w-full max-w-7xl text-center border mt-16 border-purple-500/20 relative overflow-hidden"
    >
      <!-- Animated Background Blobs inside content only -->
      <div class="absolute inset-0 overflow-hidden rounded-3xl">
        <div class="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div class="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-green-400 to-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      <div class="space-y-8 relative z-10">
        <!-- Icon Section -->
        <div class="flex justify-center">
          <div class="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <i class="fa-solid fa-tasks text-3xl text-white"></i>
          </div>
        </div>
        
        <!-- Title -->
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent leading-tight">
          About ProjectFlow
        </h1>
        
        <!-- Description -->
        <div class="space-y-6 text-gray-200">
          <p class="text-lg sm:text-xl leading-relaxed">
            Our cutting-edge project management platform revolutionizes how teams collaborate and deliver results.
          </p>
          
          <div class="grid md:grid-cols-2 gap-8 text-left">
            <!-- Admin Features -->
            <div class="bg-gray-800/30 rounded-2xl p-6 border border-gray-600/30">
              <h3 class="text-xl font-semibold text-yellow-400 mb-4 flex items-center gap-3">
                <i class="fa-solid fa-crown"></i>
                Admin Features
              </h3>
              <ul class="space-y-3 text-gray-300">
                <li class="flex items-center gap-3">
                  <i class="fa-solid fa-plus-circle text-green-400"></i>
                  Create and manage projects
                </li>
                <li class="flex items-center gap-3">
                  <i class="fa-solid fa-users text-blue-400"></i>
                  Assign team members
                </li>
                <li class="flex items-center gap-3">
                  <i class="fa-solid fa-chart-line text-purple-400"></i>
                  Monitor real-time progress
                </li>
              </ul>
            </div>
            
            <!-- Employee Features -->
            <div class="bg-gray-800/30 rounded-2xl p-6 border border-gray-600/30">
              <h3 class="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-3">
                <i class="fa-solid fa-user-tie"></i>
                Employee Features
              </h3>
              <ul class="space-y-3 text-gray-300">
                <li class="flex items-center gap-3">
                  <i class="fa-solid fa-eye text-cyan-400"></i>
                  View assigned projects
                </li>
                <li class="flex items-center gap-3">
                  <i class="fa-solid fa-people-group text-pink-400"></i>
                  Connect with team members
                </li>
                <li class="flex items-center gap-3">
                  <i class="fa-solid fa-sync text-orange-400"></i>
                  Track project status
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Status Badges -->
          <div class="flex justify-center gap-4 flex-wrap">
            <span class="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-white font-semibold shadow-lg">
              🚀 To Do
            </span>
            <span class="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold shadow-lg">
              ⚡ In Progress
            </span>
            <span class="px-4 py-2 bg-gradient-to-r from-red-700 to-red-500 rounded-full text-white font-semibold shadow-lg">
              🔍 Testing
            </span>
            <span class="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full text-white font-semibold shadow-lg">
              ✅ Completed
            </span>
          </div>
          
          <p class="text-lg text-gray-300 leading-relaxed">
            With <strong class="text-yellow-400">role-based access</strong> and an 
            <strong class="text-blue-400">intuitive interface</strong>, ProjectFlow helps organizations 
            deliver quality results efficiently while keeping everyone aligned and productive.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style scoped>
strong {
  color: #f59e0b; /* Tailwind CSS yellow-400 */
}
/* .aboutpage{
background-image: url('https://images.unsplash.com/photo-1470790376778-a9fbc86d70e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAzfHxwcm9qZWN0JTIwbWFuYWdlbWVudHxlbnwwfHwwfHx8MA%3D%3D')
} */
</style>

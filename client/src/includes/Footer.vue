<template>
  <footer class="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-12 border-t border-purple-500/20">
    <div class="max-w-6xl mx-auto box-content sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <!-- Logo / About -->
        <div class="space-y-4">
          <h2 class="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent flex items-center gap-2">
            🚀 ProjectFlow
          </h2>
          <p class="text-sm text-gray-300 leading-relaxed">
            Empowering teams to collaborate, innovate, and deliver exceptional results with our modern project management platform.
          </p>
          
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-white flex items-center gap-2">
            <i class="fa-solid fa-link text-blue-400"></i>
            Quick Links
          </h3>
          <ul class="space-y-3 text-sm">
            <li><a href="/" class="text-gray-300 hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2">
              <i class="fa-solid fa-home text-xs"></i> Dashboard
            </a></li>
           
           
            <li><a href="/about" class="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center gap-2">
              <i class="fa-solid fa-info-circle text-xs"></i> About
            </a></li>
          </ul>
        </div>

        <!-- Support -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-white flex items-center gap-2">
            <i class="fa-solid fa-life-ring text-purple-400"></i>
            Support
          </h3>
          <ul class="space-y-3 text-sm">
            <li><a href="#" class="text-gray-300 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2">
              <i class="fa-solid fa-question-circle text-xs"></i> Help Center
            </a></li>
            <li><a href="#" class="text-gray-300 hover:text-pink-400 transition-colors duration-300 flex items-center gap-2">
              <i class="fa-solid fa-file-contract text-xs"></i> Terms of Service
            </a></li>
            <li><a href="#" class="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center gap-2">
              <i class="fa-solid fa-shield-alt text-xs"></i> Privacy Policy
            </a></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-white flex items-center gap-2">
            <i class="fa-solid fa-envelope text-pink-400"></i>
            Contact
          </h3>
          <div class="space-y-3 text-sm">
            <p class="text-gray-300 flex items-center gap-2">
              <i class="fa-solid fa-envelope text-xs text-blue-400"></i>
              support@projectflow.com
            </p>
            <p class="text-gray-300 flex items-center gap-2">
              <i class="fa-solid fa-phone text-xs text-green-400"></i>
              +91-12345-67890
            </p>
          </div>

          <!-- Social Icons -->
          <div class="flex gap-4 mt-6">
            <a href="#" class="w-10 h-10 bg-blue-600/20 hover:bg-blue-600/30 rounded-full flex items-center justify-center text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-110">
              <i class="fab fa-facebook"></i>
            </a>
            <a href="#" class="w-10 h-10 bg-cyan-600/20 hover:bg-cyan-600/30 rounded-full flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:scale-110">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="w-10 h-10 bg-purple-600/20 hover:bg-purple-600/30 rounded-full flex items-center justify-center text-purple-400 hover:text-purple-300 transition-all duration-300 hover:scale-110">
              <i class="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="mt-12 border-t border-gray-700/50 pt-6 text-center">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-sm text-gray-400">
            © 2024 ProjectFlow. Crafted with 💝 for better project management.
          </p>
          <div class="flex items-center gap-4 text-sm">
            <span class="text-gray-400">Made with</span>
            <div class="flex items-center gap-2">
              <span class="text-green-400">Vue.js</span>
              <span class="text-gray-500">•</span>
              <span class="text-red-400">NestJS</span>
              <span class="text-gray-500">•</span>
              <span class="text-blue-400">Prisma</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterCom',
}
</script>


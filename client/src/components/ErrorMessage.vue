<template>
  <Transition
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 -translate-y-4 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 -translate-y-4 scale-95"
  >
    <div
      v-if="show && message"
      class="fixed top-20 -right-[12em] sm:-right-[20vw] md:-right-[14%] lg:-right-[12%]   transform -translate-x-1/2 z-[1000] max-w-md w-[400px] mx-4"
    >
      <div
        class="bg-gradient-to-r from-red-500 to-rose-600 backdrop-blur-lg text-white p-4 rounded-2xl shadow-2xl border border-red-400/30 flex items-center gap-3"
      >
        <div class="flex-1">
          <p class="font-medium text-sm">{{ message }}</p>
        </div>
        <button
          @click="$emit('close')"
          class="flex-shrink-0 w-6 h-6 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
        >
          <i class="fa-solid fa-times text-xs"></i>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'ErrorMessage',
  props: {
    message: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close']
}
</script>

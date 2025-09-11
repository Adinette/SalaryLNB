<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 flex items-center justify-center overflow-auto"
		
  >
	    <!-- BACKDROP -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50"
      @click="$emit('update:modelValue', false)" 
    ></div>
	  
 <!-- MODAL -->
    <div
      class="relative bg-white rounded-lg shadow-lg w-full max-w-md p-4 md:p-6 z-10"
    >     
		<!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900 ">{{ title }}</h3>
        <button
          type="button"
          @click="$emit('update:modelValue', false)"
          class="text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="mb-4">
        <slot />
      </div>

      <!-- Footer -->
      <div class="flex justify-end space-x-2">
        <button
          type="button"
          class="px-4 py-2 bg-green-800 rounded text-white"
          @click="$emit('update:modelValue', false)"
        >
          Annuler
        </button>
        <button
          type="button"
          class="px-4 py-2 bg-green-800 text-white rounded"
          @click="$emit('confirm')"
        >
          Confirmer
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  modelValue: { type: Boolean, required: true }
})
defineEmits(['update:modelValue', 'confirm'])
</script>

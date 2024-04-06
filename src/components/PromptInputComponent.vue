<template>
  <div class="fixed px-8 flex items-start space-x-4 w-full max-w-7xl bottom-0 mb-4">
    <div class="min-w-0 flex-1">
      <form action="#">
        <div class="border rounded-xl max-w-7xl border-gray-200 focus-within:border-lvrg-green">
          <label for="comment" class="sr-only">Add your question</label>
          <textarea
            v-model="prompt"
            rows="3"
            name="comment"
            id="comment"
            class="block w-full resize-none border border-transparent pl-4 pt-3 bg-transparent text-gray-100 placeholder:text-gray-100 placeholder:pt-1 focus:border-lvrg-green focus:ring-0 text-base max-h-56 overflow-y"
            placeholder="Message LLM..."
          />
        </div>
        <div class="flex justify-between pt-2 max-w-7xl">
          <div class="flex items-center space-x-5">
            <div class="flow-root">
              <label
                type="button"
                class="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
              >
                <PaperClipIcon class="h-6 w-6" aria-hidden="true" />
                <span class="sr-only">Attach a file</span>
                <input type="file" @change="detectImageFiles($event)" class="hidden w-full" />
              </label>
            </div>
          </div>
          <div class="flex-shrink-0">
            <button
              @click="handleSubmit"
              type="submit"
              class="inline-flex items-center rounded-md bg-lvrg-green border-lvrg-green px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lvrg-green-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lvborder-lvrg-green"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PaperClipIcon } from '@heroicons/vue/24/outline'

const emit = defineEmits(['prompt-submit', 'image-selection'])
let prompt = ref('')
let base64Img: any = ref(null)

const detectImageFiles = ($event: any) => {
  const file = $event.target.files[0]
  createBase64Image(file)
  console.log('loaded', typeof base64Img.value)
  emit('image-selection', base64Img.value)
  $event.target.value = null
}

const createBase64Image = (file: any) => {
  const reader = new FileReader()
  reader.onload = () => {
    base64Img.value = reader.result
  }
  reader.readAsDataURL(file)
}

const handleSubmit = (e: any) => {
  e.preventDefault()
  emit('prompt-submit', prompt.value)
}
</script>

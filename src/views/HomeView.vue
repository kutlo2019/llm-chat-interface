<template>
  <main
    class="relative mx-auto h-full sm:px-6 lg:flex-auto flex justify-center items-center overflow-y-auto flex-col"
  >
    <img class="w-56 mx-auto" src="../assets/images/logo.png" alt="" />
    <div class="text-center">
      <h1 class="text-white mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
        How may I help you?
      </h1>
    </div>
    <PromptInputComponent @prompt-submit="handlePrompt" />
  </main>
</template>

<script setup lang="ts">
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import PromptInputComponent from '@/components/PromptInputComponent.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

let isUser = ref('')
const router = useRouter()

const auth = getAuth()

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid
    isUser.value = uid
  }
})

const handlePrompt = async (prompt: string) => {
  router.push({ name: 'Chat', params: { prompt: prompt } })
}
</script>

<style lang="css">
.content-wrapper {
  background: rgb(125, 125, 125);
  background: linear-gradient(
    180deg,
    rgba(125, 125, 125, 1) 0%,
    rgba(93, 93, 93, 1) 8%,
    rgba(77, 77, 77, 1) 14%,
    rgba(15, 15, 15, 1) 100%
  );
}
</style>

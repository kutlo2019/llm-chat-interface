<template>
  <main
    class="relative h-[60vh] max-w-7xl mt-16 ml-16 text-gray-100 text-base flex flex-col gap-4 overflow-y-auto"
  >
    <div
      v-for="message in conversation.messages"
      :key="message"
      class="flex gap-8 border border-lvrg-green p-6"
    >
      <div class="text-center">
        <div v-if="message.role === 'user'">
          <img class="w-14 mx-auto rounded-full" src="../assets/images/avatar.png" alt="" />
          <span>You</span>
        </div>
        <div v-else>
          <img class="w-16 mx-auto" src="../assets/images/logo.png" alt="" />
          <span>LLM</span>
        </div>
      </div>

      <div class="text-left w-5/6">
        {{ message.content }}
      </div>
    </div>

    <PromptInputComponent @prompt-submit="submitPrompt" />
  </main>
</template>

<script setup lang="ts">
import { fetchResponse } from '@/stores/llmStore'
import { fetchConversation, createConversation, updateConversation } from '@/stores/messagesStore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ref, onMounted, onBeforeMount } from 'vue'
import PromptInputComponent from '@/components/PromptInputComponent.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
let isUser = ref('')

const auth = getAuth()
let conversation: any = ref({})
let conversationID: any = null

onBeforeMount(async () => {
  conversationID = route.params.prompt
  if (conversationID.includes(' ') || conversationID.length < 10) {
    conversation.value = {
      messages: [
        {
          role: 'user',
          content: conversationID
        }
      ]
    }
  } else {
    conversation.value = await fetchConversation(conversationID)
  }
}),
  onMounted(async () => {
    const response = await fetchResponse(conversation.value.messages)
    conversation.value.messages.push(response.message)
    console.log('message 1', conversation.value.messages[0])
  })

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid
    isUser.value = uid
    // conversation.value = await fetchConversation()
    // newChat.value = conversation.value ? false : true
  }
})

const submitPrompt = async (prompt: string) => {
  if (conversation.value === null) {
    conversation.value = { messages: [] }
  }

  conversation.value.messages.push({
    role: 'user',
    content: prompt
  })
  const response = await fetchResponse(conversation.value.messages)
  conversation.value.messages.push(response.message)
  if (isUser.value !== '') {
    if (!conversation.value.uid) {
      conversation.value.uid = isUser
      conversationID = await createConversation(conversation.value)
      router.push({
        name: 'Chat',
        params: { prompt: conversationID }
      })
      console
    } else {
      console.log('id', conversationID)
      const newConversation = {
        id: conversationID,
        messages: conversation.value.messages
      }
      await updateConversation(newConversation)
    }
  }
}
</script>

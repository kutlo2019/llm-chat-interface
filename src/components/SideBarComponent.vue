<template>
  <aside class="block border-r border-gray-900/5 xl:border-0 py-10">
    <div class="flex justify-center h-16 shrink-0 items-center">
      <img class="h-16 w-auto" src="../assets/images/logo.png" alt="Your Company" />
    </div>
    <nav class="flex flex-1 flex-col mt-6">
      <ul role="list" class="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" class="-mx-2 space-y-1 text-gray-200 px-8 flex flex-col gap-4">
            <li v-for="item in headings" :key="item.id">
              <router-link :to="{ name: 'Chat', params: { prompt: item.id } }">
                {{ item.heading }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { fetchConversations } from '../stores/messagesStore'
import { ref, onMounted } from 'vue'
import { auth } from '@/config/firebase.config'

const headings: any = ref([])

onMounted(async () => {
  let conversations = await fetchConversations(auth.currentUser?.uid as string)
  headings.value = conversations.map((conversation: any) => {
    return {
      heading: conversation.messages[0].content.slice(0, 15),
      id: conversation.id
    }
  })
  console.log(headings.value)
})
</script>

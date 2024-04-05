<template>
  <nav-bar-component />
  <div class="content-wrapper flex h-full w-full font-nunito">
    <SideBarComponent v-show="showSideBar" class="w-64" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ref } from 'vue'
import SideBarComponent from '@/components/SideBarComponent.vue'
import NavBarComponent from '@/components/NavBarComponent.vue'

const showSideBar = ref(false)

const auth = getAuth()

onAuthStateChanged(auth, async (user) => {
  if (user) {
    showSideBar.value = true
  }
})
</script>

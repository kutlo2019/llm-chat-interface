<template>
  <nav-bar-component />
  <div class="flex gap content-wrapper h-full w-full font-nunito">
    <SideBarComponent v-if="showSideBar" class="w-64" />
    <router-view :key="route.path" />
  </div>
</template>

<script setup lang="ts">
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ref } from 'vue'
import SideBarComponent from '@/components/SideBarComponent.vue'
import NavBarComponent from '@/components/NavBarComponent.vue'
import { useRoute } from 'vue-router'

const showSideBar = ref(false)

const route = useRoute()

const auth = getAuth()

onAuthStateChanged(auth, async (user) => {
  if (user) {
    showSideBar.value = true
  }
})
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

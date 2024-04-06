<template>
  <Disclosure as="nav" class="bg-tranparent">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-end">
        <div class="flex">
          <div class="flex flex-shrink-0 items-center">
            <img class="h-16 w-auto" src="../assets/images/logo.png" alt="Your Company" />
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <!-- Current: "border-lvrg-green text-gray-900", Default: "border-transparent text-gray-100 hover:border-gray-300 hover:text-gray-700" -->
            <router-link
              to="/"
              class="inline-flex items-center border-b-2 border-lvrg-green px-1 pt-1 text-sm font-medium text-gray-300"
            >
              New Chat
            </router-link>

            <router-link
              v-if="showLoginButton"
              to="/auth/login"
              class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-100 hover:border-gray-300 hover:text-gray-700"
            >
              Login
            </router-link>

            <router-link
              v-if="showLoginButton"
              to="/auth/register"
              class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-100 hover:border-gray-300 hover:text-gray-700"
            >
              Register
            </router-link>

            <router-link
              v-if="!showLoginButton"
              @click="handleLogout"
              to="#"
              class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-100 hover:border-gray-300 hover:text-gray-700"
            >
              Logout
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { BellIcon } from '@heroicons/vue/24/outline'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { logOut } from '@/stores/userStore'

let showLoginButton = ref(true)
const router = useRouter()

const auth = getAuth()
onAuthStateChanged(auth, async (user) => {
  if (user) {
    showLoginButton.value = false
  }
})

const handleLogout = async () => {
  await logOut()
  router.push({ name: 'Home' })
  router.go(0)
}
</script>

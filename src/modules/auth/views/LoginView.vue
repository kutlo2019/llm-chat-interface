<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-56 w-auto" src="../../../assets/images/logo.png" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
        Sign in to your account
      </h2>
      <router-link
        :to="{ name: 'Register' }"
        class="block text-gray-200 text-center text-sm font-thin"
      >
        Or register an account
      </router-link>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-white"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              v-model="emailPass.email"
              name="email"
              type="email"
              autocomplete="email"
              :required="true"
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-lvrgbg-lvrg-green sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-white"
              >Password</label
            >
            <div class="text-sm">
              <a href="#" class="font-semibold text-lvrg-green-2 hover:text-indigo-300"
                >Forgot password?</a
              >
            </div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              v-model="emailPass.password"
              name="password"
              type="password"
              autocomplete="current-password"
              :required="true"
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-lvrgbg-lvrg-green sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            @click="handleSignIn"
            class="flex w-full justify-center rounded-md bg-lvrg-green px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lvrgtext-lvrg-green-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lvrgbg-lvrg-green"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const emailPass = ref({
  email: '',
  password: ''
})

const router = useRouter()

const handleSignIn = (e: any) => {
  e.preventDefault()
  const auth = getAuth()
  signInWithEmailAndPassword(auth, emailPass.value.email, emailPass.value.password)
    .then((userCredential) => {
      const user = userCredential.user
      console.log('user', user)
      router.push({ name: 'Home' })
    })
    .catch(function (error) {
      const errorMessage = error.message
      alert(errorMessage)
    })
}
</script>

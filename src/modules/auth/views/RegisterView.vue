<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-56 w-auto" src="../../../assets/images/logo.png" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
        Register an account
      </h2>
      <router-link
        :to="{ name: 'Login' }"
        class="block text-gray-200 text-center text-sm font-thin"
      >
        Or sign in to your existing account
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
              v-model="credentials.email"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              :required="true"
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-lvrg-green sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-white"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              v-model="credentials.password"
              name="password"
              type="password"
              :required="true"
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-lvrg-green sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-white"
              >Confirm Password</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password-confirm"
              v-model="credentials.confirmPassword"
              name="password-confirm"
              type="password"
              :required="true"
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-lvrg-green sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            @click="handleRegistration"
            class="flex w-full justify-center rounded-md bg-lvrg-green ring-lvrg-green px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-lvrg-green-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lvrg-green ring-lvrg-green"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const credentials = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

const router = useRouter()

const handleRegistration = async (e: any) => {
  e.preventDefault()
  if (credentials.value.password === credentials.value.confirmPassword) {
    const auth = getAuth()
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.value.email,
        credentials.value.password
      )
      console.log('user??', userCredential.user)
      if (userCredential.user) {
        router.push({ name: 'Home' })
      }
    } catch (err) {
      alert(err)
    }
  } else {
    alert('Passwords do not match!!')
  }
}
</script>

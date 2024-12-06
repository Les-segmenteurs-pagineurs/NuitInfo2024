<template>
  <div class="d-flex justify-content-center align-items-center w-100 h-100 h-screen">
    <UCard class="max-w-sm w-full">
      <template #header class="d-flex justify-items-center">
        <h2>Signup</h2>
      </template>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Mail" name="email">
          <UInput v-model="state.email" placeholder="mr.oombastic@g..." icon="i-heroicons-envelope" />
        </UFormGroup>

        <UFormGroup label="Username" name="username">
          <UInput v-model="state.username" placeholder="mrBoombastic..." icon="i-heroicons-user-circle" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput type="password" v-model="state.password" placeholder="********" icon="i-heroicons-lock-closed" />
        </UFormGroup>

        <UFormGroup label="Confirm Password" name="confirmPassword">
          <UInput type="password" v-model="state.confirmPassword" placeholder="********" icon="i-heroicons-lock-closed" />
        </UFormGroup>

        <UButton type="submit">
          Submit
        </UButton>

      </UForm>
    </UCard>
  </div>

</template>

<script setup lang="ts">
import { useToast } from 'vue-toastification'
import type { FormError } from '#ui/types'
import "~/assets/css/bootstrapWish.scss"
import { object, string, nonempty, type Infer } from 'superstruct'
import type { FormSubmitEvent } from '#ui/types'

const toast = useToast()

const schema = object({
  username: nonempty(string()),
  email: nonempty(string()),
  password: nonempty(string()),
  confirmPassword: nonempty(string())
})

const state = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

type Schema = Infer<typeof schema>

const validateForm = () => {
  errors.username = errors.password = errors.email = errors.confirmPassword = ''
  
  if (!state.username || !state.email || !state.password || !state.confirmPassword) {
    errors.username = "All fields are required"
    return false
  }

  if (state.password !== state.confirmPassword) {
    errors.confirmPassword = "Passwords do not match"
    return false
  }

  return true
}

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  if (!validateForm()) return
  try {
    const response = await $fetch('/api/user/signup', {
      method: 'POST',
      body: event.data,
    })

    toast.success('Account created successfully!')
  } catch (error) {
    const errorMessage = 'Error creating account. Please try again later.'
    toast.error(errorMessage)
  }
}
</script>
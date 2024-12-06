<template>
  <div class="d-flex justify-content-center align-items-center w-100 h-100 h-screen">
    <UCard class="max-w-sm w-full">
      <template #header class="d-flex justify-items-center">
        <h2>Login</h2>
      </template>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Mail" name="email">
          <UInput v-model="state.email" placeholder="mr.oombastic@g..." icon="i-heroicons-envelope" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput type="password" v-model="state.password" placeholder="********" icon="i-heroicons-lock-closed" />
        </UFormGroup>

        <UButton type="submit">
          Submit
        </UButton>

      </UForm>
    </UCard>
  </div>

</template>
<script setup lang="ts">
import { object, string, nonempty, type Infer } from 'superstruct'
import type { FormSubmitEvent } from '#ui/types'

const schema = object({
  email: nonempty(string()),
  password: nonempty(string())
})

const state = reactive({
  email: '',
  password: ''
})

type Schema = Infer<typeof schema>
  async function onSubmit(event: FormSubmitEvent<Schema>) {
  const router = useRouter();
  try {
    const body: any = await $fetch('/api/user/login', {
      method: 'POST',
      body: event.data
    });
      } catch (error) {
    console.error('Erreur lors de la connexion:', error);
  }
}

</script>

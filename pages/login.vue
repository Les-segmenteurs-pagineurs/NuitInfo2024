<template>
  <div class="d-flex justify-content-center align-items-center w-100 h-100 h-screen">
    <UCard class="max-w-sm w-full">
      <template #header class="d-flex justify-items-center">
        <h2>Login</h2>
      </template>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Username" name="username">
          <UInput v-model="state.username" placeholder="mrBoombastic..." icon="i-heroicons-user-circle" />
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

import type { FormError } from '#ui/types'
import "assets/css/bootstrapWish.css"
import { object, string, nonempty, type Infer } from 'superstruct'
import type { FormSubmitEvent } from '#ui/types'



const schema = object({
  username: nonempty(string()),
  password: nonempty(string())
})

const state = reactive({
  username: '',
  password: ''
})

type Schema = Infer<typeof schema>

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data)

  const  body : any  = await $fetch('/api/login', {
    method: 'post',
    body: event.data 
  })


}

// const providers = [{
//   label: 'Continue with GitHub',
//   icon: 'i-simple-icons-github',
//   color: 'white' as const,
//   click: () => {
//     console.log('Redirect to GitHub')
//   }
// }]


</script>

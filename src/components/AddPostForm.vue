<template>
  <div class="card flex justify-center">
    <Button label="Add New" @click="visible = true" />
    <Dialog v-model:visible="visible" modal header="Add New Post" :style="{ width: '25rem' }">
      <span class="text-surface-500 dark:text-surface-400 block mb-8"> Add a new post. </span>
      <div class="flex items-center gap-4 mb-4">
        <label for="title" class="font-semibold w-24">Title</label>
        <InputText id="title" v-model.trim="newPost.title" required autofocus class="flex-auto" />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="body" class="font-semibold w-24">Body</label>
        <InputText id="body" v-model.trim="newPost.body" required autofocus class="flex-auto" />
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="visible = false" />
        <Button label="Save" icon="pi pi-check" @click="submitForm" />
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePostStore } from '@/stores/postStore'

const store = usePostStore()
const newPost = ref({ title: '', body: '' })
const visible = ref(false)
const submitForm = () => {
  store.addPost(newPost.value)
  newPost.value = { title: '', body: '' } // Clear form
  visible.value = false
}
</script>

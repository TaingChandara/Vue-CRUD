<script lang="ts">
import { defineComponent } from 'vue'
import AddPostForm from './components/AddPostForm.vue'
import PostTable from './components/PostTable.vue'

export default defineComponent({
  components: {
    AddPostForm,
    PostTable
  }
})
</script>

<template>
  <div id="app">
    <AddPostForm />
    <PostTable />
  </div>
</template>

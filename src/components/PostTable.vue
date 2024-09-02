<template>
  <div class="card">
    <Toast />
    <IconField iconPosition="left">
      <InputIcon>
        <i class="pi pi-search" />
      </InputIcon>
      <InputText style="display: flex; gap: 0.5rem" v-model="searchQuery" placeholder="Search..." />
    </IconField>
    <DataTable
      v-if="filteredPosts.length"
      :value="filteredPosts"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50, 100]"
      tableStyle="min-width: 50rem"
    >
      <Column field="id" header="ID" style="width: 10%"></Column>
      <Column field="title" header="Title" style="width: 30%"></Column>
      <Column field="body" header="Body" style="width: 40%"></Column>
      <Column header="Actions" style="min-width: 8rem">
        <template #body="slotProps">
          <div style="display: flex; gap: 0.5rem">
            <!-- Edit-->
            <Button icon="pi pi-pencil" outlined rounded @click="editPost(slotProps.data)" />

            <!-- Delete-->
            <Button
              icon="pi pi-trash"
              severity="danger"
              @click="confirmDelete(slotProps.data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>
    <!-- Show message if no posts are found -->
    <div v-else class="p-4 text-center text-muted">
      No posts found matching your search criteria.
    </div>

    <!-- Confirmation Dialog -->
    <Dialog
      v-model:visible="deleteDialogVisible"
      :style="{ width: '450px' }"
      header="Confirm Deletion"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span>Are you sure you want to delete this post?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="saveEditedPost" />
        <Button label="Yes" icon="pi pi-check" text @click="confirmDeletePost" />
      </template>
    </Dialog>

    <!-- Edit Post Dialog -->
    <Dialog
      v-model:visible="editDialogVisible"
      :style="{ width: '450px' }"
      header="Edit Post"
      :modal="true"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="title" class="font-semibold w-24">Title</label>
        <InputText
          id="title"
          v-model.trim="editedPost.title"
          required
          autofocus
          class="flex-auto"
        />
      </div>
      <div class="flex items-center gap-4 mb-8">
        <label for="body" class="font-semibold w-24">Body</label>
        <Textarea v-model="editedPost.body" rows="5" cols="30" />
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="cancelEdit" />
        <Button label="Save" icon="pi pi-check" text @click="saveEditedPost" />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePostStore } from '@/stores/postStore'
import { useToast } from 'primevue/usetoast'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

const toast = useToast()
const store = usePostStore()
const searchQuery = ref('')
const deleteDialogVisible = ref(false)
const editDialogVisible = ref(false)
const postToDelete = ref<number | null>(null)
const editedPost = ref<any>(null)
const filteredPosts = computed(() => {
  return store.posts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
})

// Fetch posts when the component mounts
store.fetchPosts()

// Edit Post
const editPost = (post: any) => {
  editedPost.value = { ...post } // Clone the post object to avoid directly mutating it
  editDialogVisible.value = true // Show the edit dialog
}

// Cancel edit
const cancelEdit = () => {
  editDialogVisible.value = false
  editedPost.value = null
}

const saveEditedPost = async () => {
  if (editedPost.value) {
    const id = editedPost.value.id
    await store.updatePost(id, editedPost.value) // Pass both the ID and the updated post data
    toast.add({
      severity: 'success',
      summary: 'Successful',
      detail: `Updated post ID: ${id}`,
      life: 3000
    })
    editDialogVisible.value = false // Close the edit dialog after saving
    editedPost.value = null // Clear the editedPost reference
  }
}

// Confirm deletion
const confirmDelete = (id: number) => {
  deleteDialogVisible.value = true
  postToDelete.value = id
}

// Cancel delete
const cancelDelete = () => {
  deleteDialogVisible.value = false
  postToDelete.value = null
}

// Confirm delete post
const confirmDeletePost = () => {
  if (postToDelete.value !== null) {
    store.deletePost(postToDelete.value)
    toast.add({
      severity: 'success',
      summary: 'Successful',
      detail: `Deleted post ID: ${postToDelete.value}`,
      life: 3000
    })
    deleteDialogVisible.value = false // Close the dialog after deletion
    postToDelete.value = null // Clear the postToDelete reference
  }
}
</script>

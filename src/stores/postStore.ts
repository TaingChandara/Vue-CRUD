import { defineStore } from 'pinia'
import axios from 'axios'

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as any[]
  }),
  actions: {
    async fetchPosts() {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
      this.posts = response.data
    },
    async addPost(post: any) {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', post)
      this.posts.push(response.data)
    },
    async updatePost(id: number, updatePost: any) {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, updatePost)
      const index = this.posts.findIndex((post) => post.id === id)
      if (index !== -1) {
        this.posts[index] = updatePost
      }
    },
    async deletePost(id: number) {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      this.posts = this.posts.filter((post) => post.id !== id)
    }
  }
})

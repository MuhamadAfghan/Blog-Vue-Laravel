<script setup>
import { usePostsStore } from '@/stores/posts';
import { storeToRefs } from 'pinia';
import { reactive } from 'vue';

const { createPost } = usePostsStore();
const {errors} = storeToRefs(usePostsStore());

  const formData = reactive({
    title: '',
    body: ''
  });


</script>

<template>
  <main>
    <h1 class="title">Create a new post</h1>

    <form class="w-1/2 mx-auto space-y-5" @submit.prevent="createPost(formData)">
      <div>
        <input type="text" placeholder="Post Title" name="title" v-model="formData.title">
        <div v-if="errors.title">
          <p class="error" v-for="(error, index) in errors.title" :key="index">{{ error }}</p>
          </div> 
      </div>

      <div>
        <textarea rows="6" name="body" placeholder="Post Content" v-model="formData.body"></textarea>
        <div v-if="errors.body">
          <p class="error" v-for="(error, index) in errors.body" :key="index">{{ error }}</p>
          </div> 
      </div>
      
        <button class="primary-btn" type="submit">Create Post</button>
    </form>
  </main>
</template>

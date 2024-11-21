<script setup>
import { useAuthStore } from '@/stores/auth';
import { usePostsStore } from '@/stores/posts';
import { storeToRefs } from 'pinia';
import { reactive, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { getPost, updatePost } = usePostsStore();
const { errors } = storeToRefs(usePostsStore());
const route = useRoute();
const router = useRouter();
const postId = route.params.id;
const {user} = storeToRefs(useAuthStore());

const formData = reactive({
  title: '',
  body: ''
});

const post = ref(null);

onMounted(async () => {
  post.value = await getPost(postId); 

  if (post.user_id !== user.id) {
    router.push({ name: 'home' });
  }

  formData.title = post.value.title;
  formData.body = post.value.body;
});
</script>

<template>
  <main>
    <h1 class="title">Edit Post</h1>

    <form class="w-1/2 mx-auto space-y-5" @submit.prevent="updatePost(post, formData)">
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
      
      <button class="primary-btn" type="submit">Update Post</button>
    </form>
  </main>
</template>

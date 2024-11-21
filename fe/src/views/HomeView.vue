<script setup>

import { usePostsStore } from '@/stores/posts';
import { onMounted, ref } from 'vue';

const { getPosts } = usePostsStore();
const posts = ref([]);

onMounted( async () => posts.value = await getPosts() );

function formatTimeAgo(date) {
  const now = new Date();
  const postDate = new Date(date);
  const diff = now - postDate;
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  return `${diffDays} days ago`;
}

</script>

<template>
  <main>
    <h1 class="title">Latest Posts</h1>

    <!-- posts -->
    <div v-if="posts.length >0">
        <div v-for="post in posts" :key="post.id" class="pl-4 mb-12 border-l-4 border-blue-500">
          <h2 class="text-xl font-bold">{{ post.title }}</h2>
          <p class="mb-4 text-xs text-slate-600">
            Posted by <strong>{{ post.user.name }}</strong> on 
            <strong v-if="(new Date() - new Date(post.created_at)) / (1000 * 60 * 60 * 24) <= 3">
            {{ formatTimeAgo(post.created_at) }}
            </strong>
            <strong v-else>
            {{ new Date(post.created_at).toLocaleDateString('en-GB') }}
            </strong>
          </p>
            <div class="flex flex-wrap max-w-full mb-2 break-words whitespace-pre-line line-clamp-2 content text-wrap"> 
              <p class="w-full break-words whitespace-pre-wrap line-clamp-2">{{ post.body }}</p>
          </div>
            <RouterLink :to="{name: 'show', params: { id : post.id} }" class="text-blue-600 underline">Read more...</RouterLink>
        </div>
    </div>

    <div v-else class="mx-auto">
      <p class="title">No posts available</p>
    </div>
  </main>
</template>

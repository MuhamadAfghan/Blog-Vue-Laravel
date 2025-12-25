<script setup>
import { useRoute } from 'vue-router';
import { usePostsStore } from '@/stores/posts';
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const { getPost, deletePost } = usePostsStore();
const post = ref(null);
const authStore = useAuthStore();

onMounted(async () => {
    post.value = await getPost(route.params.id);
});

function formatTimeAgo(date) {
    const now = new Date();
    const postDate = new Date(date);
    const diff = now - postDate;
    const diffDays = Math. floor(diff / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    return `${diffDays} days ago`;
}
</script>


<template>
    <main v-if="post" class="p-5">
        <h1 class="title">{{ post.title }}</h1>
        

    <p class="text-xs text-slate-600">
            Posted by <strong>{{ post.user.name }}</strong> on 
            <strong v-if="(new Date() - new Date(post.created_at)) / (1000 * 60 * 60 * 24) <= 3">
                {{ formatTimeAgo(post.created_at) }}
            </strong>
            <strong v-else>
                {{ new Date(post.created_at).toLocaleDateString('en-GB') }}
            </strong>
        </p>
        <div class="flex items-center gap-2 mt-1 mb-4">
            <RouterLink :to="{name: 'home'}" class="px-2 py-1 text-yellow-800 bg-yellow-100 rounded-lg">Back</RouterLink>
            <div v-if=" authStore.user && post.user.id == authStore.user.id "  class="flex items-center gap-2 ">
                <div>
                    <RouterLink :to="{name: 'edit', params: { id : post.id} }" class="px-2 py-1 text-blue-800 bg-blue-100 rounded-lg">Edit</RouterLink>
                </div>
        
                <form @submit.prevent="deletePost(post)">
                    <button type="submit" class="px-2 py-1 text-red-800 bg-red-100 rounded-lg">Delete</button>
                </form>
            </div>
        </div>
        <div class="flex flex-wrap max-w-full break-words whitespace-pre-line content text-wrap"> 
            <p class="w-full break-words whitespace-pre-wrap">{{ post.body }}</p>
        </div>

 
    </main>
    <p v-else>Post Not Found </p>
</template>


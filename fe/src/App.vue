<script setup>
  import { RouterLink, RouterView } from 'vue-router' 
import { useAuthStore } from './stores/auth';

  const authStore = useAuthStore();

</script>

<template>
  <header> 
      <nav>
        <div class="flex gap-2">
          <RouterLink :to="{name: 'home'}" class="nav-link">Home</RouterLink> 
          <RouterLink :to="{name: 'create'}" class="nav-link"  v-if="authStore.user">New Post</RouterLink> 
        </div>
        
        <div v-if="authStore.user">
          <div  class="flex items-center gap-3 text-slate-300">
            <p  class="">Welcome back, <strong>{{ authStore.user.name }}</strong></p>
            <span class="">|</span>
            <form action="" @submit.prevent="authStore.logout">
              <button class="text-red-500">Logout</button>
            </form>
          </div>
        </div>

        <div v-else>
          <RouterLink :to="{name: 'register'}" class="nav-link">Register</RouterLink> 
          <RouterLink :to="{name: 'login'}" class="nav-link">Login</RouterLink> 
        </div>
      </nav>
  </header>

  <RouterView />
</template>
 
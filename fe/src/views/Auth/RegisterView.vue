<script setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted , reactive } from 'vue';

const {errors} = storeToRefs(useAuthStore());
const {authenticate} = useAuthStore();

const formData = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
})

onMounted(() => errors.value = {})

</script>

<template>
  <main>
    <h1 class="title">Register a new account</h1>

    <form action="" class="w-1/2 mx-auto space-y-6" @submit.prevent="authenticate('register', formData)">
        <div>
            <input type="text" placeholder="Name" v-model="formData.name">
            <div v-if="errors.name">
                <p class="error" v-for="(error, index) in errors.name" :key="index">{{ error }}</p>
            </div>
        </div>

        <div>
            <input type="email" placeholder="Email" v-model="formData.email">
            <div v-if="errors.email">
                <p class="error" v-for="(error, index) in errors.email" :key="index">{{ error }}</p>
                </div>  
        </div>

        <div>
            <input type="password" placeholder="Password" v-model="formData.password">
            <div v-if="errors.password">
                <p class="error" v-for="(error, index) in errors.password" :key="index">{{ error }}</p>
            </div>
        </div>

        <div>
            <input type="password" placeholder="Confirm Password" v-model="formData.password_confirmation">
            <div v-if="errors.password_confirmation">
                <p class="error" v-for="(error, index) in errors.password_confirmation" :key="index">{{ error }}</p>
            </div>
        </div>

        <div>
            <button type="submit" class="primary-btn">Register</button>
        </div>
    </form>
  </main>
</template>

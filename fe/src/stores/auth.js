import { defineStore } from "pinia";


export const useAuthStore = defineStore('authStore', {
    state: () => ({
        user: null,
        errors: {},
    }), 
    actions: {

        // get authenticated user
        async getUser(){
            if (localStorage.getItem('token')){
                const res = await fetch('/api/user', { 
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
    
                const data = await res.json(); 
                if(res.ok){
                    this.user = data.data;
                } 
            }
        },
        
        // login or register
        async authenticate(apiRoute, formData){
            const res = await fetch(`/api/${apiRoute}`, {
                method: 'post', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
    
            const data = await res.json();
    
            if (data.errors){
                this.errors = data.errors; 
            }else{
                localStorage.setItem('token', data.data.token);
                this.user = data.data.user;
                this.errors = {};
                this.router.push({name: 'home'});
            }
        },

        // logout
        async logout(){
            const res = await fetch('/api/logout', {
                method: 'post',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const data = await res.json(); 
            if (res.ok){
                localStorage.removeItem('token');
                this.user = null;
                this.errors = {};
                this.router.push({name: 'login'});
            }


        }
    }
});


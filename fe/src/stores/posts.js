import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const usePostsStore = defineStore("postsStore", {
  state: () => ({
    errors: {},
  }),

  actions: {
    // get all posts
    async getPosts() {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        return data.data;
      } catch (err) {
        console.error(err);
        this.errors = { fetch: "Failed to fetch posts" };
      }
    },

    // get single post
    async getPost(id) {
      try {
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();
        return data.data;
      } catch (err) {
        console.error(err);
        this.errors = { fetch: "Failed to fetch post" };
      }
    },

    // create post
    async createPost(formData) {
      try {
        const res = await fetch("/api/posts", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (data.errors) {
          this.errors = data.errors;
        } else {
          this.errors = {};
          this.router.push({ name: "home" });
        }
      } catch (err) {
        console.error(err);
        this.errors = { fetch: "Failed to create post" };
      }
    },

    // update post
    async updatePost(post, formData) {
      const authStore = useAuthStore();
      if (authStore.user.id == post.user_id) {
        try {
          const res = await fetch(`/api/posts/${post.id}`, {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(formData),
          });

          const data = await res.json();
          if (data.errors) {
            this.errors = data.errors;
          } else {
            this.errors = {};
            this.router.push({ name: "home" });
          }
        } catch (err) {
          console.error(err);
          this.errors = { fetch: "Failed to update post" };
        }
      }
    },

    // delete post
    async deletePost(post) {
      const authStore = useAuthStore();
      if (authStore.user.id == post.user_id) {
        try {
          const res = await fetch(`/api/posts/${post.id}`, {
            method: "delete",
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          const data = await res.json();
          if (res.ok) {
            this.router.push({ name: "home" });
          }
        } catch (err) {
          console.error(err);
          this.errors = { fetch: "Failed to delete post" };
        }
      }
    },
  },
});

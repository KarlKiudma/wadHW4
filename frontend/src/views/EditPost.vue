<template>
  <div class="edit-post-page">
    <div class="form">
      <h3 class="title">Edit Post</h3>

      <div class="input-row">
        <label>Body</label>
        <textarea
            v-model="updatedContent"
            @input="$event.target.style.height = 'auto'; $event.target.style.height = $event.target.scrollHeight + 'px'"
        ></textarea>
      </div>

      <div class="actions">
        <button class="update-button" @click="updatePost">Update</button>
        <button class="delete-button" @click="deletePost">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: null,
      updatedContent: ""
    };
  },

  async created() {
    const id = this.$route.params.id;

    const res = await fetch(`http://localhost:3000/posts/${id}`, {
      credentials: "include",
    });

    this.post = await res.json();
    this.updatedContent = this.post.content;
  },

  methods: {
    async updatePost() {
      const id = this.$route.params.id;

      await fetch(`http://localhost:3000/posts/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: this.updatedContent }),
      });

      this.$router.push("/");
    },

    async deletePost() {
      const id = this.$route.params.id;

      await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      this.$router.push("/");
    },
  },
};
</script>

<style scoped>

.edit-post-page {
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* TAUST JÄÄB TUMEDAKS – EI MUUDA */
  font-family: Arial, sans-serif;
}

.form {
  background-color: rgb(32, 32, 32);
  padding: 24px 32px;
  border-radius: 12px;
  min-width: 380px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.title {
  text-align: center;
  color: white;
  margin-bottom: 20px;
}

.input-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.input-row label {
  font-size: 16px;
  color: white;
  white-space: nowrap;
  margin-top: 6px;
}

.input-row textarea {
  flex: 1;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 15px;
  box-sizing: border-box;
  resize: none;
  overflow: hidden;
  min-height: 40px;
  line-height: 1.4;
}

.update-button,
.delete-button {
  cursor: pointer;
  background-color: black; /* AddPost roheline */
  border: 0;
  padding: 10px 22px;
  margin-top: 20px;
  margin-right: 10px;
  color: white;
  border-radius: 20px;
  font-size: 15px;
}

.update-button:hover,
.delete-button:hover {
  opacity: 0.9;
  background-color: rgb(55, 55, 55);}




</style>

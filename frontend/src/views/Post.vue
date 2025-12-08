<template>
  <div class="wrapper">
    <div class="box">
      <h2>A Post</h2>

      <div class="row">
        <label>Body</label>
        <input type="text" v-model="updatedContent" />
      </div>

      <div class="btn-row">
        <button class="update" @click="updatePost">Update</button>
        <button class="delete" @click="deletePost">Delete</button>
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
      credentials: "include"
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: this.updatedContent })
      });

      this.$router.push("/");
    },

    async deletePost() {
      const id = this.$route.params.id;

      await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
        credentials: "include"
      });

      this.$router.push("/");
    }
  }
};
</script>


<style scoped>
/* wrapper et kast oleks keskel */
.wrapper {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

/* KAST – sama stiil nagu AddPost */
.box {
  background-color: rgb(232, 238, 223); /* hele rohekas taust */
  padding: 30px 40px;
  border-radius: 12px;
  width: 350px;
  box-shadow: 0 0 6px rgba(0,0,0,0.15);
  text-align: center;
}

h2 {
  margin-bottom: 25px;
  color: black;
  font-size: 20px;
  font-weight: 600;
}

/* Body label + input */
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

label {
  font-size: 16px;
  color: black;
}

input {
  width: 180px;
  padding: 7px 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

/* Nupud – samad nagu AddPost */
.btn-row {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.update {
  background-color: #9fb6e2;
  padding: 8px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: black;
  font-size: 14px;
}
.delete {
  background-color: #d93555;
  padding: 8px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: black;
  font-size: 14px;
}

.update:hover{
  background-color: #6181b2;
}
.delete:hover {
  background-color: #980925;
}
</style>

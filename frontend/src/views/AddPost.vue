<template>
    <div class="add-post-page">
      <div class="form">
        <h3 class="title">Add Post</h3>
  
        <textarea
          v-model="content"
          placeholder="Write your post here..."
          class="textarea"
        ></textarea>
  
        <div class="actions">
          <button class="addpost-button" @click="AddPost">Add Post</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import auth from "../auth"
  export default {
  name: "AddPost",
  data() {
    return {
      content: "",
      authResult: auth.authenticated()
    };
  },
  
  methods: {
    AddPost(){
        if(this.content.trim() === "") {
            alert("Post cannot be empty");
            return;
        }
        const data = {
            content: this.content,
        };
        fetch("http://localhost:3000/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        })
        .then((res) => res.json())
        .then(() => {
            this.$router.push("/");
        })
        .catch((err) => console.log(err));
    },
  },
  };  
  </script>
  
  <style scoped>
  .add-post-page {
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
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
  
  .textarea {
  width: 100%;
  min-height: 120px;
  max-height: 240px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: vertical;
  }
  
  @media (max-width: 600px) {
  .textarea {
    min-height: 90px;
    max-height: 180px;
    font-size: 0.95rem;
  }
  .form {
    max-width: 80%;
  }
  }
  
  @media (min-width: 1000px) {
  .textarea {
    min-height: 150px;
    max-height: 350px;
    font-size: 1.05rem;
  }
  }
  
  .actions {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  }
  
  .addpost-button {
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  background-color: rgb(10, 10, 10);
  color: white;
  font-weight: 600;
  }
  
  .addpost-button:hover {
  opacity: 0.9;
  background-color: rgb(55, 55, 55);
  }
  </style>
<template>
    <div class="add-post-page">
      <div class="form">
        <h3 class="title">Add Post</h3>
  
        <div class="post">
          <label>Body</label>
          <input type="text" v-model="content"/>
        </div>
  
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

  .post {
  display: flex;
  align-items: center;
  gap: 20px;
}

.post label {
  font-size: 16px;
  color: white;
}

.post input {
  flex: 1;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
  
  .addpost-button {
    cursor: pointer;
    background: black;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-right: 10px;
    color: white;
    border-radius: 20px;
  }
  
  .addpost-button:hover {
  opacity: 0.9;
  background-color: rgb(55, 55, 55);
  }
  </style>
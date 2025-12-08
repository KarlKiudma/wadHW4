<template>
  <div class="header">
    <div class="container">
    <button class="logout-button" @click="Logout">Logout</button></div>
    <div class="post-list" v-for="post in posts" :key="post.id">  
      <div class="post" @click="openPost(post.id)">
        <small class="post-date">{{ new Date(post.date).toLocaleDateString() }}</small>
        <p class="post-content">{{ post.content }}</p>
      </div>
    </div>
    <button class="addpost-button" @click="AddPost">Add Post</button>
    <button class="delete-button" @click="DeleteAll">Delete All</button>
  </div>
</template>

<script>
import auth from "../auth";
import AddPost from "./AddPost.vue";

export default {
  name: "HomeView",

  data() {
    return {
      posts: [],
      authResult: auth.authenticated()
    };
  },

  methods: {
    Logout() {
      fetch("http://localhost:3000/auth/logout", {
        credentials: "include"
      })
        .then(res => res.json())
        .then(() => {
          this.$router.push("/login");
        })
        .catch(err => console.log("Logout error", err));
    },

    fetchPosts() {
      fetch("http://localhost:3000/posts")
        .then(res => res.json())
        .then(data => {
          this.posts = data;
        })
        .catch(err => console.log(err));
    },

    DeleteAll() {
      fetch("http://localhost:3000/posts", {
        method: "DELETE"
      })
        .then(() => {
          this.fetchPosts();
        })
        .catch(err => console.log("Delete failed", err));
    },
    AddPost(){
      this.$router.push("/add-post")
    },
    openPost(id) {
      this.$router.push(`/post/${id}`);
    }
  },

  mounted() {
    this.fetchPosts();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.fetchPosts());
  },
};
</script>

<style scoped>
  .post-list {
    max-width: 600px;
    margin: 20px auto;
    padding: 0 15px;
    color: #FFF;
    display: flex;
    flex-direction: column;
  }
  .post {
    position: relative;
    background-color: rgb(32, 32, 32);
    border: 1px solid rgb(70, 70, 70);
    border-radius: 8px;
    margin: 20px 0;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    cursor: pointer;
  }
  .post + .post {
    margin-top: 40px;
    border-top: 2px dashed rgb(255, 102, 82);
  }
  .post ~ .post {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    padding-top: 20px;
  }
  .post-date {
    position: absolute;
    top: 10px;
    right: 12px;
    font-size: 0.8em;
  }

  .post-content p {
    padding-bottom: 15px;
    margin: 0;
    font-size: 1em;
    line-height: 1.5;
  }
  .logout-button,
.addpost-button,
.delete-button {
  cursor: pointer;
  background: rgb(32, 32, 32);
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 10px;
  color: white;
  border-radius: 20px;
}

.logout-button:hover,
.addpost-button:hover,
.delete-button:hover {
  background: rgb(10,10,10);
}

  @media (max-width: 600px) {

    .posts {
      padding: 0 10px;
      margin: 10px auto;
    }

    .post {
      margin: 15px 0;
      padding: 12px;
    }

    .post + .post {
      margin-top: 25px;
    }

    .post-content p {
    font-size: 0.95em;
    line-height: 1.4;
    }
  }
  
</style>
<template>
  <div class="header">
    <div class="container">
    <button class="logout-button" @click="Logout">Logout</button>
    </div>
    <div class="post-list" v-for="post in posts"   :key="post.index">  
      <div class="post">
        <div class="post-header">
          <h3>Title:  {{post.title}} </h3>
        </div>
        <div class="post-content">
          <p>{{post.body}}</p>
        </div>
      </div>
    </div>
    <button class="addpost-button"> Add Post</button>
    <button class="delete-button">Delete All</button>
  </div>
</template>

<script>
import auth from "../auth";

export default {
  name: "HomeView",
  components: {
  },
   data: function() {
    return {
    posts:[ ],
    authResult: auth.authenticated()
    }
  },
  methods: {
    Logout() {
      fetch("http://localhost:3000/auth/logout", {
          credentials: 'include',  
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log('jwt removed');
        this.$router.push("/login");
      })
      .catch((e) => {
        console.log(e);
        console.log("error logout");
      });
    },
  }, 
  mounted() {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then(data => this.posts = data)
        .catch(err => console.log(err.message))
    }
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
    border-top: 2px solid rgb(255, 102, 82);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    padding-top: 20px;
  }
  .post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .post-content {
    flex-direction: column;
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

    .post-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;
    }
    .post-content p {
    font-size: 0.95em;
    line-height: 1.4;
    }
  }
  
</style>
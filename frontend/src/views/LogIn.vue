<template>
  <div class="login-page">
    <div class="form">
      <h3 class="login-title">Log In</h3>
      <div class="field">
        <label for="email">Email</label>
        <input type="email" name="email"  required v-model="email">
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input type="password" name="password" required v-model="password">
      </div>
      <div class="actions">
        <button @click="LogIn">LogIn</button>
        <p> or </p>
        <button @click='this.$router.push("/signup")'>Signup</button>
      </div>
    </div>
  </div>
</template>
  
<script>
  export default {
  name: "LogIn", 
  
  data: function() {
      return {
     email: '',
     password: '',
    }
    },
    methods: {
  
  
  LogIn() {
        var data = {
          email: this.email,
          password: this.password
        };
        fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
            credentials: 'include',
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
        console.log(data);
        this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
          console.log("error");
        });
      },
    }, 
    }
  
</script>
  
  <style scoped>
  .login-page {
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  }
  .form {
    background-color: rgb(32, 32, 32);
    padding: 24px 32px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: 320px;
    max-height: 320px;
    min-height: 110px;
  }
  .login-title {
  text-align: center;
  color: white;
  }
  .field {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
  }
  label {
  width: 90px;
  margin-right: 10px;
  color: white;
  }
  input {
    flex:1;
    max-width: 230px;
    padding: 6px 10px;
    border-radius: 18px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    background-color: #ffffff;
    font-size: 0.9rem;
  }
  
  .actions {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 14px;
  }
  .actions p {
  margin: 0;
  color: white;
  font-size: 1rem;
}
  
  button {
    padding: 8px 22px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    background-color: rgb(10, 10, 10);
    color: white;
    font-weight: 600;
  }
  
  button:hover {
    opacity: 0.9;
    background-color: rgb(55, 55, 55);
  }
  </style>
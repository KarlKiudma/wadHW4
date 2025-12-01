<template>
  <div class="signup-page">
    <div class="form">
      <h3 class="signup-title">Sign Up</h3>
      <div class="field">
        <label for="email">Email</label>
        <input type="email" name="email"  required v-model="email">
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input type="password" name="password" required v-model="password">
      </div>
      <div class="actions">
        <button @click="SignUp" class="SignUp">SignUp</button>
      </div>
    </div>
  </div>
</template>
  
  <script>
  export default {
  name: "SignUp", 
  
  data: function() {
      return {
     email: '',
     password: '',
    }
    },
    methods: {
  
  
  SignUp() {
        var data = {
          email: this.email,
          password: this.password
        };
        
        fetch("http://localhost:3000/auth/signup", {
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
.signup-page {
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  background-color: rgb(255, 102, 82);
  padding: 24px 32px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 320px;
  max-height: 320px;
  min-height: 110px;
}
.signup-title {
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
  flex: 1;
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
  
  button {
    padding: 8px 22px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    background-color: rgb(31, 163, 163);
    color: white;
    font-weight: 600;
  }
  
  button:hover {
    opacity: 0.9;
    background-color: #163f6f;
  }
  </style>
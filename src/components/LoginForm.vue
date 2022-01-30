<template>
    <form method="post" id="form" name="logForm" action="">
        <p v-if="error.length">
            {{ error }}
             </p>
        <p v-if="errorMsg.length">
            {{errorMsg}}
        </p>
        <p> Login: </p>
        <input type="text" name="login" id="log" v-model="login">
        <p> Password: </p>
        <input type="password" name="password" id="pass" v-model="password">
        <p></p>
        <button value="sign up" type="submit" name="but" @click="SignUp">sign up</button>
        <button value="log in" type="submit" name="but" @click="LogIn" >log in</button>
        </form>
</template>


<script>
import axios from 'axios'

export default {
    data() {
        return {
            login: "",
            password: "",
            error: "",
            errorMsg: ""
        }
    },
    methods: {
        SignUp(e) {
            e.preventDefault();
            if (this.check(e)) {
                axios.post('http://localhost:8888/register',  {
                    login: this.login,
                    password: this.password,
                })
                    .then((response) => {
                        this.loginPost();
                    })
                    .catch((error) => {
                        this.errorMsg = 'Username already exists';
                        console.log(error) //
                    });
            }
        },

        LogIn(e) {
            e.preventDefault();
            if (this.check(e)) {
                this.loginPost();
            }

        },

        loginPost() {
            axios.post('http://localhost:8888/auth',  {
                login: this.login,
                password: this.password,
            })
                .then((response) => {
                    console.log(response.data);
                    let role = response.data.role;
                    localStorage.setItem('jwt', response.data.token);
                    localStorage.setItem('role', role);
                    localStorage.setItem('id', response.data.userId);
                    this.$router.push('Game');
                })
                .catch((error) => {
                    this.errorMsg = "Invalid authorization data";
                    console.log(error)
                });
        },

        check(e) {
            this.error = "";
            if (this.login === "" || this.password === "") {
                this.error = 'Try it again';
                console.log("here");
              //  e.preventDefault();
                return false;
            } else {
                return true;
            }
        }
    }
}
</script>
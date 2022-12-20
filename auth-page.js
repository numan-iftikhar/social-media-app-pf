const app = Vue.createApp({
  data() {
    return {
      userName: "",
      passWord: "",
    };
  },
  methods: {
    logData() {
      this.userName = this.$refs.username.value;
      this.passWord = this.$refs.password.value;

      fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: `${this.userName}`,
          password: `${this.passWord}`,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("token", JSON.stringify(data.token));
          localStorage.setItem("username", JSON.stringify(data.username));
          localStorage.setItem("email", JSON.stringify(data.email));
          localStorage.setItem("firstName", JSON.stringify(data.firstName));
          localStorage.setItem("lastName", JSON.stringify(data.lastName));
          if (data.message != "Invalid credentials")
            window.location.href = "./index.html";
        });
    },
  },
});

app.mount("#main");

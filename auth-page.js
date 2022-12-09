const form = document.querySelector(".login-form");
const submitBtn = document.querySelector(".submit-btn");
const userName = document.querySelector("#user-name");
const password = document.querySelector("#password");

// console.log(form);
const validateUser = async (e) => {
  e.preventDefault();
  const res = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: `${userName.value}`,
      password: `${password.value}`,
      // expiresInMins: 60
    }),
  });
  const data = await res.json();
  localStorage.setItem("token", JSON.stringify(data.token));
  localStorage.setItem("username", JSON.stringify(data.username));
  localStorage.setItem("email", JSON.stringify(data.email));
  localStorage.setItem("firstName", JSON.stringify(data.firstName));
  localStorage.setItem("lastName", JSON.stringify(data.lastName));
  console.log(data);
  if (data.message != "Invalid credentials")
    window.location.href = "./index.html";
};

submitBtn.addEventListener("click", validateUser);

// fetch("https://dummyjson.com/posts")
//   .then((res) => res.json())
//   .then(console.log);

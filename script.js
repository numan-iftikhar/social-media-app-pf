const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-btn");
let loaded = false;

searchBtn.addEventListener("click", () => {
  const searchApi = `https://dummyjson.com/posts/search?q=${searchBox.value}`;
  getPosts(searchApi);
});

const getPosts = async (API_URL) => {
  const res = await fetch(API_URL);
  const postsData = await res.json();

  const postsContainer = document.querySelector(".posts-container");

  // create post's HTML
  postsData.posts.map((post) => {
    postsCount++;
    const postDiv = document.createElement("div");
    const title = document.createElement("h3");
    const body = document.createElement("p");

    postDiv.classList.add("post");
    title.classList.add("post-title");
    body.classList.add("post-body");

    title.innerText = post.title;
    body.innerText = post.body;

    postDiv.appendChild(title);
    postDiv.appendChild(body);

    postsContainer.appendChild(postDiv);
  });
};

document.loaded = getPosts("https://dummyjson.com/posts?limit=10");

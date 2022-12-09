const getPosts = async () => {
  const res = await fetch("https://dummyjson.com/posts?limit=10");
  const postsData = await res.json();

  const postsContainer = document.querySelector(".posts-container");

  // create post's HTML
  postsData.posts.map((post) => {
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

getPosts();

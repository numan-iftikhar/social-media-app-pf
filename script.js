const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-btn");
let loaded = false;

searchBtn.addEventListener("click", () => {
  const searchApi = `https://dummyjson.com/posts/search?q=${searchBox.value}`;
  getPosts(searchApi);
});

// get posts
const getPosts = async (API_URL) => {
  const res = await fetch(API_URL);
  const postsData = await res.json();

  const postsContainer = document.querySelector(".posts-container");

  // create post's HTML
  postsData.posts.map((post, index) => {
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

    // add comments to post
    fetch(`https://dummyjson.com/comments/post/${index + 1}`)
      .then((res) => res.json())
      .then((commentsData) =>
        commentsData.comments.map((data) => {
          // create comment's HTML
          const commentsDiv = document.createElement("div");
          const comment = document.createElement("p");

          commentsDiv.classList.add("comments");
          comment.classList.add("comment");
          //   console.log(data);
          comment.innerText = data.body;
          commentsDiv.appendChild(comment);
          postDiv.appendChild(commentsDiv);
        })
      );
  });
};

document.loaded = getPosts("https://dummyjson.com/posts?limit=10");

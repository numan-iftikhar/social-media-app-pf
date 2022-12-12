let postsContainer = document.querySelector(".posts-container");
const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-btn");

searchBtn.addEventListener("click", () => {
  postsContainer.innerHTML = "";
  const searchApi = `https://dummyjson.com/posts/search?q=${searchBox.value}`;
  getPosts(searchApi);
});

// get posts
const getPosts = async (API_URL) => {
  const res = await fetch(API_URL);
  const postsData = await res.json();
  // create post's HTML
  postsData.posts.map((post, index) => {
    const postDiv = document.createElement("div");
    const title = document.createElement("h3");
    const body = document.createElement("p");
    let reactionsDiv = document.createElement("div");
    let tagsDiv = document.createElement("div");
    reactionsDiv.innerHTML = `
      <span>${post.reactions}</span>
      <span>reactions</span>
    `;
    // tagsDiv.innerHTML = `
    //   ${post.tags.map((tag) => {
    //     <span>tag</span>;
    //   })}
    // `;
    postDiv.classList.add("post");
    title.classList.add("post-title");
    body.classList.add("post-body");
    reactionsDiv.classList.add("reactions");
    tagsDiv.classList.add("tags");

    title.innerText = post.title;
    body.innerText = post.body;

    postDiv.appendChild(title);
    postDiv.appendChild(body);
    postDiv.appendChild(reactionsDiv);
    postDiv.appendChild(tagsDiv);

    postsContainer.appendChild(postDiv);

    let commentsDiv = document.createElement("div");
    // add comments to post
    fetch(`https://dummyjson.com/comments/post/${index + 1}`)
      .then((res) => res.json())
      .then((commentsData) =>
        commentsData.comments.map((data) => {
          // create comment's HTML
          const comment = document.createElement("p");

          comment.classList.add("comment");
          comment.innerText = data.body;
          commentsDiv.appendChild(comment);
          postDiv.appendChild(commentsDiv);

          // edit btn
          let btnEdit = document.createElement("button");
          btnEdit.innerHTML = `<i class="fa-solid fa-pen"></i>`;
          btnEdit.classList.add("btn-edit");
          comment.appendChild(btnEdit);

          // delete btn
          let btnDelete = document.createElement("button");
          btnDelete.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
          btnDelete.classList.add("btn-delete");
          comment.appendChild(btnDelete);

          // btnEdit.addEventListener("click", () => {
          //   document
          //     .querySelector(".add-comment-btn")
          //     .addEventListener("click", () => {
          //       commentsDiv = `<p class="comment">${
          //         document.querySelector(".comment-input").value
          //       }</p>`;
          //     });
          // });

          btnDelete.addEventListener("click", (e) => {
            e.target.parentElement.parentElement.remove();
          });
        })
      );
  });
};

document.loaded = getPosts("https://dummyjson.com/posts?limit=10");

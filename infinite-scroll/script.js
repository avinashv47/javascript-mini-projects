const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filterField = document.getElementById("filter-posts");

let limit = 5;
let page = 1;

async function getPosts() {
  const results = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const postsData = await results.json();
  return postsData;
}

function showLoader() {
  loading.classList.add("show");
  setTimeout(() => {
    loading.classList.remove("show");
    page++;
    showPosts();
  }, 1000);
}

async function showPosts() {
  const posts = await getPosts();
  posts.forEach((post) => {
    const { id, title, body } = post;
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.innerHTML = `
        <div class="post-number">${id}</div>
        <div class="post-details">
            <h2 class="post-title">${title}</h2>
            <div class="post-text">${body}</div>
        </div>
        `;
    postsContainer.appendChild(postElement);
  });
}

function filterPosts(ev) {
    const textEntered = ev.target.value.toLowerCase();
    const allPosts = document.querySelectorAll(".post");
    allPosts.forEach((post) => {
      const title = post.querySelector(".post-title").innerText.toLowerCase();
      const body = post.querySelector(".post-text").innerText.toLowerCase();
      if (title.indexOf(textEntered) > -1 || body.indexOf(textEntered) > -1) {
        post.style.display = "flex";
      } else {
        post.style.display = "none";
      }
    });
  }

showPosts();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoader();
  }
});

filterField.addEventListener("input", filterPosts);

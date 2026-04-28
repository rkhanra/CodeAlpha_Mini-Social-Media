const API = "http://localhost:5000";

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}


// ==============================
// LOAD POSTS
// ==============================
async function loadPosts() {
  try {
    const res = await fetch(`${API}/posts`);
    const posts = await res.json();

    const feed = document.getElementById("feed");
    feed.innerHTML = "";

    posts.forEach(post => {
      const div = document.createElement("div");
      div.className = "post";

      div.innerHTML = `
        <h3 style="cursor:pointer;color:#4CAF50"
            onclick="window.location.href='profile.html?id=${post.user?._id}'">
            ${post.user?.username || "User"}
        </h3>

        <p>${post.content}</p>

        <button onclick="likePost('${post._id}')">
          ❤️ ${post.likes.length}
        </button>

        <div style="margin-top:10px;">
          <input id="c-${post._id}" placeholder="comment..." />
          <button onclick="addComment('${post._id}')">Send</button>
        </div>

        <div id="comments-${post._id}" style="margin-top:10px;"></div>
      `;

      feed.appendChild(div);

      loadComments(post._id);
    });

  } catch (err) {
    console.error(err);
  }
}



// ==============================
// CREATE POST
// ==============================
async function createPost() {
  const content = document.getElementById("postInput").value.trim();

  if (!content) {
    alert("Write something!");
    return;
  }

  try {
    const res = await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ content })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Post failed");
      return;
    }

    document.getElementById("postInput").value = "";

    loadPosts();

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
}



// ==============================
// LIKE POST
// ==============================
async function likePost(postId) {
  await fetch(`${API}/posts/${postId}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  loadPosts();
}



// ==============================
// ADD COMMENT
// ==============================
async function addComment(postId) {
  const text = document.getElementById(`c-${postId}`).value.trim();

  if (!text) return;

  await fetch(`${API}/posts/${postId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ text })
  });

  loadComments(postId);
}



// ==============================
// LOAD COMMENTS
// ==============================
async function loadComments(postId) {
  const res = await fetch(`${API}/posts/${postId}/comments`);
  const comments = await res.json();

  const box = document.getElementById(`comments-${postId}`);
  box.innerHTML = "";

  comments.forEach(c => {
    const p = document.createElement("p");
    p.innerText = `💬 ${c.text}`;
    box.appendChild(p);
  });
}



// ==============================
// INIT
// ==============================
loadPosts();
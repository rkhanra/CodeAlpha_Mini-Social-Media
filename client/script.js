const API = "http://localhost:5000";
const USER_ID = "69ee16740120c5f64b3e83f6";

// 🔄 Load all posts
async function loadPosts() {
  try {
    const res = await fetch(`${API}/posts`);
    const posts = await res.json();

    const feed = document.getElementById("feed");
    feed.innerHTML = "";

    posts.reverse().forEach(post => {
      const div = document.createElement("div");
      div.className = "post";

      div.innerHTML = `
        <h4>${post.user?.username || "User"}</h4>
        <p>${post.content}</p>

        <button onclick="likePost('${post._id}')">
          ❤️ ${post.likes.length}
        </button>

        <div class="comment-box">
          <input id="c-${post._id}" placeholder="Write a comment..." />
          <button onclick="addComment('${post._id}')">Comment</button>
        </div>

        <div id="comments-${post._id}"></div>
      `;

      feed.appendChild(div);

      loadComments(post._id);
    });

  } catch (err) {
    console.error("Load error:", err);
  }
}

// ➕ Create post
async function createPost() {
  const input = document.getElementById("postInput");
  const content = input.value.trim();

  if (!content) {
    alert("Write something!");
    return;
  }

  try {
    const res = await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: USER_ID,
        content: content
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Failed");
      return;
    }

    input.value = "";
    loadPosts();

  } catch (err) {
    console.error("Post error:", err);
  }
}

// ❤️ Like post
async function likePost(postId) {
  try {
    await fetch(`${API}/posts/${postId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: USER_ID
      })
    });

    loadPosts();

  } catch (err) {
    console.error("Like error:", err);
  }
}

// 💬 Add comment
async function addComment(postId) {
  const input = document.getElementById(`c-${postId}`);
  const text = input.value.trim();

  if (!text) return;

  try {
    await fetch(`${API}/posts/${postId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: USER_ID,
        text: text
      })
    });

    input.value = "";
    loadComments(postId);

  } catch (err) {
    console.error("Comment error:", err);
  }
}

// 📥 Load comments
async function loadComments(postId) {
  try {
    const res = await fetch(`${API}/posts/${postId}/comments`);
    const comments = await res.json();

    const container = document.getElementById(`comments-${postId}`);
    container.innerHTML = "";

    comments.forEach(c => {
      const p = document.createElement("p");
      p.innerText = `💬 ${c.text}`;
      container.appendChild(p);
    });

  } catch (err) {
    console.error("Load comments error:", err);
  }
}

// 🚀 Initial load
loadPosts();
const API = "http://localhost:5000";

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}
// const token = localStorage.getItem("token");

//  LOAD POSTS
// Adds Follow / Unfollow toggle button in feed.html for other users

async function loadPosts() {
  try {
    const res = await fetch(`${API}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const posts = await res.json();

    const feed = document.getElementById("feed");
    feed.innerHTML = "";

    // logged in user id
    const payload = JSON.parse(atob(token.split(".")[1]));
    const myId = payload.id;

    posts.forEach((post) => {
      const postUserId = post.user?._id || "";
      const isMe = postUserId === myId;

      const followingUsers = payload.following || [];

      const alreadyFollowing = followingUsers.includes(postUserId);

      const div = document.createElement("div");
      div.className = "post";

      div.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
          
          <h3 
            style="cursor:pointer;"
            onclick="openUserProfile('${postUserId}')"
          >
            ${post.user?.username || "User"}
          </h3>

          ${
            !isMe
              ? `
            <button
              onclick="toggleFeedFollow('${postUserId}', this)"
              style="padding:8px 14px;"
            >
              ${alreadyFollowing ? "Unfollow" : "Follow"}
            </button>
            `
              : ""
          }

        </div>

        <p>${post.content}</p>

        <button onclick="likePost('${post._id}')">
          ❤️ ${post.likes.length}
        </button>

        <div>
          <input id="c-${post._id}" placeholder="comment..." />
          <button onclick="addComment('${post._id}')">Send</button>
        </div>

        <div id="comments-${post._id}"></div>
      `;

      feed.appendChild(div);
      loadComments(post._id);
    });
  } catch (err) {
    console.error(err);
  }
}

//follow and unfollow

async function toggleFeedFollow(userId, btn) {
  try {
    btn.disabled = true;

    const res = await fetch(`${API}/users/${userId}/follow`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Failed");
      btn.disabled = false;
      return;
    }

    btn.innerText = data.following ? "Unfollow" : "Follow";
  } catch (err) {
    console.error(err);
    alert("Server error");
  } finally {
    btn.disabled = false;
  }
}

// OPTIONAL USER PROFILE OPEN

function openUserProfile(userId) {
  window.location.href = `profile.html?id=${userId}`;
}

// CREATE POST

async function createPost() {
  const content = document.getElementById("postInput").value.trim();

  if (!content) return alert("Write something!");

  try {
    const res = await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
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

//  LIKE POST

async function likePost(postId) {
  await fetch(`${API}/posts/${postId}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  loadPosts();
}

//  ADD COMMENT

async function addComment(postId) {
  const text = document.getElementById(`c-${postId}`).value.trim();

  if (!text) return;

  await fetch(`${API}/posts/${postId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });

  loadComments(postId);
}

//  LOAD COMMENTS

async function loadComments(postId) {
  const res = await fetch(`${API}/posts/${postId}/comments`);
  const comments = await res.json();

  const box = document.getElementById(`comments-${postId}`);
  box.innerHTML = "";

  comments.forEach((c) => {
    const p = document.createElement("p");
    p.innerText = `💬 ${c.text}`;
    box.appendChild(p);
  });
}

//  INIT

loadPosts();

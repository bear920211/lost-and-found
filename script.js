// 初始化 Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBhK6eruZ8MvzeC4K7gavQswmG1yhjc2Oo",
    authDomain: "lost-and-1702f.firebaseapp.com",
    projectId: "lost-and-1702f",
    storageBucket: "lost-and-1702f.firebasestorage.app",
    messagingSenderId: "1026381242748",
    appId: "1:1026381242748:web:4b07b6c5d98b680ab504f9",
    measurementId: "G-5RZYL5SGC0"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>

const firebaseConfig = {
  apiKey: "AIzaSyBhK6eruZ8MvzeC4K7gavQswmG1yhjc2Oo",
  authDomain: "lost-and-1702f.firebaseapp.com",
  projectId: "lost-and-1702f",
  storageBucket: "lost-and-1702f.firebasestorage.app",
  messagingSenderId: "1026381242748",
  appId: "1:1026381242748:web:4b07b6c5d98b680ab504f9"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 提交積分
document.getElementById("submitForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("playerName").value;

  const playerRef = db.collection("scores").doc(name);
  const docSnap = await playerRef.get();

  if (docSnap.exists) {
    await playerRef.update({ points: docSnap.data().points + 10 });
  } else {
    await playerRef.set({ name: name, points: 10 });
  }

  alert("積分已更新！");
});

// 顯示排行榜
async function loadLeaderboard() {
  const list = document.getElementById("leaderboard");
  if (!list) return;

  const querySnapshot = await db.collection("scores").orderBy("points", "desc").get();
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const li = document.createElement("li");
    li.textContent = `${data.name} – ${data.points} 分`;
    list.appendChild(li);
  });
}
loadLeaderboard();

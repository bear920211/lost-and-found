// Firebase 設定
const firebaseConfig = {
  apiKey: "AIzaSyBhK6eruZ8MvzeC4K7gavQswmG1yhjc2Oo",
  authDomain: "lost-and-1702f.firebaseapp.com",
  projectId: "lost-and-1702f",
  storageBucket: "lost-and-1702f.appspot.com", // ⚠️ 必須是 .appspot.com
  messagingSenderId: "1026381242748",
  appId: "1:1026381242748:web:4b07b6c5d98b680ab504f9"
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 提交積分
document.getElementById("submitForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("playerName").value.trim();
  if (!name) {
    alert("請輸入名字！");
    return;
  }

  try {
    const playerRef = db.collection("scores").doc(name);
    const docSnap = await playerRef.get();

    if (docSnap.exists) {
      await playerRef.update({ points: docSnap.data().points + 10 });
    } else {
      await playerRef.set({ name: name, points: 10 });
    }

    alert("✅ 積分已更新！");
  } catch (err) {
    alert("❌ Firebase 串接失敗: " + err.message);
  }
});

// 顯示排行榜
async function loadLeaderboard() {
  const list = document.getElementById("leaderboard");
  if (!list) return;

  list.innerHTML = ""; // 避免重複顯示

  try {
    const querySnapshot = await db.collection("scores").orderBy("points", "desc").get();
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const li = document.createElement("li");
      li.textContent = `${data.name} – ${data.points} 分`;
      list.appendChild(li);
    });
  } catch (err) {
    const li = document.createElement("li");
    li.textContent = "❌ Firebase 串接失敗: " + err.message;
    list.appendChild(li);
  }
}

// 頁面載入時執行排行榜
loadLeaderboard();

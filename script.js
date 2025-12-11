// 初始化 Firebase
const firebaseConfig = {
  apiKey: "你的API_KEY",
  authDomain: "你的專案ID.firebaseapp.com",
  projectId: "你的專案ID",
  storageBucket: "你的專案ID.appspot.com",
  messagingSenderId: "你的SenderID",
  appId: "你的AppID"
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

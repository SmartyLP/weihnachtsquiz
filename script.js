const API = "https://weihnachtsquiz-live.smarty100.workers.dev";
let player = "";
let lastQuestion = 0;

function join() {
  player = document.getElementById("name").value.trim();
  if (!player) return;
  document.getElementById("login").style.display = "none";
  document.getElementById("quiz").style.display = "block";
}

setInterval(async () => {
  const s = await fetch(API + "/status").then(r => r.json());

  if (!s.active) return;
  if (s.questionId === lastQuestion) return;

  lastQuestion = s.questionId;
  const q = questions.find(q => q.id === s.questionId);
  if (!q) return;

  document.getElementById("question").innerText = q.text;
  const opts = document.getElementById("options");
  opts.innerHTML = "";

  q.options.forEach((o, i) => {
    const b = document.createElement("button");
    b.innerText = o;
    b.onclick = () => {
      fetch(`${API}/answer?name=${player}&answer=${i}&time=${Date.now()-s.startTime}`);
    };
    opts.appendChild(b);
  });
}, 500);


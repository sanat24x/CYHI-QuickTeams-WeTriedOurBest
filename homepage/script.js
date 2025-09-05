const createProfileBtn = document.getElementById("createProfileBtn");
const profileForm = document.getElementById("profileForm");
const teamSection = document.getElementById("teamSection");
const playerForm = document.getElementById("playerForm");
const teamList = document.getElementById("teamList");

let players = [];

createProfileBtn.addEventListener("click", () => {
  profileForm.classList.remove("hidden");
});

playerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let player = {
    username: document.getElementById("username").value,
    level: parseInt(document.getElementById("level").value),
    rank: parseInt(document.getElementById("rank").value),
    interests: document.getElementById("interests").value,
    skill: document.getElementById("skill").value,
  };

  players.push(player);

  // Auto-generate a balanced team (simple demo logic)
  if (players.length >= 4) {
    makeTeam();
  }

  profileForm.classList.add("hidden");
});

function makeTeam() {
  teamList.innerHTML = "";
  teamSection.classList.remove("hidden");

  // Basic logic: pick first 4 players ensuring different skills
  let selected = [];
  let skillsAdded = new Set();

  for (let p of players) {
    if (!skillsAdded.has(p.skill)) {
      selected.push(p);
      skillsAdded.add(p.skill);
    }
    if (selected.length === 4) break;
  }

  selected.forEach((p) => {
    let card = document.createElement("div");
    card.classList.add("player-card");
    card.innerHTML = `
      <h3>${p.username}</h3>
      <p>Level: ${p.level}</p>
      <p>Rank: ${p.rank}</p>
      <p>Interest: ${p.interests}</p>
      <p>Skill: ${p.skill}</p>
    `;
    teamList.appendChild(card);
  });
}

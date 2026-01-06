let state = {
  energy: "medium",
  availableTime: 180,
  tasks: [
    {
      id: 1,
      title: "Math homework",
      subject: "Math",
      estimatedTime: 60,
      difficulty: "hard",
      deadline: "2026-01-12"
    },
    {
      id: 2,
      title: "English reading",
      subject: "English",
      estimatedTime: 40,
      difficulty: "medium",
      deadline: "2026-01-13"
    },
    {
        id: 3,
        title: "Science revision",
        subject: "Science",
        estimatedTime: 50,
        difficulty: "easy",
        deadline: "2026-01-11"
    }
  ]
};

const difficultyWeight = {
  easy: 1,
  medium: 2,
  hard: 3
};

const energyMultiplier = {
  low: 0.8,
  medium: 1,
  high: 1.2
};

function generatePlan(state) {
  let timeLeft = state.availableTime;
  let plan = [];

  let sortedTasks = [...state.tasks].sort((a, b) => {
    return new Date(a.deadline) - new Date(b.deadline);
  });

  for (let task of sortedTasks) {
    let adjustedTime =
      task.estimatedTime *
      difficultyWeight[task.difficulty] /
      energyMultiplier[state.energy];

    if (timeLeft >= adjustedTime) {
      plan.push({
        title: task.title,
        time: Math.round(adjustedTime)
      });
      timeLeft -= adjustedTime;
    }
  }

  return plan;
}

let todayPlan = generatePlan(state);
console.log(todayPlan);

let planDiv = document.getElementById("plan");

todayPlan.forEach(item => {
  let p = document.createElement("p");
  p.innerText = item.title + " - " + item.time + " min";
  planDiv.appendChild(p);
});

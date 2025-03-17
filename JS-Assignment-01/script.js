const calenderElement = document.querySelector(".calendar");

const now = new Date();
const currentMonth = now.getMonth(); // 0-indexed
const currentYear = now.getFullYear();
const daysOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
const firstDayofMonth = new Date(currentYear, currentMonth).getDay();
const moods = ["😃", "😢", "😐", "😡", "😎"];

// filling empty slots before day 1
for (let index = 0; index < firstDayofMonth; index++) {
  const emptyDiv = document.createElement("div");
  calenderElement.appendChild(emptyDiv);
}

// creating date card dynamically
for (let index = 1; index <= daysOfMonth; index++) {
  const dateCardDiv = document.createElement("div");
  dateCardDiv.classList.add("date-card");
  dateCardDiv.innerHTML = `<span class="date-number">${index}</span>
  😐</div>`;
  calenderElement.appendChild(dateCardDiv);

  dateCardDiv.addEventListener("click", changeEmoji);
}

function changeEmoji() {}

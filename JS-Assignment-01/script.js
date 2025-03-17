// Select the calendar container element
const calenderElement = document.querySelector(".calendar");

// Get the current date, month, and year
const now = new Date();
const currentMonth = now.getMonth(); // 0-indexed (0 = January, 11 = December)
const currentYear = now.getFullYear();
const daysOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Total days in the current month
const firstDayofMonth = new Date(currentYear, currentMonth).getDay(); // Day of the week for the 1st of the month

// Fill empty slots before the first day of the month
for (let index = 0; index < firstDayofMonth; index++) {
  const emptyDiv = document.createElement("div");
  calenderElement.appendChild(emptyDiv);
}

// Dynamically create date cards for each day of the month
for (date = 1; date <= daysOfMonth; date++) {
  const dateCardDiv = document.createElement("div");
  dateCardDiv.classList.add("date-card");
  dateCardDiv.innerHTML = `<span class="date-number">${date}</span>😐`; // Default emoji
  calenderElement.appendChild(dateCardDiv);

  // Add click event listener to each date card
  dateCardDiv.addEventListener("click", changeEmoji);
}

let selectedDateCard = null; // Track the currently selected date card

// Function to handle emoji picker display and emoji selection
function changeEmoji(e) {
  const clickedCard = e.target.closest(".date-card"); // Ensure the click is on a date card
  if (!clickedCard) return;

  // Prevent reopening the emoji picker for the same card
  if (clickedCard.dataset.selected === "true") return;

  selectedDateCard = clickedCard;

  // Check if the emoji picker already exists
  let emojiPickerElement = document.getElementById("emojiPicker");
  if (!emojiPickerElement) {
    // Create the emoji picker if it doesn’t exist
    emojiPickerElement = document.createElement("div");
    emojiPickerElement.id = "emojiPicker";
    emojiPickerElement.classList.add("emoji-picker");
    emojiPickerElement.style.position = "absolute"; // Position the picker absolutely

    document.body.appendChild(emojiPickerElement);
  }

  // Dynamically position the emoji picker near the clicked date card
  const posX = clickedCard.getBoundingClientRect().x + window.scrollX;
  const posY = clickedCard.getBoundingClientRect().y + window.scrollY + 30; // Offset for better visibility
  emojiPickerElement.style.top = posY + "px";
  emojiPickerElement.style.left = posX + "px";

  // Populate the emoji picker with emoji options
  emojiPickerElement.innerHTML = ` 
        <span class="emoji" data-emoji="😀">😀</span>
        <span class="emoji" data-emoji="😊">😊</span>
        <span class="emoji" data-emoji="😐">😐</span>
        <span class="emoji" data-emoji="😢">😢</span>
        <span class="emoji" data-emoji="😡">😡</span>`;

  // Handle emoji selection and update the date card
  emojiPickerElement.addEventListener("click", function (e) {
    selectedDateCard.setAttribute("data-selected", "false"); // Reset previous selection
    const selectedEmoji = e.target.dataset.emoji; // Get the selected emoji

    let date = selectedDateCard
      .querySelector(".date-number")
      .textContent.trim(); // Extract the date number

    //saving to local storage
    let moodData = JSON.parse(localStorage.getItem("moodTracker")) || {};
    moodData[date] = selectedEmoji;
    localStorage.setItem("moodTracker", JSON.stringify(moodData));

    // Update the date card with the selected emoji
    selectedDateCard.innerHTML = `<span class="date-number">${date}</span>${selectedEmoji}`;
    selectedDateCard.dataset.selected = "true"; // Mark the card as selected
    if (selectedEmoji != undefined) {
      emojiPickerElement.remove(); // Remove the picker after selection
    }
  });
}

// Close the emoji picker when clicking outside of it
document.addEventListener("click", (e) => {
  const emojiPickerElement = document.getElementById("emojiPicker");

  // If the picker exists and the click is outside, remove it
  if (
    emojiPickerElement &&
    !emojiPickerElement.contains(e.target) &&
    !e.target.classList.contains("date-card")
  ) {
    emojiPickerElement.remove();
  }
});

function loadMoods() {
  let moodData = JSON.parse(localStorage.getItem("moodTracker")) || {};

  document.querySelectorAll(".date-card").forEach((card) => {
    let date = card.querySelector(".date-number").textContent.trim();
    if (moodData[date]) {
      card.innerHTML = `<span class="date-number">${date}</span> ${moodData[date]}`;
      card.dataset.selected = "true";
    }
  });
}

// load from local storage
loadMoods();

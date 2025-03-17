# Mood Tracker Calendar

This project is a **Mood Tracker Calendar** implemented in JavaScript. It allows users to select a mood for each day of the current month using an emoji picker. The selected moods are saved in the browser's local storage and persist across page reloads.

## Features

- **Emoji Picker**: Allows users to select an emoji to represent their mood for each day.
- **Local Storage Integration**: Saves the selected moods to local storage for persistence.
- **Mood Loading**: Loads previously saved moods from local storage when the page is reloaded.

## How to Use

1. Open the project in a browser.
2. The calendar for the month March will be displayed.
3. Click on a date to open the emoji picker.
4. Select an emoji to represent your mood for that day.
5. The selected emoji will be saved and displayed on the calendar.
6. Reload the page to see your saved moods.

## Project Structure

- **`script.js`**: Contains the JavaScript logic for generating the calendar, handling emoji selection, and managing local storage.
- **`index.html`**: The HTML file that includes the calendar container and links to the JavaScript file.
- **`styles.css`** (if applicable): Contains the styles for the calendar and emoji picker.

## Local Storage Format

The moods are stored in the browser's local storage in the following format:

```json
{
  "1": "😀",
  "2": "😢",
  "3": "😊",
  ...
}
```

Each key represents a date, and the value is the emoji selected for that date.


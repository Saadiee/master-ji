const quoteDivElement = document.querySelector(".quote-div");
const quoteTextElement = document.querySelector(".quote-text");
const authorTextElement = document.querySelector(".author");
const copyBtn = document.querySelector(".copy-btn");
const newQuoteBtn = document.querySelector(".new-quote");
const twitterShareBtn = document.querySelector(".twitter-share");

const url = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
const options = { method: "GET", headers: { accept: "application/json" } };

// fetch and display quote
async function displayQuote() {
  try {
    const response = await fetch(url, options);
    const result = await response.json();

    // set quote and author
    quoteTextElement.textContent = result.data.content;
    authorTextElement.textContent = "-" + result.data.author;

    // Twitter share button functionality
    twitterShareBtn.href = `http://twitter.com/share?text=${quoteTextElement.textContent}&url=http://localhost:3000&hashtags=quote,dailyquote`;
  } catch (error) {
    console.error(error);
  }
}

// fetch random quote on click
newQuoteBtn.addEventListener("click", displayQuote);

// copy quote text
copyBtn.addEventListener("click", function () {
  const copyText = quoteTextElement;

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.textContent);

  // Alert the copied text
  alert("Copied the text: " + copyText.textContent);
});

// Display random quote on document reload
displayQuote();

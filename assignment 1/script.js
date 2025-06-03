// --- List of word options for each part of the story ---
// Each inner array represents a category (subject, verb, adjective, noun, location)
const wordCategories = [
  ["The turkey", "Mom", "Dad", "The dog", "My teacher", "The elephant", "The cat"], // Subjects
  ["sat on", "danced with", "saw", "doesn't like", "kissed"], // Verbs
  ["a funny", "a scary", "a goofy", "a slimy", "a barking", "a fat"], // Adjectives
  ["goat", "monkey", "cow", "frog", "bug", "worm"], // Nouns
  ["on the moon", "on the chair", "in my spaghetti", "in my soup", "on the grass", "in my shoes"] // Locations
];

// --- Array to hold the current story parts chosen by the user ---
let currentStory = ["", "", "", "", ""];

/**
 * Function to generate a random phrase for a specific part of the story
 * @param {number} index - which part (0–4) to generate
 */
function generatePart(index) {
  const options = wordCategories[index]; // Get the list of options for this category
  const choice = options[Math.floor(Math.random() * options.length)]; // Pick a random item
  currentStory[index] = choice; // Store it in the story array
  updateStory(); // Update the displayed story
}

/**
 * Function to update the story on the webpage
 * Joins all non-empty parts into one sentence
 */
function updateStory() {
  const storyText = currentStory.filter(Boolean).join(" "); // Filter out empty parts and join
  document.getElementById("story-output").innerText = storyText || "Click a number to start your story!"; // Show default if empty
}

/**
 * Function to read the story out loud using the browser's speech synthesis
 */
function speakStory() {
  const storyText = currentStory.join(" "); // Combine story parts
  if (storyText.trim() !== "") {
    const msg = new SpeechSynthesisUtterance(storyText); // Create a speech object
    window.speechSynthesis.speak(msg); // Make the browser speak the story
  }
}

/**
 * Function to generate a complete story by selecting one phrase from each category
 */
function generateFullStory() {
  for (let i = 0; i < wordCategories.length; i++) {
    const options = wordCategories[i]; // Options for each part
    const choice = options[Math.floor(Math.random() * options.length)]; // Random choice
    currentStory[i] = choice; // Update story part
  }
  updateStory(); // Display the full story
}

/**
 * Function to clear the story and reset everything
 */
function resetStory() {
  currentStory = ["", "", "", "", ""]; // Clear all parts
  updateStory(); // Reset the display
}

// --- Automatically generate a new story every 10 seconds ---
setInterval(generateFullStory, 10000);

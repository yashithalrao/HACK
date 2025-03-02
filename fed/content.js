
// console.log("Web Accessibility Enhancer content script loaded!");
// document.body.style.border = "5px solid red";

// // here we will be adding the code for the following funct:  front end part 
// //1. spacing : a. spaceing between lines b. spacing between words c. spacing between letters
// //2. font size adjustment
// //3. font style
// //4. font color, background color


// //backend part 
// // simplifying complex ideas 
// // summarizing 
// // highlighting important points
// //better visualization 
// //easier reading flow 
// // none 

// Function to apply spacing adjustments
function applySpacingAdjustments(settings) {
    document.body.style.lineHeight = settings.lineSpacing ? settings.lineSpacing + '%' : 'normal';
    document.body.style.letterSpacing = settings.letterSpacing ? settings.letterSpacing + 'px' : 'normal';
    document.body.style.wordSpacing = settings.wordSpacing ? settings.wordSpacing + 'px' : 'normal';
}

// Function to apply theme
function applyTheme(theme) {
    switch (theme) {
        case 'creamPaper':
            document.body.style.backgroundColor = '#f5deb3';
            document.body.style.color = '#000';
            break;
        case 'darkMode':
            document.body.style.backgroundColor = '#1e1e1e';
            document.body.style.color = '#ffffff';
            break;
        case 'sepia':
            document.body.style.backgroundColor = '#704214';
            document.body.style.color = '#f5f5dc';
            break;
        default:
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
    }
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'applySpacing') {
        applySpacingAdjustments(message);
    } else if (message.action === 'applyTheme') {
        applyTheme(message.theme);
    }
});

// Load saved settings on page load
chrome.storage.sync.get(['lineSpacing', 'letterSpacing', 'wordSpacing', 'selectedTheme'], function(result) {
    applySpacingAdjustments(result);
    applyTheme(result.selectedTheme || 'default');
});


// function modifyPageWithAItwo(mode) {
//     fetch("http://127.0.0.1:5000/process", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: document.body.innerText, mode }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         let newContent = document.createElement("div");
//         newContent.innerHTML = data.modified_text;
//         newContent.style.fontSize = "18px";
//         newContent.style.lineHeight = "1.5";
//         newContent.style.padding = "20px";
//         document.body.innerHTML = "";
//         document.body.appendChild(newContent);
//     })
//     .catch(error => console.error("Error:", error));
// }


// function modifyPageWithAI(mode) {
//     const paragraphs = document.querySelectorAll("p"); // Select only <p> elements
//     const originalTexts = Array.from(paragraphs).map(p => p.innerText); // Extract their text

//     fetch("http://127.0.0.1:5000/process", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: originalTexts.join("\n\n"), mode }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.modified_text) {
//             const simplifiedTexts = data.modified_text.split("\n\n"); // Split AI response into paragraphs

//             paragraphs.forEach((p, index) => {
//                 if (simplifiedTexts[index]) {
//                     p.innerText = simplifiedTexts[index]; // Replace <p> content only
//                 }
//             });
//         } else {
//             console.error("AI processing failed.");
//         }
//     })
//     .catch(err => console.error("Error:", err));
// }

//1st 

function modifyPageWithAI(mode) {
    const paragraphs = document.querySelectorAll("p"); 
    if (paragraphs.length === 0) {
        console.warn("No <p> elements found. Skipping modification.");
        return;
    }

    const originalTexts = Array.from(paragraphs).map(p => p.innerText);

    fetch("http://127.0.0.1:5000/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: originalTexts.join("\n\n"), mode }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.modified_text) {
            const simplifiedTexts = data.modified_text.split("\n\n");

            paragraphs.forEach((p, index) => {
                if (simplifiedTexts[index]) {
                    let cleanText = simplifiedTexts[index];

                    // Remove leading and trailing ** if they exist
                    if (cleanText.startsWith("**") && cleanText.endsWith("**")) {
                        cleanText = cleanText.substring(2, cleanText.length - 2).trim();
                    }

                    p.innerText = cleanText;
                }
            });
        } else {
            console.error("AI processing failed.");
        }
    })
    .catch(err => console.error("Error:", err));
}






//2nd 
// function improveReadingFlow() {
//     const wordToEmoji = {
//         "music": "\uD83C\uDFB5",  // 🎵
//         "sound": "\uD83D\uDD0A", // 🔊
//         "melody": "\uD83C\uDFB6", // 🎶
//         "rhythm": "\uD83E\uDD41", // 🥁
//         "boy": "\uD83D\uDC66", // 👦
//         "girl": "\uD83D\uDC67", // 👧
//         "happy": "\uD83D\uDE0A", // 😊
//         "sad": "\uD83D\uDE22", // 😢
//         "smart": "\uD83E\uDDE0", // 🧠
//         "love": "\u2764\uFE0F", // ❤️
//         "strong": "\uD83D\uDCAA", // 💪
//         "book": "\uD83D\uDCD6", // 📖
//         "food": "\uD83C\uDF55"  // 🍕
//     };

//     document.querySelectorAll("p").forEach(p => {
//         let words = p.innerHTML.split(/(\s+)/); // Preserve spaces while splitting
        
//         words = words.map(word => {
//             let cleanWord = word.toLowerCase().replace(/[^a-z]/gi, ""); // Remove punctuation for matching
//             return wordToEmoji[cleanWord] ? `${wordToEmoji[cleanWord]} ${word}` : word; // Append emoji before word
//         });

//         p.innerHTML = words.join(""); // Join words back, keeping spaces
//     });
// }


// function applyReadingFlow() {
//     console.log("✅ Injecting emoji script into the webpage...");

//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         if (tabs.length === 0) {
//             console.log("❌ No active tab found.");
//             return;
//         }

//         chrome.scripting.executeScript({
//             target: { tabId: tabs[0].id },
//             func: () => {
//                 console.log("🔥 Emoji script is running inside the page!");

//                 const wordToEmoji = {
//                     "music": "🎵",
//                     "sound": "🔊",
//                     "melody": "🎶",
//                     "rhythm": "🥁",
//                     "boy": "👦",
//                     "girl": "👧",
//                     "happy": "😊",
//                     "sad": "😢",
//                     "smart": "🧠",
//                     "love": "❤️",
//                     "strong": "💪",
//                     "book": "📖",
//                     "food": "🍕"
//                 };

//                 document.querySelectorAll("p").forEach(p => {
//                     console.log(`📝 Original paragraph: ${p.innerHTML}`);

//                     Object.keys(wordToEmoji).forEach(word => {
//                         let regex = new RegExp(`\\b${word}\\b`, "gi");

//                         // Check if the word exists in the text
//                         if (regex.test(p.innerHTML)) {
//                             console.log(`✅ Found word: "${word}" → Replacing with emoji: "${wordToEmoji[word]}"`);
//                         }

//                         // Replace the word with an emoji
//                         p.innerHTML = p.innerHTML.replace(regex, match => {
//                             return `<span style="font-size: 1.2em;">${wordToEmoji[word]}</span> ${match}`;
//                         });
//                     });

//                     console.log(`🔄 Updated paragraph: ${p.innerHTML}`);
//                 });

//                 console.log("✅ Emoji replacement completed!");
//             }
//         });
//     });
// }


function replaceEmojis() {
    console.log("🔥 Running emoji replacement inside the webpage...");

    const wordToEmoji = {
        "music": "🎵",
        "sound": "🔊",
        "melody": "🎶",
        "rhythm": "🥁",
        "boy": "👦",
        "girl": "👧",
        "happy": "😊",
        "sad": "😢",
        "smart": "🧠",
        "love": "❤️",
        "strong": "💪",
        "book": "📖",
        "food": "🍕"
    };

    // ✅ Inject emoji font fix
    const style = document.createElement("style");
    style.innerHTML = `
        .emoji {
            font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Twemoji", sans-serif;
            font-size: 1.2em;
        }
    `;
    document.head.appendChild(style);

    document.querySelectorAll("p").forEach(p => {
        let originalText = p.innerHTML;
        console.log(`📝 Original paragraph: ${originalText}`);

        Object.keys(wordToEmoji).forEach(word => {
            let regex = new RegExp(`\\b${word}\\b`, "gi");

            if (regex.test(p.innerHTML)) {
                console.log(`✅ Found word: "${word}" → Replacing with emoji: "${wordToEmoji[word]}"`);
            }

            // 🚀 Remove broken `ðŸŽµ` characters
            p.innerHTML = p.innerHTML.replace(/ðŸŽµ/g, "");  

            // 🚀 Instead of direct replacement, wrap in <span> to force rendering
            p.innerHTML = p.innerHTML.replace(regex, match => {
                return `<span class="emoji">${wordToEmoji[word]}</span> ${match}`;
            });
        });

        console.log(`🔄 Updated paragraph: ${p.innerHTML}`);
    });

    console.log("✅ Emoji replacement completed inside content.js!");
}





//3rd 


function modifyPageWithAItwo(mode) {
    fetch("http://127.0.0.1:5000/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: document.body.innerText, mode }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.modified_text) {
            let cleanText = data.modified_text;

            // Remove leading and trailing ** if they exist
            if (cleanText.startsWith("**") && cleanText.endsWith("**")) {
                cleanText = cleanText.substring(2, cleanText.length - 2).trim();
            }

            document.body.innerText = cleanText;
        } else {
            console.error("AI processing failed.");
        }
    })
    .catch(error => console.error("Error:", error));
}






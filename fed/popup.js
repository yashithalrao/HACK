

//this is for eye icon
const guide = document.querySelector(".guide_real");
const eye = document.querySelector(".eye");
const info = document.querySelector(".infolala");

eye.addEventListener("click", () => {
    guide.style.display = guide.style.display === "block" ? "none" : "block";
    info.style.display = info.style.display === "none" ? "block" : "none";
});

if (!localStorage.getItem("welcome_shown")) {
    alert("Hello, welcome!");
    localStorage.setItem("welcome_shown", "true");
}


//ai 
// AI Feature Buttons
// Get dropdown element
const optimizeSelector = document.getElementById("optimize_selector");

// AI Feature Buttons
const simplifyBtn = document.querySelector("#simplify_complex");
const summarizeBtn = document.querySelector("#summarize");

// ✅ Function to Send AI Request
function sendAIRequest(mode) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return;

        if (mode === "summarize") {
            console.log("📄 Sending request to AI for summarization...");
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: modifyPageWithAItwo,
                args: [mode],
            });
        } else if (mode === "complex_ideas") {
            console.log("🧠 Sending request to AI for simplification...");
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: modifyPageWithAI,
                args: [mode],
            });
        }
    });
}

// ✅ Function for "Easier Reading Flow" (No AI Call, Just JS)
// function applyReadingFlow() {
//     console.log("✅ 'Easier Reading Flow' selected! Running function...");

//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         if (tabs.length === 0) {
//             console.log("❌ No active tab found.");
//             return;
//         }

//         chrome.scripting.executeScript({
//             target: { tabId: tabs[0].id },
//             func: () => {
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

//                 function processNode(node) {
//                     if (node.nodeType === Node.TEXT_NODE) {
//                         Object.keys(wordToEmoji).forEach(word => {
//                             let regex = new RegExp(`\\b${word}\\b`, "gi");
//                             node.nodeValue = node.nodeValue.replace(regex, wordToEmoji[word] + " " + word);
//                         });
//                     } else if (node.nodeType === Node.ELEMENT_NODE) {
//                         node.childNodes.forEach(processNode);
//                     }
//                 }

//                 document.querySelectorAll("p").forEach(p => {
//                     processNode(p);
//                 });

//                 console.log("✅ Emoji replacement completed!");
//             }
//         });
//     });
// }

function applyReadingFlow() {
    console.log("✅ Injecting emoji script into the webpage...");

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
            console.log("❌ No active tab found.");
            return;
        }

        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => {
                console.log("🔥 Emoji script is running inside the page!");

                const wordToEmoji = {
                    // 🎭 Emotions & Expressions
                    "happy": "\uD83D\uDE0A",
                    "sad": "\uD83D\uDE22",
                    "angry": "\uD83D\uDE21",
                    "love": "\u2764\uFE0F",
                    "excited": "\uD83E\uDD29",
                    "shocked": "\uD83D\uDE32",
                    "surprised": "\uD83D\uDE2E",
                    "laughing": "\uD83D\uDE02",
                    "crying": "\uD83D\uDE2D",
                    "bored": "\uD83D\uDE11",
                    "thinking": "\uD83E\uDD14",
                    "sleepy": "\uD83D\uDE34",
                    "tired": "\uD83D\uDE2B",
                    "worried": "\uD83D\uDE1F",
                    "confused": "\uD83D\uDE15",
                    "embarrassed": "\uD83E\uDEE5",
                    "cool": "\uD83D\uDE0E",
                    "grateful": "\uD83E\uDD17",
                    "relieved": "\uD83D\uDE0C",
                    "fear": "\uD83D\uDE31",
                    "disgusted": "\uD83E\uDEE4",
                    "proud": "\uD83D\uDE0F",
                    "nervous": "\uD83E\uDD28",
                
                    // 🔥 Common Words
                    "yes": "\u2705",
                    "no": "\u274C",
                    "ok": "\u1F197",
                    "hello": "\uD83D\uDC4B",
                    "goodbye": "\uD83D\uDC4B",
                
                    // 🎶 Music & Sound
                    "music": "\uD83C\uDFB5",
                    "sound": "\uD83D\uDD0A",
                    "melody": "\uD83C\uDFB6",
                    "rhythm": "\uD83E\uDE87",
                
                    // 👥 People
                    "boy": "\uD83D\uDC66",
                    "girl": "\uD83D\uDC67",
                    "man": "\uD83D\uDC68",
                    "woman": "\uD83D\uDC69",
                
                    // 💪 Strength & Intelligence
                    "smart": "\uD83E\uDDE0",
                    "strong": "\uD83D\uDCAA",
                
                    // 📖 Learning & Books
                    "book": "\uD83D\uDCDA",
                    "reading": "\uD83D\uDCDA",
                    "writing": "\u270D\uFE0F",
                    "teacher": "\uD83D\uDC68\u200D\uD83C\uDFEB",
                    "student": "\uD83E\uDDD1\u200D\uD83C\uDF93",
                    "school": "\uD83C\uDFEB",
                
                    // 🍽️ Food & Drink
                    "food": "\uD83C\uDF55",
                    "drink": "\uD83C\uDF7A",
                    "coffee": "\u2615",
                    "tea": "\uD83C\uDF75",
                    "cake": "\uD83C\uDF82",
                    "chocolate": "\uD83C\uDF6B",
                    "fruit": "\uD83C\uDF4E",
                    "vegetable": "\uD83C\uDF45",
                
                    // 🚗 Transportation
                    "car": "\uD83D\uDE97",
                    "bike": "\uD83D\uDEB2",
                    "bus": "\uD83D\uDE8C",
                    "train": "\uD83D\uDE82",
                    "airplane": "\u2708\uFE0F",
                    "rocket": "\uD83D\uDE80",
                
                    // 🌎 Nature & Weather
                    "earth": "\uD83C\uDF0D",
                    "moon": "\uD83C\uDF19",
                    "star": "\u2B50",
                    "fire": "\uD83D\uDD25",
                    "water": "\uD83D\uDCA7",
                    "sun": "\u2600\uFE0F",
                    "rain": "\uD83C\uDF27\uFE0F",
                    "snow": "\u2744\uFE0F",
                    "thunder": "\u26A1",
                    "tree": "\uD83C\uDF33",
                    "flower": "\uD83C\uDF3C",
                
                    // 💻 Technology
                    "computer": "\uD83D\uDCBB",
                    "laptop": "\uD83D\uDDA5\uFE0F",
                    "phone": "\uD83D\uDCF1",
                    "robot": "\uD83E\uDD16",
                
                    // 💰 Money & Business
                    "money": "\uD83D\uDCB0",
                    "dollar": "\uD83D\uDCB5",
                    "bank": "\uD83C\uDFE6",
                    "shopping": "\uD83D\uDED2",
                    "gift": "\uD83C\uDF81",
                
                    // 🏆 Sports & Games
                    "medal": "\uD83C\uDFC5",
                    "trophy": "\uD83C\uDFC6",
                    "football": "\u26BD",
                    "basketball": "\uD83C\uDFC0",
                    "tennis": "\uD83C\uDFBE",
                    "cricket": "\uD83C\uDFCF",
                    "pingpong": "\uD83C\uDFD3",
                    "running": "\uD83C\uDFC3",
                    "swimming": "\uD83C\uDFCA",
                    "cycling": "\uD83D\uDEB4",
                
                    // 🎨 Arts & Entertainment
                    "painting": "\uD83C\uDFA8",
                    "singing": "\uD83C\uDFA4",
                    "camera": "\uD83D\uDCF8",
                    "video": "\uD83C\uDFA5",
                    "movie": "\uD83C\uDFAC",
                
                    // ✋ Gestures
                    "clap": "\uD83D\uDC4F",
                    "thumbs up": "\uD83D\uDC4D",
                    "thumbs down": "\uD83D\uDC4E",
                    "handshake": "\uD83E\uDD1D",
                    "prayer": "\uD83D\uDE4F",
                
                    // 🎉 Events & Celebrations
                    "party": "\uD83C\uDF89",
                    "celebration": "\uD83C\uDF8A",
                
                    // 🏢 Places
                    "hospital": "\uD83C\uDFE5",
                    "city": "\uD83C\uDFD9\uFE0F",
                    "village": "\uD83C\uDFE1",
                    "house": "\uD83C\uDFE0",
                    "apartment": "\uD83C\uDFE2",
                
                    // 🏢 Professions
                    "doctor": "\uD83D\uDC68\u200D\u2695\uFE0F",
                    "nurse": "\uD83E\uDDD1\u200D\u2695\uFE0F",
                    "police": "\uD83D\uDC6E",
                    "firefighter": "\uD83E\uDDD1\u200D\uD83D\uDE92",
                    "artist": "\uD83E\uDDD1\u200D\uD83C\uDFA8",
                    "engineer": "\uD83E\uDDD1\u200D\uD83D\uDD27",
                    "scientist": "\uD83E\uDDD1\u200D\uD83D\uDD2C",
                    "programmer": "\uD83E\uDDD1\u200D\uD83D\uDCBB",
                    "chef": "\uD83E\uDDD1\u200D\uD83C\uDF73",
                    "pilot": "\uD83E\uDDD1\u200D✈\uFE0F",
                    "farmer": "\uD83E\uDDD1\u200D\uD83C\uDF3E",
                    "construction": "\uD83C\uDFD7\uFE0F",
                    "writer": "\u270D\uFE0F",
                    "teacher": "\uD83D\uDC68\u200D\uD83C\uDFEB",
                    "student": "\uD83E\uDDD1\u200D\uD83C\uDF93",
                    "test": "\uD83D\uDCDD",       // 📝
    "exam": "\uD83D\uDCD3",      // 📓
    "quiz": "\uD83D\uDCD7",      // 📗
    "score": "\uD83C\uDFC6",     // 🏆
    "grade": "\uD83D\uDCC8",     // 📈
    "pass": "\u2705",           // ✅
    "fail": "\u274C",           // ❌
    "student": "\uD83C\uDF93",   // 🎓
    "teacher": "\uD83D\uDC68\u200D\uD83C\uDFEB", // 👨‍🏫
    "certificate": "\uD83C\uDF93", // 🎓 (Alternative)
    "writing": "\u270D\uFE0F",   // ✍️
    "study": "\uD83D\uDCDA",     // 📚
    "pencil": "\uD83D\uDCDD",    // 📝
    "paper": "\uD83D\uDCC4",     // 📄
    "result": "\uD83D\uDCCA",     // 📊
                "idea": "\uD83D\uDCA1",         // 💡
    "important": "\u2757",        // ❗
    "question": "\u2753",        // ❓
    "answer": "\u2705",         // ✅
    "writing": "\u270D\uFE0F",    // ✍️
    "book": "\uD83D\uDCD6",       // 📖
    "read": "\uD83D\uDCDA",       // 📚
    "study": "\uD83D\uDCDA",      // 📚
    "knowledge": "\uD83E\uDDE0",  // 🧠
    "science": "\uD83D\uDD2C",    // 🔬
    "technology": "\uD83D\uDCBB", // 💻
    "internet": "\uD83C\uDF10",   // 🌐
    "world": "\uD83C\uDF0D",      // 🌍
    "news": "\uD83D\uDCF0",       // 📰
    "information": "\u2139",      // ℹ️
    "growth": "\uD83C\uDF31",     // 🌱
    "success": "\uD83C\uDFC6",    // 🏆
    "money": "\uD83D\uDCB0",      // 💰
    "business": "\uD83D\uDCBC",   // 💼
    "goal": "\uD83C\uDFAF",       // 🎯
    "health": "\uD83C\uDF3F",     // 🌿
    "doctor": "\uD83C\uDFE5",     // 🏥
    "medicine": "\uD83C\uDF7C",   // 🍼
    "food": "\uD83C\uDF54",       // 🍔
    "drink": "\uD83C\uDF7A",      // 🍺
    "water": "\uD83D\uDCA7",      // 💧
    "weather": "\u2600\uFE0F",    // ☀️
    "rain": "\uD83C\uDF27",       // 🌧️
    "fire": "\uD83D\uDD25",       // 🔥
    "love": "\u2764\uFE0F",       // ❤️
    "friend": "\uD83D\uDC68\u200D\uD83D\uDC68\u200D\uD83D\uDC68", // 👨‍👨‍👦
    "family": "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC66", // 👨‍👩‍👦
    "smile": "\uD83D\uDE0A",      // 😊
    "sad": "\uD83D\uDE22",        // 😢
    "angry": "\uD83D\uDE21",      // 😡
    "celebrate": "\uD83C\uDF89",  // 🎉
    "music": "\uD83C\uDFB5",      // 🎵
    "art": "\uD83C\uDFA8",        // 🎨
    "movie": "\uD83C\uDFAC",      // 🎬
    "phone": "\uD83D\uDCF1",      // 📱
    "email": "\uD83D\uDCE7",      // 📧
    "message": "\uD83D\uDCAC",    // 💬
    "social": "\uD83D\uDC65",     // 👥
    "travel": "\u2708\uFE0F",     // ✈️
    "car": "\uD83D\uDE97",        // 🚗
    "home": "\uD83C\uDFE0",       // 🏠
    "time": "\u23F0",            // ⏰
    "future": "\uD83C\uDF0C",     // 🌌
    "past": "\uD83D\uDCC5",       // 📅
    "present": "\uD83C\uDF81",  
    "science": "\uD83D\uDD2C",    // 🔬
    "technology": "\uD83D\uDCBB", // 💻
    "internet": "\uD83C\uDF10",   // 🌐
    "world": "\uD83C\uDF0D",      // 🌍
    "news": "\uD83D\uDCF0",       // 📰
    "information": "\u2139",      // ℹ️
    "growth": "\uD83C\uDF31",     // 🌱
    "success": "\uD83C\uDFC6",    // 🏆
    "money": "\uD83D\uDCB0",      // 💰
    "business": "\uD83D\uDCBC",   // 💼
    "goal": "\uD83C\uDFAF",       // 🎯

    "book": "\uD83D\uDCD6",       // 📖
    "read": "\uD83D\uDCDA",       // 📚
    "study": "\uD83D\uDCDA",      // 📚
    "knowledge": "\uD83E\uDDE0",  // 🧠
    "brain": "\uD83E\uDDE0",      // 🧠
    "thinking": "\uD83E\uDD14",   // 🤔
    "logic": "\u269B",           // ⚛
                    // 🐾 Animals
                    "dog": "\uD83D\uDC36",
                    "cat": "\uD83D\uDC31",
                    "lion": "\uD83E\uDD81",
                    "tiger": "\uD83D\uDC2F",
                    "elephant": "\uD83D\uDC18",
                    "horse": "\uD83D\uDC34",
                    "fish": "\uD83D\uDC1F",
                    "whale": "\uD83D\uDC0B",
                    "bird": "\uD83D\uDC26",
                    "butterfly": "\uD83E\uDD8B",
                    "spider": "\uD83D\uDD77",
                    "snake": "\uD83D\uDC0D",
                    "bug": "\uD83D\uDC1B"
                };
                
                
                document.querySelectorAll("p").forEach(p => {
                    console.log(`📝 Original paragraph: ${p.innerHTML}`);

                    Object.keys(wordToEmoji).forEach(word => {
                        let regex = new RegExp(`\\b${word}\\b`, "gi");

                        // Check if the word exists in the text
                        if (regex.test(p.innerHTML)) {
                            console.log(`✅ Found word: "${word}" → Replacing with emoji: "${wordToEmoji[word]}"`);
                        }

                        // Replace the word with an emoji
                        p.innerHTML = p.innerHTML.replace(regex, match => {
                            return `<span style="font-size: 1.2em;">${wordToEmoji[word]}</span> ${match}`;
                        });
                    });

                    console.log(`🔄 Updated paragraph: ${p.innerHTML}`);
                });

                console.log("✅ Emoji replacement completed!");
            }
        });
    });
}


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

//                 // ✅ Force proper emoji font
//                 const style = document.createElement("style");
//                 style.innerHTML = `
//                     .emoji {
//                         font-family: "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Twemoji", sans-serif;
//                         font-size: 1.2em;
//                     }
//                 `;
//                 document.head.appendChild(style);

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

//                         if (regex.test(p.innerHTML)) {
//                             console.log(`✅ Found word: "${word}" → Replacing with emoji: "${wordToEmoji[word]}"`);
//                         }

//                         p.innerHTML = p.innerHTML.replace(regex, match => {
//                             return `<span class="emoji">${wordToEmoji[word]}</span> ${match}`;
//                         });
//                     });

//                     console.log(`🔄 Updated paragraph: ${p.innerHTML}`);
//                 });

//                 console.log("✅ Emoji replacement completed!");
//             }
//         });
//     });
// }



// ✅ Event Listener for Dropdown Selection
if (optimizeSelector) {
    optimizeSelector.addEventListener("change", (event) => {
        let mode = event.target.value;
        console.log(`🟢 Selected mode: ${mode}`);

        if (mode === "reading_flow") {
            applyReadingFlow();  // 🟢 Apply emojis without AI
        } else if (mode === "complex_ideas" || mode === "summarize") {
            sendAIRequest(mode); // 🟢 Send AI request
        } else {
            console.log("ℹ️ 'None' selected, no action taken.");
        }
    });
}

// ✅ Function to Summarize the Whole Page (AI Request)
function modifyPageWithAItwo(mode) {
    const text = document.body.innerText;
    fetch("http://127.0.0.1:5000/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, mode }),
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.modified_text) {
            document.body.innerHTML = `<div style="font-size:18px; padding:20px;">${data.modified_text}</div>`;
        } else {
            alert("AI processing failed.");
        }
    })
    .catch((err) => console.error("Error:", err));
}

// ✅ Function to Simplify Only <p> Tags (AI Request)
function modifyPageWithAI(mode) {
    const paragraphs = document.querySelectorAll("p");
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
                    p.innerText = simplifiedTexts[index];
                }
            });
        } else {
            alert("AI processing failed.");
        }
    })
    .catch(err => console.error("Error:", err));
}



// Normal Popup Features
document.addEventListener("DOMContentLoaded", function () {
    console.log("Popup script loaded!");

    const testButton = document.getElementById("testButton");
    const fontSizeSlider = document.getElementById("font_size_slider");
    const fontStyleSelector = document.getElementById("font_style_selector");
    const themeSelector = document.getElementById("theme_selector");
    const lineSpacingSlider = document.getElementById("line_spacing_slider");
    const letterSpacingSlider = document.getElementById("letter_spacing_slider");
    const backgroundColorPicker = document.getElementById("background_color_picker");
    const textColorPicker = document.getElementById("text_color_picker");

    // Button to confirm extension works
    if (testButton) {
        testButton.addEventListener("click", () => {
            alert("Extension is working!");
        });
    }

    function updateContentStyle(setting, value) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) return;
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: (setting, value) => {
                    document.querySelectorAll("*").forEach((el) => {
                        el.style[setting] = value;
                    });
                },
                args: [setting, value],
            });
        });
    }

    // Font Size Change
    if (fontSizeSlider) {
        fontSizeSlider.addEventListener("input", () => {
            updateContentStyle("fontSize", fontSizeSlider.value + "px");
        });
    }

    // Font Style Change
    if (fontStyleSelector) {
        fontStyleSelector.addEventListener("change", () => {
            const fontMap = {
                open_dyslexia: "'OpenDyslexic', sans-serif",
                lexie_readable: "'Lexie Readable', sans-serif",
                monospace: "monospace",
            };
            updateContentStyle("fontFamily", fontMap[fontStyleSelector.value] || "inherit");
        });
    }

    // Theme Change
    if (themeSelector) {
        themeSelector.addEventListener("change", () => {
            const themeMap = {
                creamPaper: { bg: "#FAF3DD", color: "#333" },
                default: { bg: "#FFFFFF", color: "#000" },
                darkMode: { bg: "#121212", color: "#E0E0E0" },
                sepia: { bg: "#704214", color: "#F5DEB3" },
            };
            const theme = themeMap[themeSelector.value] || themeMap.default;
            updateContentStyle("backgroundColor", theme.bg);
            updateContentStyle("color", theme.color);
        });
    }

    // Line Spacing Change
    if (lineSpacingSlider) {
        lineSpacingSlider.addEventListener("input", () => {
            updateContentStyle("lineHeight", (lineSpacingSlider.value / 10) + "em");
        });
    }

    // Letter Spacing Change
    if (letterSpacingSlider) {
        letterSpacingSlider.addEventListener("input", () => {
            updateContentStyle("letterSpacing", letterSpacingSlider.value + "px");
        });
    }

    // Background Color Change
    if (backgroundColorPicker) {
        backgroundColorPicker.addEventListener("input", () => {
            updateContentStyle("backgroundColor", backgroundColorPicker.value);
        });
    }

    // Text Color Change
    if (textColorPicker) {
        textColorPicker.addEventListener("input", () => {
            updateContentStyle("color", textColorPicker.value);
        });
    }
});
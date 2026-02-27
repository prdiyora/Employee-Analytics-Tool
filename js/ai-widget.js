// Toggle chat open/close
function toggleAI() {
    document.getElementById("aiChat").classList.toggle("hidden");
}

// Send question
async function sendQuestion(questionText = null) {

    const input = document.getElementById("userQuestion");
    const chatBox = document.getElementById("chatBox");

    const question = questionText || input.value.trim();
    if (!question) return;

    chatBox.innerHTML += `
        <div class="user-bubble">${question}</div>
    `;

    input.value = "";

    const response = await fetch("http://localhost:5000/api/employees/ai/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
    });

    const data = await response.json();

    chatBox.innerHTML += `
        <div class="bot-bubble">${data.answer}</div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;
}

// Predefined question auto-send
function askPredefined(text) {
    sendQuestion(text);
}
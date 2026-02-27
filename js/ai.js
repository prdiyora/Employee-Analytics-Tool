async function sendQuestion(questionText = null) {

    const input = document.getElementById("userQuestion");
    const chatBox = document.getElementById("chatBox");

    const question = questionText || input.value.trim();
    if (!question) return;

    // Add user bubble
    chatBox.innerHTML += `
        <div class="user-bubble">
            ${question}
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear input
    input.value = "";

    // Fetch AI response
    const response = await fetch("http://localhost:5000/api/employees/ai/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
    });

    const data = await response.json();

    // Add bot bubble
    chatBox.innerHTML += `
        <div class="bot-bubble">
            ${data.answer}
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;
}

// Predefined question click
function askPredefined(text) {
    sendQuestion(text);
}
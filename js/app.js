// ============================================================
// APP MODULE — State management & orchestration
// ============================================================

const App = {
  state: {
    question: "",
    deck: [],
    drawnCards: [],      // { card, orientation }
    currentReading: "",
    phase: "welcome",    // welcome | selecting | reading | clarifying-select | clarifying
    apiKey: "",
    model: API_CONFIG.defaultModel,
  },

  init() {
    UI.init();
    UI.createParticles();
    this.loadSettings();
    this.bindEvents();
    UI.showScreen("welcomeScreen");

    // Show settings nudge if no API key
    if (!this.state.apiKey) {
      setTimeout(() => UI.openSettings(), 800);
    }
  },

  // ── Settings ──────────────────────────────────────────

  loadSettings() {
    const saved = localStorage.getItem("tarot_settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.state.apiKey = parsed.apiKey || "";
        this.state.model = parsed.model || API_CONFIG.defaultModel;
        UI.els.apiKeyInput.value = this.state.apiKey;
        UI.els.modelSelect.value = this.state.model;
      } catch (_) {}
    }
  },

  saveSettings() {
    this.state.apiKey = UI.els.apiKeyInput.value.trim();
    this.state.model = UI.els.modelSelect.value;
    localStorage.setItem("tarot_settings", JSON.stringify({
      apiKey: this.state.apiKey,
      model: this.state.model,
    }));
    UI.closeSettings();
  },

  // ── Event Binding ─────────────────────────────────────

  bindEvents() {
    // Question submission
    UI.els.questionForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleQuestionSubmit();
    });

    // Settings
    UI.els.settingsBtn.addEventListener("click", () => UI.openSettings());
    UI.els.settingsClose.addEventListener("click", () => UI.closeSettings());
    UI.els.saveSettingsBtn.addEventListener("click", () => this.saveSettings());
    UI.els.settingsModal.addEventListener("click", (e) => {
      if (e.target === UI.els.settingsModal) UI.closeSettings();
    });

    // Clarify & New Reading
    UI.els.clarifyBtn.addEventListener("click", () => this.handleClarifyRequest());
    UI.els.newReadingBtn.addEventListener("click", () => this.handleNewReading());

    // Keyboard: Escape closes settings
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") UI.closeSettings();
    });
  },

  // ── Question Submit ───────────────────────────────────

  handleQuestionSubmit() {
    const question = UI.els.questionInput.value.trim();
    if (!question) return;

    if (!this.state.apiKey) {
      UI.openSettings();
      return;
    }

    this.state.question = question;
    this.state.deck = getNewDeck();
    this.state.drawnCards = [];
    this.state.currentReading = "";
    this.state.phase = "selecting";

    UI.els.questionDisplay.textContent = `"${question}"`;
    UI.els.selectionTitle.textContent = "Choose Your Card";
    UI.els.selectionSubtitle.textContent = "Trust your intuition. Let your hand be drawn to the card that calls to you.";

    UI.showScreen("selectionScreen");

    // Render deck after screen transition
    setTimeout(() => {
      UI.renderDeck(this.state.deck, (index, el) => this.handleCardSelect(index, el));
    }, 300);
  },

  // ── Card Selection ────────────────────────────────────

  async handleCardSelect(index, cardElement) {
    if (this.state.phase === "selecting") {
      await this.handleMainCardSelect(index, cardElement);
    } else if (this.state.phase === "clarifying-select") {
      await this.handleClarifyCardSelect(index, cardElement);
    }
  },

  async handleMainCardSelect(index, cardElement) {
    this.state.phase = "reading";
    const { card, orientation } = drawCard(this.state.deck, index);
    this.state.drawnCards.push({ card, orientation });

    // Flip animation on the deck
    UI.flipCard(cardElement, card, orientation);

    // Wait for flip, then show reading screen
    setTimeout(() => {
      UI.showReadingScreen(card, orientation);
      this.fetchReading(card, orientation);
    }, 1200);
  },

  async fetchReading(card, orientation) {
    try {
      const reader = await generateReading(
        this.state.question,
        card.name,
        orientation,
        this.state.apiKey,
        this.state.model
      );

      this.state.currentReading = await consumeStream(reader, (chunk) => {
        UI.appendReadingText(chunk);
      });

      UI.showReadingComplete();
    } catch (error) {
      console.error("Reading error:", error);
      UI.showReadingError(error.message || "Failed to generate reading. Check your API key and try again.");
    }
  },

  // ── Clarifying Card ──────────────────────────────────

  handleClarifyRequest() {
    if (this.state.deck.length === 0) return;

    this.state.phase = "clarifying-select";

    // Show the deck again for second selection
    UI.els.selectionTitle.textContent = "Draw Your Clarifying Card";
    UI.els.selectionSubtitle.textContent = "Seek deeper insight. Let the cards reveal what lies beneath the surface.";

    UI.showScreen("selectionScreen");

    setTimeout(() => {
      UI.renderDeck(this.state.deck, (index, el) => this.handleCardSelect(index, el));
    }, 300);
  },

  async handleClarifyCardSelect(index, cardElement) {
    this.state.phase = "clarifying";
    const { card, orientation } = drawCard(this.state.deck, index);
    this.state.drawnCards.push({ card, orientation });

    UI.flipCard(cardElement, card, orientation);

    setTimeout(() => {
      UI.showScreen("readingScreen");
      UI.showClarifySection(card, orientation);
      this.fetchClarifyReading(card, orientation);
    }, 1200);
  },

  async fetchClarifyReading(card2, orientation2) {
    const { card: card1, orientation: orientation1 } = this.state.drawnCards[0];

    try {
      const reader = await generateClarifyingReading(
        this.state.question,
        card1.name,
        orientation1,
        card2.name,
        orientation2,
        this.state.apiKey,
        this.state.model
      );

      await consumeStream(reader, (chunk) => {
        UI.appendClarifyText(chunk);
      });

      UI.showClarifyComplete();
    } catch (error) {
      console.error("Clarify error:", error);
      UI.showClarifyError(error.message || "Failed to generate clarifying reading.");
    }
  },

  // ── New Reading ───────────────────────────────────────

  handleNewReading() {
    this.state.question = "";
    this.state.deck = [];
    this.state.drawnCards = [];
    this.state.currentReading = "";
    this.state.phase = "welcome";
    UI.resetUI();
  },
};

// ── Bootstrap ───────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => App.init());

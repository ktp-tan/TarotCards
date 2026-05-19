// ============================================================
// UI MODULE — DOM manipulation, rendering, animations
// ============================================================

const UI = {
  // Cache DOM references
  els: {},

  init() {
    this.els = {
      // Screens
      welcomeScreen:    document.getElementById("welcome-screen"),
      selectionScreen:  document.getElementById("selection-screen"),
      readingScreen:    document.getElementById("reading-screen"),

      // Welcome
      questionInput:    document.getElementById("question-input"),
      questionForm:     document.getElementById("question-form"),
      questionDisplay:  document.getElementById("question-display"),

      // Selection
      deckContainer:    document.getElementById("deck-container"),
      selectionTitle:   document.getElementById("selection-title"),
      selectionSubtitle:document.getElementById("selection-subtitle"),

      // Reading
      cardReveal:       document.getElementById("card-reveal"),
      cardName:         document.getElementById("card-name"),
      cardOrientation:  document.getElementById("card-orientation"),
      cardKeywords:     document.getElementById("card-keywords"),
      cardSymbol:       document.getElementById("card-symbol"),
      cardArcana:       document.getElementById("card-arcana"),
      readingText:      document.getElementById("reading-text"),
      readingLoader:    document.getElementById("reading-loader"),
      clarifyBtn:       document.getElementById("clarify-btn"),
      newReadingBtn:    document.getElementById("new-reading-btn"),

      // Clarifying
      clarifySection:   document.getElementById("clarify-section"),
      clarifyCardReveal:document.getElementById("clarify-card-reveal"),
      clarifyCardName:  document.getElementById("clarify-card-name"),
      clarifyCardOrientation: document.getElementById("clarify-card-orientation"),
      clarifyCardKeywords: document.getElementById("clarify-card-keywords"),
      clarifyCardSymbol:document.getElementById("clarify-card-symbol"),
      clarifyCardArcana:document.getElementById("clarify-card-arcana"),
      clarifyReadingText:  document.getElementById("clarify-reading-text"),
      clarifyReadingLoader:document.getElementById("clarify-reading-loader"),

      // Settings
      settingsBtn:      document.getElementById("settings-btn"),
      settingsModal:    document.getElementById("settings-modal"),
      settingsClose:    document.getElementById("settings-close"),
      apiKeyInput:      document.getElementById("api-key-input"),
      modelSelect:      document.getElementById("model-select"),
      saveSettingsBtn:  document.getElementById("save-settings-btn"),

      // Particles
      particlesContainer: document.getElementById("particles"),
    };
  },

  // ── Screen Management ──────────────────────────────────

  showScreen(screenName) {
    const screens = ["welcomeScreen", "selectionScreen", "readingScreen"];
    screens.forEach(s => {
      this.els[s].classList.remove("active");
    });

    // Small delay for transition
    requestAnimationFrame(() => {
      this.els[screenName].classList.add("active");
    });
  },

  // ── Deck Rendering ────────────────────────────────────

  renderDeck(deck, onCardClick) {
    const container = this.els.deckContainer;
    container.innerHTML = "";

    deck.forEach((card, index) => {
      const cardEl = document.createElement("div");
      cardEl.className = "tarot-card";
      cardEl.dataset.index = index;
      cardEl.setAttribute("role", "button");
      cardEl.setAttribute("aria-label", "Face-down tarot card");
      cardEl.setAttribute("tabindex", "0");

      cardEl.innerHTML = `
        <div class="card-inner">
          <div class="card-back">
            <div class="card-back-design">
              <div class="card-back-border">
                <div class="card-back-pattern">
                  <div class="card-back-star">✦</div>
                  <div class="card-back-circle"></div>
                  <div class="card-back-star bottom">✦</div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-front">
            <div class="card-front-content"></div>
          </div>
        </div>
      `;

      // Staggered deal animation
      cardEl.style.animationDelay = `${index * 15}ms`;

      cardEl.addEventListener("click", () => onCardClick(index, cardEl));
      cardEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onCardClick(index, cardEl);
        }
      });

      container.appendChild(cardEl);
    });
  },

  // ── Card Flip & Reveal ────────────────────────────────

  getCardImagePath(card) {
    let filename = '';
    if (card.arcana === 'major') {
      filename = `maj${card.number.toString().padStart(2, '0')}.jpg`;
    } else {
      let suitPrefix = card.suit === 'pentacles' ? 'pents' : card.suit;
      filename = `${suitPrefix}${card.number.toString().padStart(2, '0')}.jpg`;
    }
    return `assets/images/${filename}`;
  },

  flipCard(cardElement, cardData, orientation) {
    const front = cardElement.querySelector(".card-front-content");
    const frontSide = cardElement.querySelector(".card-front");
    const imagePath = this.getCardImagePath(cardData);
    
    // Set the image as background
    frontSide.style.backgroundImage = `url('${imagePath}')`;
    frontSide.style.backgroundSize = "cover";
    frontSide.style.backgroundPosition = "center";
    
    // Clear out the previous HTML content
    front.innerHTML = "";
    
    // If reversed, rotate the background image (the .card-front face)
    if (orientation === "Reversed") {
      frontSide.style.transform = "rotateY(180deg) rotateZ(180deg)";
    }

    cardElement.classList.add("flipped", "selected");

    // Disable all other cards
    const allCards = cardElement.parentElement.querySelectorAll(".tarot-card");
    allCards.forEach(c => {
      if (c !== cardElement) {
        c.classList.add("disabled");
        c.removeAttribute("tabindex");
      }
    });
  },

  // ── Reading Display ───────────────────────────────────

  showReadingScreen(cardData, orientation) {
    const suitInfo = cardData.suit ? SUIT_INFO[cardData.suit] : null;
    const gradient = suitInfo ? suitInfo.gradient : MAJOR_ARCANA_GRADIENT;
    const suitLabel = cardData.arcana === "major"
      ? "Major Arcana"
      : `${capitalize(cardData.suit)}`;

    const imagePath = this.getCardImagePath(cardData);
    this.els.cardSymbol.innerHTML = `<img src="${imagePath}" class="card-display-image ${orientation.toLowerCase()}" alt="${cardData.name}">`;
    this.els.cardSymbol.style.background = "none";
    this.els.cardSymbol.style.webkitTextFillColor = "initial";
    this.els.cardSymbol.style.margin = "0";
    this.els.cardName.textContent = cardData.name;
    this.els.cardOrientation.textContent = orientation;
    this.els.cardOrientation.className = `orientation-badge ${orientation.toLowerCase()}`;
    this.els.cardArcana.textContent = suitLabel;
    this.els.cardKeywords.textContent = cardData.keywords.join(" • ");

    this.els.readingText.textContent = "";
    this.els.readingLoader.classList.add("active");
    this.els.clarifyBtn.classList.remove("visible");
    this.els.clarifySection.classList.remove("visible");

    this.showScreen("readingScreen");
  },

  appendReadingText(chunk) {
    this.els.readingLoader.classList.remove("active");
    this.els.readingText.textContent += chunk;
    // Auto-scroll
    this.els.readingText.scrollTop = this.els.readingText.scrollHeight;
  },

  showReadingComplete() {
    this.els.readingLoader.classList.remove("active");
    this.els.clarifyBtn.classList.add("visible");
  },

  showReadingError(message) {
    this.els.readingLoader.classList.remove("active");
    this.els.readingText.innerHTML = `<span class="reading-error">⚠️ ${message}</span>`;
    this.els.clarifyBtn.classList.add("visible");
  },

  // ── Clarifying Card ───────────────────────────────────

  showClarifySection(cardData, orientation) {
    const suitInfo = cardData.suit ? SUIT_INFO[cardData.suit] : null;
    const gradient = suitInfo ? suitInfo.gradient : MAJOR_ARCANA_GRADIENT;
    const suitLabel = cardData.arcana === "major"
      ? "Major Arcana"
      : `${capitalize(cardData.suit)}`;

    const imagePath = this.getCardImagePath(cardData);
    this.els.clarifyCardSymbol.innerHTML = `<img src="${imagePath}" class="card-display-image ${orientation.toLowerCase()}" alt="${cardData.name}">`;
    this.els.clarifyCardSymbol.style.background = "none";
    this.els.clarifyCardSymbol.style.webkitTextFillColor = "initial";
    this.els.clarifyCardSymbol.style.margin = "0";
    this.els.clarifyCardName.textContent = cardData.name;
    this.els.clarifyCardOrientation.textContent = orientation;
    this.els.clarifyCardOrientation.className = `orientation-badge ${orientation.toLowerCase()}`;
    this.els.clarifyCardArcana.textContent = suitLabel;
    this.els.clarifyCardKeywords.textContent = cardData.keywords.join(" • ");

    this.els.clarifyReadingText.textContent = "";
    this.els.clarifyReadingLoader.classList.add("active");
    this.els.clarifyBtn.classList.remove("visible");
    this.els.clarifySection.classList.add("visible");

    // Scroll to clarifying section
    setTimeout(() => {
      this.els.clarifySection.scrollIntoView({ behavior: "smooth" });
    }, 300);
  },

  appendClarifyText(chunk) {
    this.els.clarifyReadingLoader.classList.remove("active");
    this.els.clarifyReadingText.textContent += chunk;
    this.els.clarifyReadingText.scrollTop = this.els.clarifyReadingText.scrollHeight;
  },

  showClarifyComplete() {
    this.els.clarifyReadingLoader.classList.remove("active");
  },

  showClarifyError(message) {
    this.els.clarifyReadingLoader.classList.remove("active");
    this.els.clarifyReadingText.innerHTML = `<span class="reading-error">⚠️ ${message}</span>`;
  },

  // ── Settings Modal ────────────────────────────────────

  openSettings() {
    this.els.settingsModal.classList.add("active");
  },

  closeSettings() {
    this.els.settingsModal.classList.remove("active");
  },

  // ── Particles ─────────────────────────────────────────

  createParticles() {
    const container = this.els.particlesContainer;
    const count = window.innerWidth < 768 ? 25 : 50;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${8 + Math.random() * 15}s`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particle.style.fontSize = `${4 + Math.random() * 8}px`;
      particle.style.opacity = `${0.2 + Math.random() * 0.5}`;
      particle.textContent = ["✦", "⋆", "✧", "·", "⊹", "✵"][Math.floor(Math.random() * 6)];
      container.appendChild(particle);
    }
  },

  // ── Reset ─────────────────────────────────────────────

  resetUI() {
    this.els.questionInput.value = "";
    this.els.readingText.textContent = "";
    this.els.clarifyReadingText.textContent = "";
    this.els.clarifySection.classList.remove("visible");
    this.els.clarifyBtn.classList.remove("visible");
    this.els.deckContainer.innerHTML = "";
    this.showScreen("welcomeScreen");
  },
};

// ── Helpers ─────────────────────────────────────────────

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getRomanNumeral(card) {
  if (card.arcana === "minor") {
    const courtNames = { 11: "Pg", 12: "Kn", 13: "Qn", 14: "Kg" };
    return courtNames[card.number] || card.number.toString();
  }
  const romans = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
                  "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"];
  return romans[card.number] || card.number.toString();
}

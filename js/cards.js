// ============================================================
// TAROT DECK DATA — Complete 78-card Rider-Waite deck
// ============================================================

const TAROT_DECK = [
  // ── MAJOR ARCANA (22 cards) ──────────────────────────────
  { id: 0,  name: "The Fool",             arcana: "major", number: 0,  suit: null,        symbol: "🌟", keywords: ["New beginnings", "Innocence", "Spontaneity", "Free spirit"] },
  { id: 1,  name: "The Magician",         arcana: "major", number: 1,  suit: null,        symbol: "✨", keywords: ["Manifestation", "Resourcefulness", "Power", "Inspired action"] },
  { id: 2,  name: "The High Priestess",   arcana: "major", number: 2,  suit: null,        symbol: "🌙", keywords: ["Intuition", "Sacred knowledge", "Divine feminine", "Subconscious"] },
  { id: 3,  name: "The Empress",          arcana: "major", number: 3,  suit: null,        symbol: "🌿", keywords: ["Femininity", "Beauty", "Nature", "Abundance"] },
  { id: 4,  name: "The Emperor",          arcana: "major", number: 4,  suit: null,        symbol: "👑", keywords: ["Authority", "Structure", "Control", "Fatherhood"] },
  { id: 5,  name: "The Hierophant",       arcana: "major", number: 5,  suit: null,        symbol: "🔑", keywords: ["Spiritual wisdom", "Tradition", "Conformity", "Morality"] },
  { id: 6,  name: "The Lovers",           arcana: "major", number: 6,  suit: null,        symbol: "💕", keywords: ["Love", "Harmony", "Relationships", "Values alignment"] },
  { id: 7,  name: "The Chariot",          arcana: "major", number: 7,  suit: null,        symbol: "⚡", keywords: ["Control", "Willpower", "Success", "Determination"] },
  { id: 8,  name: "Strength",             arcana: "major", number: 8,  suit: null,        symbol: "🦁", keywords: ["Courage", "Persuasion", "Influence", "Compassion"] },
  { id: 9,  name: "The Hermit",           arcana: "major", number: 9,  suit: null,        symbol: "🏔️", keywords: ["Soul searching", "Introspection", "Being alone", "Inner guidance"] },
  { id: 10, name: "Wheel of Fortune",     arcana: "major", number: 10, suit: null,        symbol: "☸️", keywords: ["Good luck", "Karma", "Life cycles", "Destiny"] },
  { id: 11, name: "Justice",              arcana: "major", number: 11, suit: null,        symbol: "⚖️", keywords: ["Fairness", "Truth", "Cause and effect", "Law"] },
  { id: 12, name: "The Hanged Man",       arcana: "major", number: 12, suit: null,        symbol: "🔮", keywords: ["Pause", "Surrender", "Letting go", "New perspectives"] },
  { id: 13, name: "Death",               arcana: "major", number: 13, suit: null,        symbol: "🦋", keywords: ["Endings", "Change", "Transformation", "Transition"] },
  { id: 14, name: "Temperance",           arcana: "major", number: 14, suit: null,        symbol: "🕊️", keywords: ["Balance", "Moderation", "Patience", "Purpose"] },
  { id: 15, name: "The Devil",            arcana: "major", number: 15, suit: null,        symbol: "🔥", keywords: ["Shadow self", "Attachment", "Addiction", "Restriction"] },
  { id: 16, name: "The Tower",            arcana: "major", number: 16, suit: null,        symbol: "⚡", keywords: ["Sudden change", "Upheaval", "Chaos", "Revelation"] },
  { id: 17, name: "The Star",             arcana: "major", number: 17, suit: null,        symbol: "⭐", keywords: ["Hope", "Faith", "Purpose", "Renewal"] },
  { id: 18, name: "The Moon",             arcana: "major", number: 18, suit: null,        symbol: "🌑", keywords: ["Illusion", "Fear", "Anxiety", "Subconscious"] },
  { id: 19, name: "The Sun",              arcana: "major", number: 19, suit: null,        symbol: "☀️", keywords: ["Positivity", "Fun", "Warmth", "Success"] },
  { id: 20, name: "Judgement",            arcana: "major", number: 20, suit: null,        symbol: "📯", keywords: ["Judgement", "Rebirth", "Inner calling", "Absolution"] },
  { id: 21, name: "The World",            arcana: "major", number: 21, suit: null,        symbol: "🌍", keywords: ["Completion", "Integration", "Accomplishment", "Travel"] },

  // ── MINOR ARCANA: WANDS (Fire) ───────────────────────────
  { id: 22, name: "Ace of Wands",         arcana: "minor", number: 1,  suit: "wands",     symbol: "🪄", keywords: ["Inspiration", "New opportunities", "Growth", "Potential"] },
  { id: 23, name: "Two of Wands",         arcana: "minor", number: 2,  suit: "wands",     symbol: "🪄", keywords: ["Future planning", "Progress", "Decisions", "Discovery"] },
  { id: 24, name: "Three of Wands",       arcana: "minor", number: 3,  suit: "wands",     symbol: "🪄", keywords: ["Progress", "Expansion", "Foresight", "Overseas opportunities"] },
  { id: 25, name: "Four of Wands",        arcana: "minor", number: 4,  suit: "wands",     symbol: "🪄", keywords: ["Celebration", "Joy", "Harmony", "Relaxation"] },
  { id: 26, name: "Five of Wands",        arcana: "minor", number: 5,  suit: "wands",     symbol: "🪄", keywords: ["Conflict", "Disagreements", "Competition", "Tension"] },
  { id: 27, name: "Six of Wands",         arcana: "minor", number: 6,  suit: "wands",     symbol: "🪄", keywords: ["Success", "Public recognition", "Progress", "Self-confidence"] },
  { id: 28, name: "Seven of Wands",       arcana: "minor", number: 7,  suit: "wands",     symbol: "🪄", keywords: ["Challenge", "Competition", "Protection", "Perseverance"] },
  { id: 29, name: "Eight of Wands",       arcana: "minor", number: 8,  suit: "wands",     symbol: "🪄", keywords: ["Speed", "Action", "Air travel", "Movement"] },
  { id: 30, name: "Nine of Wands",        arcana: "minor", number: 9,  suit: "wands",     symbol: "🪄", keywords: ["Resilience", "Courage", "Persistence", "Test of faith"] },
  { id: 31, name: "Ten of Wands",         arcana: "minor", number: 10, suit: "wands",     symbol: "🪄", keywords: ["Burden", "Extra responsibility", "Hard work", "Completion"] },
  { id: 32, name: "Page of Wands",        arcana: "minor", number: 11, suit: "wands",     symbol: "🪄", keywords: ["Exploration", "Excitement", "Freedom", "Enthusiasm"] },
  { id: 33, name: "Knight of Wands",      arcana: "minor", number: 12, suit: "wands",     symbol: "🪄", keywords: ["Energy", "Passion", "Adventure", "Impulsiveness"] },
  { id: 34, name: "Queen of Wands",       arcana: "minor", number: 13, suit: "wands",     symbol: "🪄", keywords: ["Courage", "Confidence", "Independence", "Social butterfly"] },
  { id: 35, name: "King of Wands",        arcana: "minor", number: 14, suit: "wands",     symbol: "🪄", keywords: ["Natural leader", "Vision", "Entrepreneur", "Honour"] },

  // ── MINOR ARCANA: CUPS (Water) ───────────────────────────
  { id: 36, name: "Ace of Cups",          arcana: "minor", number: 1,  suit: "cups",      symbol: "🏆", keywords: ["Love", "New relationships", "Compassion", "Creativity"] },
  { id: 37, name: "Two of Cups",          arcana: "minor", number: 2,  suit: "cups",      symbol: "🏆", keywords: ["Unified love", "Partnership", "Mutual attraction", "Connection"] },
  { id: 38, name: "Three of Cups",        arcana: "minor", number: 3,  suit: "cups",      symbol: "🏆", keywords: ["Celebration", "Friendship", "Creativity", "Collaborations"] },
  { id: 39, name: "Four of Cups",         arcana: "minor", number: 4,  suit: "cups",      symbol: "🏆", keywords: ["Meditation", "Contemplation", "Apathy", "Reevaluation"] },
  { id: 40, name: "Five of Cups",         arcana: "minor", number: 5,  suit: "cups",      symbol: "🏆", keywords: ["Regret", "Failure", "Disappointment", "Pessimism"] },
  { id: 41, name: "Six of Cups",          arcana: "minor", number: 6,  suit: "cups",      symbol: "🏆", keywords: ["Revisiting the past", "Childhood memories", "Innocence", "Joy"] },
  { id: 42, name: "Seven of Cups",        arcana: "minor", number: 7,  suit: "cups",      symbol: "🏆", keywords: ["Opportunities", "Choices", "Wishful thinking", "Illusion"] },
  { id: 43, name: "Eight of Cups",        arcana: "minor", number: 8,  suit: "cups",      symbol: "🏆", keywords: ["Disappointment", "Abandonment", "Withdrawal", "Escapism"] },
  { id: 44, name: "Nine of Cups",         arcana: "minor", number: 9,  suit: "cups",      symbol: "🏆", keywords: ["Contentment", "Satisfaction", "Gratitude", "Wish come true"] },
  { id: 45, name: "Ten of Cups",          arcana: "minor", number: 10, suit: "cups",      symbol: "🏆", keywords: ["Divine love", "Blissful relationships", "Harmony", "Alignment"] },
  { id: 46, name: "Page of Cups",         arcana: "minor", number: 11, suit: "cups",      symbol: "🏆", keywords: ["Creative opportunities", "Intuitive messages", "Curiosity", "Possibility"] },
  { id: 47, name: "Knight of Cups",       arcana: "minor", number: 12, suit: "cups",      symbol: "🏆", keywords: ["Creativity", "Romance", "Charm", "Imagination"] },
  { id: 48, name: "Queen of Cups",        arcana: "minor", number: 13, suit: "cups",      symbol: "🏆", keywords: ["Compassion", "Calm", "Comfort", "Emotional security"] },
  { id: 49, name: "King of Cups",         arcana: "minor", number: 14, suit: "cups",      symbol: "🏆", keywords: ["Emotional balance", "Diplomacy", "Generous", "Counsellor"] },

  // ── MINOR ARCANA: SWORDS (Air) ───────────────────────────
  { id: 50, name: "Ace of Swords",        arcana: "minor", number: 1,  suit: "swords",    symbol: "⚔️", keywords: ["Breakthrough", "Clarity", "Sharp mind", "New ideas"] },
  { id: 51, name: "Two of Swords",        arcana: "minor", number: 2,  suit: "swords",    symbol: "⚔️", keywords: ["Difficult decisions", "Weighing options", "Avoidance", "Stalemate"] },
  { id: 52, name: "Three of Swords",      arcana: "minor", number: 3,  suit: "swords",    symbol: "⚔️", keywords: ["Heartbreak", "Emotional pain", "Sorrow", "Grief"] },
  { id: 53, name: "Four of Swords",       arcana: "minor", number: 4,  suit: "swords",    symbol: "⚔️", keywords: ["Rest", "Relaxation", "Meditation", "Contemplation"] },
  { id: 54, name: "Five of Swords",       arcana: "minor", number: 5,  suit: "swords",    symbol: "⚔️", keywords: ["Conflict", "Disagreements", "Competition", "Defeat"] },
  { id: 55, name: "Six of Swords",        arcana: "minor", number: 6,  suit: "swords",    symbol: "⚔️", keywords: ["Transition", "Change", "Rite of passage", "Releasing baggage"] },
  { id: 56, name: "Seven of Swords",      arcana: "minor", number: 7,  suit: "swords",    symbol: "⚔️", keywords: ["Betrayal", "Deception", "Getting away with something", "Strategy"] },
  { id: 57, name: "Eight of Swords",      arcana: "minor", number: 8,  suit: "swords",    symbol: "⚔️", keywords: ["Negative thoughts", "Self-imposed restriction", "Imprisonment", "Victim mentality"] },
  { id: 58, name: "Nine of Swords",       arcana: "minor", number: 9,  suit: "swords",    symbol: "⚔️", keywords: ["Anxiety", "Worry", "Fear", "Depression"] },
  { id: 59, name: "Ten of Swords",        arcana: "minor", number: 10, suit: "swords",    symbol: "⚔️", keywords: ["Painful endings", "Deep wounds", "Betrayal", "Loss"] },
  { id: 60, name: "Page of Swords",       arcana: "minor", number: 11, suit: "swords",    symbol: "⚔️", keywords: ["Curiosity", "Restlessness", "Mental energy", "Vigilance"] },
  { id: 61, name: "Knight of Swords",     arcana: "minor", number: 12, suit: "swords",    symbol: "⚔️", keywords: ["Ambitious", "Action-oriented", "Fast-thinking", "Driven"] },
  { id: 62, name: "Queen of Swords",      arcana: "minor", number: 13, suit: "swords",    symbol: "⚔️", keywords: ["Independent", "Unbiased judgement", "Clear boundaries", "Direct communication"] },
  { id: 63, name: "King of Swords",       arcana: "minor", number: 14, suit: "swords",    symbol: "⚔️", keywords: ["Intellectual power", "Authority", "Truth", "Mental clarity"] },

  // ── MINOR ARCANA: PENTACLES (Earth) ──────────────────────
  { id: 64, name: "Ace of Pentacles",     arcana: "minor", number: 1,  suit: "pentacles", symbol: "⬟", keywords: ["New financial opportunity", "Prosperity", "Abundance", "Security"] },
  { id: 65, name: "Two of Pentacles",     arcana: "minor", number: 2,  suit: "pentacles", symbol: "⬟", keywords: ["Multiple priorities", "Time management", "Prioritisation", "Adaptability"] },
  { id: 66, name: "Three of Pentacles",   arcana: "minor", number: 3,  suit: "pentacles", symbol: "⬟", keywords: ["Teamwork", "Collaboration", "Learning", "Implementation"] },
  { id: 67, name: "Four of Pentacles",    arcana: "minor", number: 4,  suit: "pentacles", symbol: "⬟", keywords: ["Saving money", "Security", "Conservatism", "Scarcity"] },
  { id: 68, name: "Five of Pentacles",    arcana: "minor", number: 5,  suit: "pentacles", symbol: "⬟", keywords: ["Financial loss", "Poverty", "Lack mindset", "Isolation"] },
  { id: 69, name: "Six of Pentacles",     arcana: "minor", number: 6,  suit: "pentacles", symbol: "⬟", keywords: ["Giving", "Receiving", "Sharing wealth", "Generosity"] },
  { id: 70, name: "Seven of Pentacles",   arcana: "minor", number: 7,  suit: "pentacles", symbol: "⬟", keywords: ["Long-term view", "Sustainable results", "Perseverance", "Investment"] },
  { id: 71, name: "Eight of Pentacles",   arcana: "minor", number: 8,  suit: "pentacles", symbol: "⬟", keywords: ["Apprenticeship", "Repetitive tasks", "Mastery", "Skill development"] },
  { id: 72, name: "Nine of Pentacles",    arcana: "minor", number: 9,  suit: "pentacles", symbol: "⬟", keywords: ["Abundance", "Luxury", "Self-sufficiency", "Financial independence"] },
  { id: 73, name: "Ten of Pentacles",     arcana: "minor", number: 10, suit: "pentacles", symbol: "⬟", keywords: ["Wealth", "Financial security", "Family", "Long-term success"] },
  { id: 74, name: "Page of Pentacles",    arcana: "minor", number: 11, suit: "pentacles", symbol: "⬟", keywords: ["Manifestation", "Financial opportunity", "Skill development", "Studiousness"] },
  { id: 75, name: "Knight of Pentacles",  arcana: "minor", number: 12, suit: "pentacles", symbol: "⬟", keywords: ["Hard work", "Productivity", "Routine", "Conservatism"] },
  { id: 76, name: "Queen of Pentacles",   arcana: "minor", number: 13, suit: "pentacles", symbol: "⬟", keywords: ["Nurturing", "Practical", "Providing financially", "Working parent"] },
  { id: 77, name: "King of Pentacles",    arcana: "minor", number: 14, suit: "pentacles", symbol: "⬟", keywords: ["Wealth", "Business", "Leadership", "Security"] },
];

// Suit metadata for styling
const SUIT_INFO = {
  wands:     { element: "Fire",  color: "#e85d3a", gradient: "linear-gradient(135deg, #e85d3a, #f0a030)", icon: "🔥" },
  cups:      { element: "Water", color: "#3a8ee8", gradient: "linear-gradient(135deg, #3a8ee8, #6dd5fa)", icon: "💧" },
  swords:    { element: "Air",   color: "#a0a8c0", gradient: "linear-gradient(135deg, #a0a8c0, #d0d8f0)", icon: "💨" },
  pentacles: { element: "Earth", color: "#4caf50", gradient: "linear-gradient(135deg, #4caf50, #a8d860)", icon: "🌍" },
};

const MAJOR_ARCANA_GRADIENT = "linear-gradient(135deg, #8b5cf6, #d4a574)";

// ── Deck Management ────────────────────────────────────────

/**
 * Fisher-Yates shuffle — returns a new shuffled copy.
 */
function shuffleDeck(deck) {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Draw a card: removes it from the deck array and returns
 * { card, orientation } where orientation is "Upright" or "Reversed".
 */
function drawCard(deck, index) {
  const card = deck.splice(index, 1)[0];
  const orientation = Math.random() < 0.5 ? "Upright" : "Reversed";
  return { card, orientation };
}

/**
 * Get a fresh shuffled copy of the full 78-card deck.
 */
function getNewDeck() {
  return shuffleDeck([...TAROT_DECK]);
}

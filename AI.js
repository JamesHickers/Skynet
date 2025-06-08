const BANNED_WORDS = [
  'slur1', 'slur2', 'foulword', 'robux scam',
  /\b(kill yourself|unalive)\b/i,
  /\b(free robux|click here)\b/i
];

const BAN_THRESHOLD = 2; // How many strikes before ban
const LOCAL_BAN_KEY = 'skynet_ban_status';
const STRIKE_KEY = 'skynet_strikes';

// Check if content breaks rules
function isInappropriate(content) {
  for (const rule of BANNED_WORDS) {
    if (typeof rule === 'string' && content.toLowerCase().includes(rule)) return true;
    if (rule instanceof RegExp && rule.test(content)) return true;
  }
  return false;
}

// Ban utilities
function isBanned() {
  return localStorage.getItem(LOCAL_BAN_KEY) === 'true';
}

function banUser(reason = 'AutoMod Triggered') {
  localStorage.setItem(LOCAL_BAN_KEY, 'true');
  console.warn('[SKYNET MOD] User has been auto-banned:', reason);

  // Optional: notify server
  // fetch('/ban', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ reason, timestamp: Date.now() })
  // });

  alert("You've been banned. 💀 Reason: " + reason);
}

function addStrike(content) {
  const current = parseInt(localStorage.getItem(STRIKE_KEY) || '0');
  const newCount = current + 1;
  localStorage.setItem(STRIKE_KEY, newCount);

  if (newCount >= BAN_THRESHOLD) {
    banUser('Exceeded strike limit');
  } else {
    alert(`Warning ⚠️\nThis violates our rules. (${newCount}/${BAN_THRESHOLD} strikes)`);
  }

  // Optional: log
  // fetch('/mod-log', { ... })
}

// Hook up moderation to input
function moderateInput(inputField, formElement) {
  formElement.addEventListener('submit', (e) => {
    if (isBanned()) {
      e.preventDefault();
      alert("Access denied. You've been banned. ☠️");
      return;
    }

    const content = inputField.value.trim();
    if (isInappropriate(content)) {
      e.preventDefault();
      addStrike(content);
    }
  });
}

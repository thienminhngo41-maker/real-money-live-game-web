export function getTelegramUser() {
  const tg = window.Telegram?.WebApp;
  if (!tg) return null;

  tg.ready();
  return tg.initDataUnsafe?.user || null;
}

export function buildUserRecord(user) {
  return {
    telegramId: user.id,
    username: user.username || '',
    firstName: user.first_name || '',
    photoUrl: user.photo_url || '',
    balance: 0,
    lastVisitAt: Date.now()
  };
}

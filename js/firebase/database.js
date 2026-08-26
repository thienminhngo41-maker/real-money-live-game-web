import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js';
import { getDatabase, ref, get, set, update, onValue } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js';
import { firebaseConfig } from './config.js';

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export const userRef = (telegramId) => ref(db, `users/${telegramId}`);

export async function getUser(telegramId) {
  const snapshot = await get(userRef(telegramId));
  return snapshot.exists() ? snapshot.val() : null;
}

export async function createUser(telegramId, data) {
  await set(userRef(telegramId), data);
}

export async function updateUser(telegramId, data) {
  await update(userRef(telegramId), data);
}

export function watchStreams(callback) {
  return onValue(ref(db, 'settings/streams'), (snapshot) => {
    callback(snapshot.val() || {});
  });
}

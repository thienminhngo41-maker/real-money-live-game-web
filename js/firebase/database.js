import { ref, get, set, update, onValue } from 'firebase/database';
import { db } from './config.js';

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

export function watchStreams(callback, onError) {
  return onValue(
    ref(db, 'settings/streams'),
    (snapshot) => callback(snapshot.val() || {}),
    (error) => {
      console.error('[Firebase] Failed to read settings/streams:', error);
      onError?.(error);
    }
  );
}

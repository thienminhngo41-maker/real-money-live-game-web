const fallback={initDataUnsafe:{},ready(){},expand(){},setHeaderColor(){},setBackgroundColor(){},openLink(url){window.open(url,'_blank','noopener')},openTelegramLink(url){window.open(url,'_blank','noopener')},HapticFeedback:{impactOccurred(){}},BackButton:{show(){},hide(){},onClick(){}}};
export const tg=window.Telegram?.WebApp||fallback;
export function initTelegram(){tg.ready();tg.expand();tg.setHeaderColor?.('#090909');tg.setBackgroundColor?.('#090909')}
export function getTelegramUser(){return tg.initDataUnsafe?.user||null}
export function openExternal(url){tg.openLink(url)}
export function openSupport(url){tg.openTelegramLink(url)}
export function haptic(){tg.HapticFeedback?.impactOccurred?.('light')}

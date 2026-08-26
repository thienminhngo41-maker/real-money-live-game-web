const fallback={initDataUnsafe:{},ready(){},expand(){},openLink(url){window.open(url,'_blank','noopener')},openTelegramLink(url){window.open(url,'_blank','noopener')},HapticFeedback:{impactOccurred(){}},BackButton:{show(){},hide(){},onClick(){}}};

export const tg=window.Telegram?.WebApp||fallback;

function versionAtLeast(version,required){
  const a=String(version||'0').split('.').map(Number);
  const b=String(required).split('.').map(Number);
  for(let i=0;i<b.length;i++){
    const av=Number.isFinite(a[i])?a[i]:0;
    const bv=Number.isFinite(b[i])?b[i]:0;
    if(av>bv)return true;
    if(av<bv)return false;
  }
  return true;
}

export function isTelegram(){return !!window.Telegram?.WebApp}

export function initTelegram(){
  tg.ready();
  tg.expand();
  // Color APIs require newer Telegram WebApp versions. Avoid noisy/unsupported
  // calls on older clients; CSS/meta theme colors still provide the fallback.
  if(versionAtLeast(tg.version,'6.1')){
    tg.setHeaderColor?.('#090909');
    tg.setBackgroundColor?.('#090909');
  }
}

export function getTelegramUser(){return tg.initDataUnsafe?.user||null}
export function openExternal(url){tg.openLink(url)}
export function openSupport(url){tg.openTelegramLink(url)}
export function haptic(){tg.HapticFeedback?.impactOccurred?.('light')}

export function setBackButton(visible,onClick){
  if(!isTelegram())return;
  if(visible){
    tg.BackButton.show?.();
    if(onClick)tg.BackButton.onClick?.(onClick);
  }else{
    tg.BackButton.hide?.();
  }
}

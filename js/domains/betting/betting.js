import {totalBet,summary,addBet} from '../../services/betting.js';
import {closeModal,openModal} from '../../components/modal.js';
import {closeBetting,updateBetUI} from '../../components/bettingSheet.js';
import {state} from '../../state.js';

export {totalBet,summary,addBet};

export function setMaxBet(){
  const input=document.querySelector('#bet-amount-input');
  if(input)input.value=10000;
  state.selectedChip=1000;
  if(state.selectedBet)addBet(state.selectedBet,10000);
  updateBetUI();
}

export function confirmBet(){
  if(!totalBet())return;
  const detail=`${summary()}\n\n총 베팅 ${totalBet().toLocaleString()}P\n\nTEST MODE: 실제 잔액은 차감되지 않습니다.`;
  openModal('베팅 확인',detail,()=>{
    const done=summary();
    state.betAmounts={};
    state.selectedBet=null;
    closeModal();
    closeBetting();
    updateBetUI();
    openModal('✓',`베팅 완료: ${done.replaceAll('\\n',', ')}`);
  });
}

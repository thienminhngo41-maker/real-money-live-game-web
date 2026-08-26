export const betOptions=[
 {id:'player',name:'PLAYER',odds:'1:1',type:'MAIN'},{id:'tie',name:'TIE',odds:'8:1',type:'MAIN'},
 {id:'banker',name:'BANKER',odds:'1:1',type:'MAIN'},{id:'playerPair',name:'PLAYER PAIR',odds:'11:1',type:'SIDE'},
 {id:'bankerPair',name:'BANKER PAIR',odds:'11:1',type:'SIDE'},{id:'dragon7',name:'DRAGON 7',odds:'40:1',type:'SIDE'},{id:'panda8',name:'PANDA 8',odds:'25:1',type:'SIDE'}
];
export const chips=[1,5,10,50,100,1000];
export function calculateTestReturn(id,amount){if(id==='banker')return Math.floor(amount*195/100);if(id==='player')return amount*2;if(id==='tie')return amount*9;if(id==='playerPair'||id==='bankerPair')return amount*12;if(id==='dragon7')return amount*41;if(id==='panda8')return amount*26;return amount}

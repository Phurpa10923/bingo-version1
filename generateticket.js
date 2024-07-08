var wholenumber=[];
exports.setWholenumber=function(){
    for(var i=0;i<90;i++){
        wholenumber[i]=i+1;
    }
}
exports.gen_ticket=function(){
var ticket_rows=new Array(3);
for(i=0;i<3;i++){
    ticket_rows[i]=new Array(9);
}
for(i=0;i<3;i++){
    for(j=0;j<9;j++){
        ticket_rows[i][j]=0;
    }
}
console.log("random: "+wholenumber+"\nLength:"+wholenumber.length);
    for(i=0;i<3;i++){
        for(var ran_no=0;ran_no<5;ran_no++){
            var index;
            var selectedIndex=Math.floor(Math.random()*wholenumber.length);
            var val=wholenumber[selectedIndex];
            wholenumber.splice(selectedIndex,1);
            if(val%10==0){
                index=~~(val/10)-1;
            }
            else{
                index=~~(val/10);
            }
            while(wholenumber.includes(val)==true||ticket_rows[i][index]!=0){
                val=Math.floor(Math.random() * (90 - 1 + 1)) +1;
                if(val%10==0){
                    index=~~(val/10)-1;
                }
                else{
                    index=~~(val/10);
                }
            }
            console.log("Index:\t"+index+"\tRow:\t"+i)
            if(index==0){
                wholenumber.push(val);
                ticket_rows[i][index]=val;
                continue;
            }
            else if(index==1){
                wholenumber.push(val);
                ticket_rows[i][index]=val;
                continue;
            }
            else if(index==2){
                wholenumber.push(val);
                ticket_rows[i][index]=val;
                continue;
            }
            else if(index==3){
                wholenumber.push(val);
                ticket_rows[i][index]=val;
                continue;
            }
            else if(index==4){
                wholenumber.push(val);
                ticket_rows[i][index]=val;
                continue;
            }
            else if(index==5){
                wholenumber.push(val);
                ticket_rows[i][index]=val;
                continue;
            }
            else if(index==6){
                wholenumber.push(val);
                ticket_rows[i][index]=val;
                continue;
            }
            else if(index==7){
                wholenumber.push(val);
                ticket_rows[i][index]=val;
                continue;
            }
            else if(index==8){
                wholenumber.push(val);
                ticket_rows[i][index]=val;
                continue;
            }
        }
    }
    return ticket_rows;
}
exports.hell=function(){
     console.log("hello");
}
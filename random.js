const e = require("express");
const bingo=require('bingo-card-generator')


var sheets=new Array(6);


exports.gen_ticket=function(){
        
    sheets=bingo.Ticket.generateStrip();

    for(var i=0;i<6;i++){
        for(var j=0;j<3;j++){
            for(var a=0;a<9;a++){
                if(sheets[i][j][a]==undefined){
                    sheets[i][j][a]=0;
                }
            }
        }
    }


    return sheets;

}
    
    
    
    
    
    
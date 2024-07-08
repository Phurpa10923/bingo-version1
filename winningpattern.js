
const fs=require('fs');
const firebase=require('firebase');
var data;
var duplicate={};
var firstfullhouse=[];
var nooftickets;
exports.setdata=function (no){
    
    nooftickets=no;
    data=JSON.parse(fs.readFileSync('./data.json','utf-8'));
    for(var key in data){   
        duplicate[key]=data[key].ticket;
    }
    
};

exports.update=function(no){
    
    for(var d in duplicate){   
        for(var i=0;i<3;i++){
            for(var j=0;j<9;j++){
                if(duplicate[d][i][j]==no){
                    duplicate[d][i][j]=-1;
                }
            }
        }
    }

    

}

exports.firstrow=function(){
    
    
    var count;

    var winner=[];

    loop1:
    for(var d in duplicate){   
        count=0;
        for(var i=0;i<9;i++){
            
                if(duplicate[d][0][i]==-1){
                    count++;
                }
            
        }
        if(count==5){
            if(winner.includes(parseInt(d))){
                continue;
            }
            else{
                winner.push(parseInt(d));
            }
            
            
        }
        
        
   }
  

   return winner;
   
}
exports.secondrow=function(){
    
    
    var count;

    var winner=[];

    loop1:
    for(var d in duplicate){   
        count=0;
        for(var i=0;i<9;i++){
            
                if(duplicate[d][1][i]==-1){
                    count++;
                }
            
        }
        if(count==5){
            if(winner.includes(parseInt(d))){
                continue;
            }
            else{
                winner.push(parseInt(d));
            }
            
        }
        
        
   }
  

   return winner;
   
}
exports.thirdrow=function(){
    
    
    var count;

    var winner=[];

    loop1:
    for(var d in duplicate){   
        count=0;
        for(var i=0;i<9;i++){
            
                if(duplicate[d][2][i]==-1){
                    count++;
                }
            
        }
        if(count==5){
            if(winner.includes(parseInt(d))){
                continue;
            }
            else{
                winner.push(parseInt(d));
            }
            
        }
        
        
   }
  

   return winner;
   
}
exports.fullhouse=function(){
    
    
    var count;

    var winner=[];

    loop1:
    for(var d in duplicate){   
        count=0;
        
    
            for(var i=0;i<3;i++){

                for(var j=0;j<9;j++){
                    if(duplicate[d][i][j]==-1){
                        count++;
                    }
                }
                
                if(count==15){
                    firstfullhouse.push(d);
                    if(winner.includes(parseInt(d))){
                        continue;
                    }
                    else{
                        winner.push(parseInt(d));
                    }
                    
                }
            }
        
        
       
   }
  

   return winner;
   
}
exports.sfullhouse=function(){
    
    
    var count;

    var winner=[];

    loop1:
    for(var d in duplicate){   
        count=0;
        if(firstfullhouse.includes(d)){
            continue;
        }
        else{
            for(var i=0;i<3;i++){
                for(var j=0;j<9;j++){
                    if(duplicate[d][i][j]==-1){
                        count++;
                    }
                }
                
                if(count==15){
                    
                    if(winner.includes(parseInt(d))){
                        continue;
                    }
                    else{
                        winner.push(parseInt(d));
                    }
                    
                }
            }
        }
        
       
   }
  

   return winner;
   
}



exports.firstfive=function(){
    
    
    var count;

    var winners=[];

    loop1:
    for(var d in duplicate){   
        count=0;
        
    
            for(var i=0;i<3;i++){

                for(var j=0;j<9;j++){
                    if(duplicate[d][i][j]==-1){
                        count++;
                    }
                }
                
                if(count==5){
                    
                    if(winners.includes(parseInt(d))){
                        continue;
                    }
                    else{
                        winners.push(parseInt(d));
                    }
                    
                }
            }
        
        
       
   }
   

   return winners;
}


exports.corner=function(){
    
    
    var count;

    var winner=[];

    loop1:
    for(var d in duplicate){   
        count=0;

        
    
        
    
        
            for(var i=0;i<3;i++){
                
               
                innerloop1:
                for(var a=0;a<9;a++){
                    if(duplicate[d][i][a]==-1){
                        count++;
                        break innerloop1;
                    }
                    else if(duplicate[d][i][a]==0){
                        continue;
                    }
                    else{
                        break innerloop1;
                    }
                }
                innerloop2:
                for(var b=8;b>=0;b--){
                    if(duplicate[d][i][b]==-1){
                        count++;
                        break innerloop2;
                    }
                    else if(duplicate[d][i][b]==0){
                        continue;
                    }
                    else{
                        break innerloop2;
                    }
                }
                i++;
               
            }
            
           
            if(count==4){
                
                

                if(winner.includes(parseInt(d))){
                    continue;
                }
                else{
                    winner.push(parseInt(d));
                }

               
            }
        
        
       
   }
   

   return winner;
   
}




exports.sheetwinner=function(){
    var count;
    
    var winner=[];

    var sheetowner;
    
    outerloop:
    for(var i=0;i<(nooftickets/6);i++){


        sheetowner=[];
        count=0;

        for(var a=0;a<6;a++){
            if(data[(i*6)+a].owner!='admin'){
                if(sheetowner.includes(data[(i*6)+a].owner)===false){
                    sheetowner.push(data[(i*6)+a].owner);
                }
                
            }
        }

        if(sheetowner.length===1){

            
            innerloop1:
            for(var j=0;j<3;j++){
                for(var a=0;a<9;a++){
                    if(duplicate[i*6][j][a]==-1){
                        count++;
                        break innerloop1; 
                    }
                }
            }
            innerloop2:
            for(var j=0;j<3;j++){
                for(var a=0;a<9;a++){
                    if(duplicate[(i*6)+1][j][a]==-1){
                        count++;
                        break innerloop2; 
                    }
                }
            }
            innerloop3:
            for(var j=0;j<3;j++){
                for(var a=0;a<9;a++){
                    if(duplicate[(i*6)+2][j][a]==-1){
                        count++;
                        break innerloop3; 
                    }
                }
            }
            innerloop4:
            for(var j=0;j<3;j++){
                for(var a=0;a<9;a++){
                    if(duplicate[(i*6)+3][j][a]==-1){
                        count++;
                        break innerloop4; 
                    }
                }
            }
            innerloop5:
            for(var j=0;j<3;j++){
                for(var a=0;a<9;a++){
                    if(duplicate[(i*6)+4][j][a]==-1){
                        count++;
                        break innerloop5; 
                    }
                }
            }
            innerloop6:
            for(var j=0;j<3;j++){
                for(var a=0;a<9;a++){
                    if(duplicate[(i*6)+5][j][a]==-1){
                        count++;
                        break innerloop6; 
                    }
                }
            }

            if(count==6){
                if(winner.includes(parseInt(i))){
                    continue;
                }
                else{
                    winner.push(parseInt(i));
                }
            }
            else{
                count=0;
                
            }
        }
        
     
       
   }


   return winner;
}










   
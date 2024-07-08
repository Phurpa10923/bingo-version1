
const param=new URLSearchParams(location.search);
var noofTicket=param.get('ticket')
var date=param.get('date');
var time=param.get('time');


const gameInfo=document.getElementById('gameInfo');

gameInfo.addEventListener('click',function(e){
    if(e.target.value==0){
        document.getElementById("about-game-box").style.display='flex';
        document.getElementById('about-game-box').style.animation="openBox 0.5s ease-in forwards"
        
        gameInfo.textContent="Gen-Numbers";
        e.target.value=1;
    }
    else{
        
        document.getElementById('about-game-box').style.animation="closeBox 0.3s ease-in forwards"
        gameInfo.textContent="Game Information"
        
        e.target.value=0;
    }
})

            var i=0;
            var ticketValue;
            
            fetch('../data.json').then((data)=>{
                    return data.json();
                }).then((d)=>{
                    ticketValue=d;
                  
                    addTickets();
                }) 
                
   
                var Colors=["#fff703",'#0019fe',"#Fdfcfa","#ff3030","#049b13"];
            
           
            function addTickets(){

                
                
                while(i<noofTicket){
                    var temp = document.getElementsByTagName("template")[0];
                    //var clon = temp.content.cloneNode(true);
                    var id=temp.content.querySelector(".ticket");
                    
                    
                    var clon=document.importNode(id,true);
                    clon.setAttribute('data-ticketno',i);
                    clon.setAttribute('data-sheetno',ticketValue[i].sheetno)
                    
                    var sheetno=ticketValue[i].sheetno;

                            
                    var colorIndex=(sheetno)%5;
                    
                    clon.style.backgroundColor=Colors[colorIndex];
                    

                    
                    document.getElementById("box-contain-tickets").appendChild(clon);

                    
                    clon.childNodes.forEach((x)=>{
                        if(x.nodeType==Node.ELEMENT_NODE){
                            if(x.nodeName=="DIV"){
                               if(x.className=="ticketsvalue"){
                                   var ticketno=0;
                                   x.childNodes.forEach((y)=>{
                                       if(y.className=="row-one"){
                                           y.style.backgroundColor=Colors[colorIndex];
                                           var count=0;
                                           y.childNodes.forEach((z)=>{
                                               if(z.nodeName=="DIV"){
                                                   if(ticketValue[i].ticket[0][count]!=0){
                                                        z.textContent=ticketValue[i].ticket[0][count]
                                                   }
                                                   else{
                                                       z.textContent=="";
                                                   }
                                                  
                                                   count++;
                                                   return;
                                               }
                                               
                                            })

                                            return;
                                       }
                                       if(y.className=="row-two"){
                                        y.style.backgroundColor=Colors[colorIndex];
                                        var count=0;
                                           y.childNodes.forEach((z)=>{
                                               if(z.nodeName=="DIV"){
                                                    if(ticketValue[i].ticket[1][count]!=0){
                                                        z.textContent=ticketValue[i].ticket[1][count]
                                                    }
                                                    else{
                                                        z.textContent="";
                                                    }
                                                  
                                                   count++;
                                                   return;
                                               }
                                        })
                                        return;
                                       }
                                       if(y.className=="row-three"){
                                        y.style.backgroundColor=Colors[colorIndex];
                                            var count=0;
                                           y.childNodes.forEach((z)=>{
                                            
                                               if(z.nodeName=="DIV"){
                                                if(ticketValue[i].ticket[2][count]!=0){
                                                   z.textContent=ticketValue[i].ticket[2][count]
                                                }
                                                else{
                                                    z.textContent="";
                                                }
                                                   count++;
                                                   return;
                                               }
                                        })
                                        return;
                                       }
                                       ticketno++;
                                   })
                                   
                               }
                               if(x.className=="ticketno"){
                                   
                                if(colorIndex==1){
                                    x.style.color='white';
                                }
                               
                                   x.childNodes.forEach((y)=>{
                                       if(y.className=="ticket-no"){
                                           
                                           y.textContent=i+1;
                                       }
                                   })
                               }
                               if(x.className=="sheetno"){
                                if(colorIndex==1){
                                    x.style.color='white';
                                }
                                
                                   
                                x.childNodes.forEach((y)=>{
                                    if(y.className=="sheet-no"){
                                        y.textContent=ticketValue[i].sheetno;
                                    }
                                })
                            }
                            if(x.className=="ticketowner"){
                                   
                                if(colorIndex==1){
                                    x.style.color='white';
                                }
                                
                                   
                                x.childNodes.forEach((y)=>{
                                    if(y.className=="ticket-owner"){
                                        y.textContent=ticketValue[i].owner;
                                    }
                                })
                            }
                            }
                        }
                    })
                    
                    
                    i++;
            }
            }



            function showparticularTicket(){
                
                var ticketno;
                var selctedOption;
                
               
                if(document.getElementById("ticket-no").value==''){
                    alert('Search Feild is Empty')
                    return;
                }
                else{
                    ticketno=document.getElementById("ticket-no").value;
                }
               
                if(document.getElementById('options').value=='undefined'){
                    alert('Select A Valid Options')
                    return;
                }
                else{
                    selctedOption=document.getElementById('options').value;
                }

                if(selctedOption=="Ticket"){

                 
                    if(Number.isInteger(parseInt(ticketno))!=true){
                        alert("Enter a Valid Ticket No.");
                        document.getElementById("ticket-no").value=''
                        return;
                    }
                   else{
                        var c=0;
                        document.getElementById("ticket-no").value='';
                        document.getElementById("box-contain-tickets").childNodes.forEach((x)=>{
                            if(x.nodeType==Node.ELEMENT_NODE){
                                    if(x.nodeName=="DIV"){
                                    if(x.className=="ticket"){
                                      x.childNodes.forEach((y)=>{
                                          if(y.className=="ticketno"){
                                              y.childNodes.forEach((z)=>{
                                                  if(z.className=="ticket-no"){
                                                      if(z.textContent==ticketno){
                                                          x.style.display="flex";
                                                          c++;
                                                      }
                                                      else{
                                                          x.style.display="none";
                                                      }
                                                  }
                                              })
                                          }
                                      })
                                        
                                    }
                                    
                                    }
                                }
                            }) 
                            if(c==0){
                                alert("This Searched Ticket no is out of bound")
                                document.getElementById("ticket-no").value=''
                                showAllTicket();
                            }
                    }
                }
                else if(selctedOption=="t_username"){
                    if(ticketno==""){
                        alert("Username field is empty.")
                        document.getElementById("ticket-no").value=''
                        return;
                    }
                    else{
                        var c=0;
                        document.getElementById("ticket-no").value='';
                        document.getElementById("box-contain-tickets").childNodes.forEach((x)=>{
                            if(x.nodeType==Node.ELEMENT_NODE){
                                    if(x.nodeName=="DIV"){
                                    if(x.className=="ticket"){
                                      x.childNodes.forEach((y)=>{
                                          if(y.className=="ticketowner"){
                                              y.childNodes.forEach((z)=>{
                                                  if(z.className=="ticket-owner"){
                                                      if(z.textContent==ticketno){
                                                          x.style.display="flex";
                                                          c++;
                                                      }
                                                      else{
                                                          x.style.display="none";
                                                      }
                                                  }
                                              })
                                          }
                                      })
                                        
                                    }
                                    
                                    }
                                }
                            })
                            if(c==0){
                                alert("No Ticket is available with this Username")
                                document.getElementById("ticket-no").value=''
                                showAllTicket();
                            } 
                    }
                }
                else if(selctedOption=="Sheet"){
                    if(ticketno==""){
                        alert("Sheet field is empty.")
                        document.getElementById("ticket-no").value=''
                        return;
                    }
                    else{
                        var c=0;
                        document.getElementById("ticket-no").value='';
                        document.getElementById("box-contain-tickets").childNodes.forEach((x)=>{
                            if(x.nodeType==Node.ELEMENT_NODE){
                                    if(x.nodeName=="DIV"){
                                    if(x.className=="ticket"){
                                      x.childNodes.forEach((y)=>{
                                          if(y.className=="sheetno"){
                                              y.childNodes.forEach((z)=>{
                                                  if(z.className=="sheet-no"){
                                                      if(z.textContent==ticketno){
                                                          x.style.display="flex";
                                                          c++;
                                                      }
                                                      else{
                                                          x.style.display="none";
                                                      }
                                                  }
                                              })
                                          }
                                      })
                                        
                                    }
                                    
                                    }
                                }
                            })
                            if(c==0){
                                alert("No Ticket is available with this Sheet no")
                                document.getElementById("ticket-no").value='';
                                showAllTicket();
                            } 
                    }
                }
                
                   
            
            }

            function showAllTicket(){
                document.getElementById("box-contain-tickets").childNodes.forEach((x)=>{
                    if(x.nodeType==Node.ELEMENT_NODE){
                            if(x.nodeName=="DIV"){
                            if(x.className=="ticket"){
                                x.style.display="flex"
                            }
                            
                            }
                        }
                    }) 
            }



            
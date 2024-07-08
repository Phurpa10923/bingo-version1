
const winbox=document.getElementById("pop-up-back");
const para=new URLSearchParams(location.search);
var noofTicket=para.get('ticket')
var gameDate=para.get('date')
var gameTime=para.get('time')
var audio=new Audio('/sounds/winTune.mp3');
function showPopup(t_name,winnerno){
    audio.play();
    var count=0;
    document.getElementById("tropy-name").textContent=t_name;
    document.getElementById("ticket-no-winner").textContent=winnerno;
    winbox.style.visibility='visible';
    winbox.style.zIndex=100;
    winbox.style.animation="popup 0.3s ease-in-out forwards"
    document.getElementById("tropy-img").style.animation="shake 1s ease-in-out 3"
    document.getElementById("svg-one").style.animation="showStar 1s ease-in-out 3"
    document.getElementById("svg-two").style.animation="1s 0.4s ease-in-out 3"
    document.getElementById("svg-three").style.animation="showStar2 1s 0.2s ease-in-out 3"
    document.getElementById("svg-four").style.animation="showStar3 1s 0.2s ease-in-out 3"
    var id=setInterval(show,1000);
    function show(){
        if(count==4){
            winbox.style.visibility='hidden';
            winbox.style.zIndex=-10;
            winbox.style.animation="none"
            document.getElementById("tropy-img").style.animation="none"
            document.getElementById("svg-one").style.animation="none"
            document.getElementById("svg-two").style.animation="none"
            document.getElementById("svg-three").style.animation="none"
            document.getElementById("svg-four").style.animation="none"
            clearInterval(id);
        }
        else{
            count++;
        }
    }
}
var nodeRef = ref(database,"Games/"+gameDate+"/"+gameTime+"/winners/firstfive");
onValue(nodeRef,(snapshot)=>{
    var winnerTicks='';
    var winnerNames='';
    var winners=[];
    if(snapshot.val()!=null){
        snapshot.child('/winnerJSon').forEach((child)=>{
             document.getElementById("f-f-w-ticket").innerHTML="";
            document.getElementById('ff-ticket-container').innerHTML="";
            if(child.child('/winner').val()!=null&&winners.includes(child.child('/winner').val())==false){
                winners.push(child.child('/winner').val())
                const nodeRef = ref(database,"Games/"+gameDate+"/"+gameTime+"/tickets/"+child.child('/winner').val());
                onValue(nodeRef,(d)=>{
                    const main=document.getElementById('box-contain-tickets');
                    const span=document.createElement('span');
                    span.textContent=child.child('/winner').val()+" ("+d.child('/owner').val()+") - ";
                    document.getElementById("f-f-w-ticket").appendChild(span);
                    winnerTicks=winnerTicks+"-"+child.child('/winner').val();
                    winnerNames=winnerNames+"-"+d.child('/owner').val()
                    if( document.getElementById('ff-winner-name')!=null){
                        const spanName=document.createElement('span');
                        const spanTic=document.createElement('span');
                        spanName.textContent=d.child('/owner').val()+' - ';
                        spanTic.textContent=child.child('/winner').val()+' - ';
                        document.getElementById('ff-winner-name').appendChild(spanName)
                        document.getElementById('ff-ticket-no').appendChild(spanTic)
                    }
                    setTimeout(function(){
                        main.childNodes.forEach((a)=>{
                            if(a.nodeType==Node.ELEMENT_NODE){
                                if(a.className=="ticket"){
                                    var divTicketno=a.getAttribute('data-ticketno');
                                    if(divTicketno==(d.key-1))
                                    {   var clon=a.cloneNode(true);
                                        clon.style.display='flex';
                                        clon=winnerTicketInstace(clon,snapshot.child('/index').val())
                                        document.getElementById('ff-ticket-container').appendChild(clon);
                                    }
                                }
                            }
                        })
                    },100)
                },{onlyOnce:true})
            }
        })
        var delayFunc=setInterval(function(){
            showPopup('First Five',"We Got a First Five Winner");
            clearInterval(delayFunc);
        },1000)
    }
})
nodeRef = ref(database,"Games/"+gameDate+"/"+gameTime+"/winners/firstrow");
onValue(nodeRef,(snapshot)=>{
    var winnerTicks='';
    var winnerNames='';
    var winners=[];
    if(snapshot.val()!=null){
        snapshot.child('/winnerJSon').forEach((child)=>{
            document.getElementById("f-r-w-ticket").innerHTML="";
            document.getElementById('fr-ticket-container').innerHTML="";
            if(child.child('/winner').val()!=null&&winners.includes(child.child('/winner').val())==false){
                winners.push(child.child('/winner').val())
                const nodeRef = ref(database,"Games/"+gameDate+"/"+gameTime+"/tickets/"+child.child('/winner').val())
                onValue(nodeRef,(d)=>{
                    const main=document.getElementById('box-contain-tickets');
                    const span=document.createElement('span');
                    span.textContent=child.child('/winner').val()+" ("+d.child('/owner').val()+") - ";
                    document.getElementById("f-r-w-ticket").appendChild(span);
                    winnerTicks=winnerTicks+"-"+child.child('/winner').val();
                    winnerNames=winnerNames+"-"+d.child('/owner').val()
                    if( document.getElementById('fr-winner-name')!=null){
                        const spanName=document.createElement('span');
                        const spanTic=document.createElement('span');
                        spanName.textContent=d.child('/owner').val()+' - ';
                        spanTic.textContent=child.child('/winner').val()+' - ';
                        document.getElementById('fr-winner-name').appendChild(spanName)
                        document.getElementById('fr-ticket-no').appendChild(spanTic)
                    }
                    setTimeout(function(){
                        main.childNodes.forEach((a)=>{
                            if(a.nodeType==Node.ELEMENT_NODE){
                                if(a.className=="ticket"){
                                    var divTicketno=a.getAttribute('data-ticketno');
                                    if(divTicketno==(d.key-1))
                                    {   var clon=a.cloneNode(true);
                                        clon.style.display='flex';
                                        clon=winnerTicketInstace(clon,snapshot.child('/index').val())
                                        document.getElementById('fr-ticket-container').appendChild(clon);
                                    }
                                }
                            }
                        })
                    },100)
                },{onlyOnce:true});
            }
        })
        var delayFunc=setInterval(function(){
            showPopup('First Row',"We Got a First Line Winner");
            clearInterval(delayFunc);
        },1000)
    }
})
nodeRef = ref(database,"Games/"+gameDate+"/"+gameTime+"/winners/secondrow");
onValue(nodeRef,(snapshot)=>{
    var winnerTicks='';
    var winnerNames='';
    var winners=[];
    if(snapshot.val()!=null){
        snapshot.child('/winnerJSon').forEach((child)=>{
            document.getElementById("s-r-w-ticket").innerHTML="";
            document.getElementById('sr-ticket-container').innerHTML="";
            if(child.child('/winner').val()!=null&&winners.includes(child.child('/winner').val())==false){
                winners.push(child.child('/winner').val())
                const nodeRef = ref(database,"Games/"+gameDate+"/"+gameTime+"/tickets/"+child.child('/winner').val());
                onValue(nodeRef,(d)=>{
                    const main=document.getElementById('box-contain-tickets');
                    const span=document.createElement('span');
                    span.textContent=child.child('/winner').val()+" ("+d.child('/owner').val()+") - ";
                    document.getElementById("s-r-w-ticket").appendChild(span);
                    winnerTicks=winnerTicks+"-"+child.child('/winner').val();
                    winnerNames=winnerNames+"-"+d.child('/owner').val()
                    if( document.getElementById('sr-winner-name')!=null){
                        const spanName=document.createElement('span');
                        const spanTic=document.createElement('span');
                        spanName.textContent=d.child('/owner').val()+' - ';
                        spanTic.textContent=child.child('/winner').val()+' - ';
                        document.getElementById('sr-winner-name').appendChild(spanName)
                        document.getElementById('sr-ticket-no').appendChild(spanTic)
                    }
                    setTimeout(function(){
                        main.childNodes.forEach((a)=>{
                            if(a.nodeType==Node.ELEMENT_NODE){
                                if(a.className=="ticket"){
                                    var divTicketno=a.getAttribute('data-ticketno');
                                    if(divTicketno==(d.key-1))
                                    {   var clon=a.cloneNode(true);
                                        clon.style.display='flex';
                                        clon=winnerTicketInstace(clon,snapshot.child('/index').val())
                                        document.getElementById('sr-ticket-container').appendChild(clon);
                                    }
                                }
                            }
                        })
                    },100)
                })
            }
        })
        var delayFunc=setInterval(function(){
            showPopup('Second Row',"We Got a Middle Line Winner");
            clearInterval(delayFunc);
        },1000)
    }
})
nodeRef = ref(database,"Games/"+gameDate+"/"+gameTime+"/winners/thirdrow");
onValue(nodeRef,(snapshot)=>{
    var winnerTicks='';
    var winnerNames='';
    var winners=[];
    if(snapshot.val()!=null){
        snapshot.child('/winnerJSon').forEach((child)=>{
            document.getElementById("t-r-w-ticket").innerHTML="";
            document.getElementById('tr-ticket-container').innerHTML="";
            if(child.child('/winner').val()!=null&&winners.includes(child.child('/winner').val())==false){
                winners.push(child.child('/winner').val())
                const nodeRef = ref(database,"Games/"+gameDate+"/"+gameTime+"/tickets/"+child.child('/winner').val());
                onValue(nodeRef,(d)=>{
                    const main=document.getElementById('box-contain-tickets');
                    const span=document.createElement('span');
                    span.textContent=child.child('/winner').val()+" ("+d.child('/owner').val()+") - ";
                    document.getElementById("t-r-w-ticket").appendChild(span);
                    winnerTicks=winnerTicks+"-"+child.child('/winner').val();
                    winnerNames=winnerNames+"-"+d.child('/owner').val()
                    if( document.getElementById('tr-winner-name')!=null){
                        const spanName=document.createElement('span');
                        const spanTic=document.createElement('span');
                        spanName.textContent=d.child('/owner').val()+' - ';
                        spanTic.textContent=child.child('/winner').val()+' - ';
                        document.getElementById('tr-winner-name').appendChild(spanName)
                        document.getElementById('tr-ticket-no').appendChild(spanTic)
                    }
                    setTimeout(function(){
                        main.childNodes.forEach((a)=>{
                            if(a.nodeType==Node.ELEMENT_NODE){
                                if(a.className=="ticket"){
                                    var divTicketno=a.getAttribute('data-ticketno');
                                    if(divTicketno==(d.key-1))
                                    {   var clon=a.cloneNode(true);
                                        clon.style.display='flex';
                                        clon=winnerTicketInstace(clon,snapshot.child('/index').val())
                                        document.getElementById('tr-ticket-container').appendChild(clon);
                                    }
                                }
                            }
                        })
                    },100)
                },{onlyOnce:true})
            }
        })
        var delayFunc=setInterval(function(){
            showPopup('Third Row',"We Got a Bottom Line Winner");
            clearInterval(delayFunc);
        },1000)
    }
})
nodeRef = ref(database,"Games/"+gameDate+"/"+gameTime+"/winners/corner");
onValue(nodeRef,(snapshot)=>{
    var winnerTicks='';
    var winnerNames='';
    var winners=[];
    if(snapshot.val()!=null){
        snapshot.child('/winnerJSon').forEach((child)=>{
            document.getElementById("corner-w-ticket").innerHTML="";
            document.getElementById('fc-ticket-container').innerHTML="";
            if(child.child('/winner').val()!=null&&winners.includes(child.child('/winner').val())==false){
                winners.push(child.child('/winner').val())
                const nodeRef =ref(database,"Games/"+gameDate+"/"+gameTime+"/tickets/"+child.child('/winner').val());
                onValue(nodeRef,(d)=>{
                    const main=document.getElementById('box-contain-tickets');
                    const span=document.createElement('span');
                    span.textContent=child.child('/winner').val()+" ("+d.child('/owner').val()+") - ";
                    document.getElementById("corner-w-ticket").appendChild(span);
                    winnerTicks=winnerTicks+"-"+child.child('/winner').val();
                    winnerNames=winnerNames+"-"+d.child('/owner').val()
                    if( document.getElementById('fc-winner-name')!=null){
                        const spanName=document.createElement('span');
                        const spanTic=document.createElement('span');
                        spanName.textContent=d.child('/owner').val()+' - ';
                        spanTic.textContent=child.child('/winner').val()+' - ';
                        document.getElementById('fc-winner-name').appendChild(spanName)
                        document.getElementById('fc-ticket-no').appendChild(spanTic)
                    }
                    setTimeout(function(){
                        main.childNodes.forEach((a)=>{
                            if(a.nodeType==Node.ELEMENT_NODE){
                                if(a.className=="ticket"){
                                    var divTicketno=a.getAttribute('data-ticketno');
                                    if(divTicketno==(d.key-1))
                                    {   var clon=a.cloneNode(true);
                                        clon.style.display='flex';
                                        clon=winnerTicketInstace(clon,snapshot.child('/index').val())
                                        document.getElementById('fc-ticket-container').appendChild(clon);
                                    }
                                }
                            }
                        })
                    },100)
                })
            }
        })
        var delayFunc=setInterval(function(){
            showPopup('Four Corner',"We got a Four Corner Winner");
            clearInterval(delayFunc);
        },1000)
    }
})
nodeRef = ref(database,"Games/"+gameDate+"/"+gameTime+"/winners/fullhouse");
onValue(nodeRef,(snapshot)=>{
    var winnerTicks='';
    var winnerNames='';
    var winners=[];
    if(snapshot.val()!=null){
        snapshot.child('/winnerJSon').forEach((child)=>{
            document.getElementById("f-h-w-ticket").innerHTML="";
            document.getElementById('fh-ticket-container').innerHTML="";
            if(child.child('/winner').val()!=null&&winners.includes(child.child('/winner').val())==false){
                winners.push(child.child('/winner').val())
                const nodeRef = ref(database,"Games/"+gameDate+"/"+gameTime+"/tickets/"+child.child('/winner').val());
                onValue(nodeRef,(d)=>{
                    const main=document.getElementById('box-contain-tickets');
                    const span=document.createElement('span');
                    span.textContent=child.child('/winner').val()+" ("+d.child('/owner').val()+") - ";
                    document.getElementById("f-h-w-ticket").appendChild(span);
                    winnerTicks=winnerTicks+"-"+child.child('/winner').val();
                    winnerNames=winnerNames+"-"+d.child('/owner').val()
                    if( document.getElementById('fh-winner-name')!=null){
                        const spanName=document.createElement('span');
                        const spanTic=document.createElement('span');
                        spanName.textContent=d.child('/owner').val()+' - ';
                        spanTic.textContent=child.child('/winner').val()+' - ';
                        document.getElementById('fh-winner-name').appendChild(spanName)
                        document.getElementById('fh-ticket-no').appendChild(spanTic)
                    }
                    setTimeout(function(){
                        main.childNodes.forEach((a)=>{
                            if(a.nodeType==Node.ELEMENT_NODE){
                                if(a.className=="ticket"){
                                    var divTicketno=a.getAttribute('data-ticketno');
                                    if(divTicketno==(d.key-1))
                                    {   var clon=a.cloneNode(true);
                                        clon.style.display='flex';
                                        clon=winnerTicketInstace(clon,snapshot.child('/index').val())
                                        document.getElementById('fh-ticket-container').appendChild(clon);
                                    }
                                }
                            }
                        })
                    },100)
                })
            }
        })
        var delayFunc=setInterval(function(){
            showPopup('Full-House',"We Got a Full House Winner");
            clearInterval(delayFunc);
        },1000)
    }
})
nodeRef = ref(database,"Games/"+gameDate+"/"+gameTime+"/winners/Secondfullhouse");
onValue(nodeRef,(snapshot)=>{
    var winnerTicks='';
    var winnerNames='';
    var winners=[];
    if(snapshot.val()!=null){
        snapshot.child('/winnerJSon').forEach((child)=>{
            document.getElementById("s-f-h-w-ticket").innerHTML="";
            document.getElementById('sfh-ticket-container').firstChild="";
            if(child.child('/winner').val()!=null&&winners.includes(child.child('/winner').val())==false){
                winners.push(child.child('/winner').val())
                const nodeRef = ref(database,"Games/"+gameDate+"/"+gameTime+"/tickets/"+child.child('/winner').val());
                onValue(nodeRef,(d)=>{
                    const main=document.getElementById('box-contain-tickets');
                    const span=document.createElement('span');
                    span.textContent=child.child('/winner').val()+"("+d.child('/owner').val()+") - ";
                    document.getElementById("s-f-h-w-ticket").appendChild(span);
                    winnerTicks=winnerTicks+"-"+child.child('/winner').val();
                    winnerNames=winnerNames+"-"+d.child('/owner').val()
                    if( document.getElementById('sfh-winner-name')!=null){
                        const spanName=document.createElement('span');
                        const spanTic=document.createElement('span');
                        spanName.textContent=d.child('/owner').val()+' - ';
                        spanTic.textContent=child.child('/winner').val()+' - ';
                        document.getElementById('sfh-winner-name').appendChild(spanName)
                        document.getElementById('sfh-ticket-no').appendChild(spanTic)
                    }
                    setTimeout(function(){
                        main.childNodes.forEach((a)=>{
                            if(a.nodeType==Node.ELEMENT_NODE){
                                if(a.className=="ticket"){
                                    var divTicketno=a.getAttribute('data-ticketno');
                                    if(divTicketno==(d.key-1))
                                    {   var clon=a.cloneNode(true);
                                        clon.style.display='flex';
                                        clon=winnerTicketInstace(clon,snapshot.child('/index').val())
                                        document.getElementById('sfh-ticket-container').appendChild(clon);
                                    }
                                }
                            }
                        })
                    },100)
                })
            }
        })
        var delayFunc=setInterval(function(){
            showPopup('2nd Full House',"We Got a 2nd Full House Winner");
            clearInterval(delayFunc);
        },1000)
    }
})
nodeRef = ref(database,"Games/"+gameDate+"/"+gameTime+"/winners/sheetwinner");
onValue(nodeRef,(snapshot)=>{
    var winnerTicks='';
    var winnerNames='';
    var winners=[];
    if(snapshot.val()!=null){
        snapshot.child('/winnerJSon').forEach((child)=>{
            document.getElementById("sheet-w-ticket").innerHTML="";
            document.getElementById('sheet-ticket-container').innerHTML="";
            if(child.child('/winner').val()!=null&&winners.includes(child.child('/winner').val())==false){
                winners.push(child.child('/winner').val())
                const nodeRef = ref(database,"Games/"+gameDate+"/"+gameTime+"/tickets");
                onValue(nodeRef,(d)=>{
                    var shouldskip=false;
                    d.forEach((data)=>{
                        if(child.child('/winner').val()==data.child('/sheetno').val()&&shouldskip==false){
                            const main=document.getElementById('box-contain-tickets');
                            const span=document.createElement('span');
                            span.textContent=child.child('/winner').val()+"("+data.child('/owner').val()+") - ";
                            document.getElementById("sheet-w-ticket").appendChild(span);
                            winnerTicks=winnerTicks+"-"+child.child('/winner').val();
                            winnerNames=winnerNames+"-"+data.child('/owner').val()
                            if( document.getElementById('s-winner-name')!=null){
                                const spanName=document.createElement('span');
                                const spanTic=document.createElement('span');
                                spanName.textContent=data.child('/owner').val()+' - ';
                                spanTic.textContent=child.child('/winner').val()+' - ';
                                document.getElementById('s-winner-name').appendChild(spanName)
                                document.getElementById('s-ticket-no').appendChild(spanTic)
                            }
                            shouldskip=true;
                            setTimeout(function(){
                                main.childNodes.forEach((a)=>{
                                    if(a.nodeType==Node.ELEMENT_NODE){
                                        if(a.className=="ticket"){
                                            var divTicketno=a.getAttribute('data-sheetno');
                                            if(divTicketno==data.child('/sheetno').val())
                                            {   var clon=a.cloneNode(true);
                                                clon.style.display='flex';
                                                clon=winnerTicketInstace(clon,snapshot.child('/index').val())
                                                document.getElementById('sheet-ticket-container').appendChild(clon);
                                            }
                                        }
                                    }
                                })
                            },100)
                        }
                    })
                })
            }
        })
        var delayFunc=setInterval(function(){
            showPopup('Sheet Winner',"We Got a Sheet Winner");
            clearInterval(delayFunc);
        },1000)
    }
})
function winnerTicketInstace(clon,index){
    clon.childNodes.forEach((a)=>{
        if(a.nodeType==Node.ELEMENT_NODE){
            if(a.className=="ticketsvalue"){
                a.childNodes.forEach((x)=>{
                            if(x.className=="row-one"){
                                x.childNodes.forEach((z)=>{
                                    if(z.nodeName=="DIV"){
                                     z.style.backgroundColor='white'
                                     z.style.color='black'
                                    }
                                })
                                x.childNodes.forEach((z)=>{
                                    if(z.nodeName=="DIV"){
                                        for(var i=0;i<=index;i++){
                                            if(parseInt(z.textContent)===drawn_number[i]){
                                                z.style.backgroundColor="black";
                                                z.style.color="white";
                                                console.log(z.style.backgroundColor)
                                                continue;
                                            }
                                        }
                                    }
                                })
                                return;
                            }
                            if(x.className=="row-two"){
                                x.childNodes.forEach((z)=>{
                                    if(z.nodeName=="DIV"){
                                     z.style.backgroundColor='white'
                                     z.style.color='black'
                                    }
                                })
                                x.childNodes.forEach((z)=>{
                                    if(z.nodeName=="DIV"){
                                        for(var i=0;i<=index;i++){
                                            if(parseInt(z.textContent)===drawn_number[i]){
                                                console.log(z.textContent+"\t"+drawn_number[i]+"\t"+(parseInt(z.textContent)===drawn_number[i]))
                                                z.style.backgroundColor="black";
                                                z.style.color="white";
                                                console.log(z.style.backgroundColor)
                                                continue;
                                            }
                                        }
                                    }
                                })
                            return;
                            }
                            if(x.className=="row-three"){
                                x.childNodes.forEach((z)=>{
                                    if(z.nodeName=="DIV"){
                                     z.style.backgroundColor='white'
                                     z.style.color='black'
                                    }
                                })
                                x.childNodes.forEach((z)=>{
                                    if(z.nodeName=="DIV"){
                                        for(var i=0;i<=index;i++){
                                            if(parseInt(z.textContent)===drawn_number[i]){
                                                console.log(z.textContent+"\t"+drawn_number[i]+"\t"+(parseInt(z.textContent)===drawn_number[i]))
                                                z.style.backgroundColor="black";
                                                z.style.color="white";
                                                console.log(z.style.backgroundColor)
                                                continue;
                                            }
                                        }
                                    }
                                })
                            return;
                            }
                })
            }
        }
    })
    return clon;
}
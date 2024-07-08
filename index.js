const bodyParser = require('body-parser');
const express=require('express');
const crypto=require('crypto');
const fs=require('fs');
const gen_random=require("./random");
const csrf=require("csurf");
const cookieparser=require('cookie-parser')
const open =require('open');
var Port=process.env.PORT||5000;
const app=express();
const http=require('http')
const server=http.createServer(app)
const bingo=require('bingo-card-generator')
const {Server}=require('socket.io');
const io=new Server(server)
const csrfMiddleware=csrf({cookie:true});
var admin = require("firebase-admin");
var serviceAccount = require("./tambola-ceab3-firebase-adminsdk-e0nyx-215f093368");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tambola-ceab3-default-rtdb.asia-southeast1.firebasedatabase.app/"
});
const winning=require('./winningpattern')
//Custom Modules
const firebase=require("./firebase_connect");
const f_ref=admin.database();
const set_data_firebase=require("./set-data-firebase");
const { gen_ticket, setWholenumber } = require('./generateticket');
const { response } = require('express');
var first_row_winner=undefined,second_row_winner=undefined,third_row_winner=undefined,first_fullhouse_winner=undefined,second_fullhouse_winner=undefined,first_five_winnder=undefined,corner_winner=undefined,sheet_winner=undefined;
var f_fullhouse_winner_status=false,s_fullhouse_winner_status=false,first_row_winner_status=false,second_row_winner_status=false,third_row_winner_status=false,firstfive_winner_status=false,corner_winner_status=false,sheet_winner_status=false;
app.use(bodyParser.json())
app.use(express.static(__dirname))
app.use(cookieparser())
app.use(express.urlencoded({extended:true}))
app.engine('html', require('ejs').renderFile);
app.get('/',function(req,res){
    if(req.cookies.session!=undefined){
        res.redirect('/admin');
    }
    else{
        res.render('index.html')
    }    
})
app.get('/player',(req,res)=>{
    currentGameDate=req.query.date;
    currentGametime=req.query.time;
    currentGametickets=req.query.ticket;
    f_ref.ref("Games").once('value',(snapshot)=>{
        if(snapshot.val()==null){
            res.send("<h1 styele='text-align:center;margin-top:50px;'>No Such Game Available<h1>")
        }
        else{
            var count=0;
            snapshot.forEach((d)=>{
                if(currentGameDate==d.key){
                    d.forEach((childdata)=>{
                        if(childdata.key==currentGametime){
                            if(d.child("/"+currentGametime+"/gameDetails/started").val()==false){
                                res.send("<h1 style='text-align:center;margin-top:50px;'>Game Has not Started Yet<h1><a href='/' style='width:100%;text-align:center;background-color:aqua;'><h3 style='font-size:20px;'>Click here to go home</h3></a>")
                            }
                            else{
                                res.render('player.html')
                            }
                            count++;
                        }
                    })
                }
            })
            if(count==0){
                res.send("<h1 style='text-align:center;margin-top:50px;'>No Such Game Available<h1><a href='/' style='width:100%;text-align:center;background-color:aqua;'><h3 style='font-size:20px;'>Click here to go home</h3></a>")
            }
        }
    })
    
    
})
app.post('/setData',function(req,res){
    f_ref.ref("Games").once('value',(snapshot)=>{
    if(snapshot.child(req.body.date+"/"+req.body.time).val()!=null){
        res.status(424).send();
        return;
    }
    else{
        f_ref.ref("Games/"+req.body.date+"/"+req.body.time+"/gameDetails").set({
            gameName:req.body.gameName,
            nooftickets:req.body.noofTickets*6,
            started:false,
            finished:false,
            paypticket:req.body.paypticket,
            fhprize:req.body.fhprize,
            sfhprize:req.body.sfhprize,
            frprize:req.body.frprize,
            srprize:req.body.srprize,
            trprize:req.body.trprize,
            fcprize:req.body.fcprize,
            ffprize:req.body.ffprize,
            sprize:req.body.sprize 
        })
        res.redirect("/createticket/?ticket="+req.body.noofTickets+"&date="+req.body.date+"&time="+req.body.time);
    }
    
})
})
app.use(csrfMiddleware);
app.all("*",(req,res,next)=>{
    res.cookie("XSRF-TOKEN",req.csrfToken());
    next();
});
app.get('/loginPage',(req,res)=>{
    if(req.cookies.session!=undefined){
        res.redirect('/admin')
    }else{
        res.render('admin-login.html')
    }
})
app.post("/sessionLogin",(req,res)=>{
    const idToken=req.body.idToken.toString();
      //const csrfToken=req.body.csrfToken.toString();
      
      //console.log(result[0].pro_id);
      const expiresIn=60*60*24*5*1000;
      admin.auth().createSessionCookie(idToken,{expiresIn})
      .then(
          (sessionCookie)=>{
              const options={maxAge:expiresIn,httpOnly:true,secure:true};
              res.cookie('session',sessionCookie,options);
              
              res.end(JSON.stringify({status:"Success"}));
          },
          (error)=>{
              res.status(401).send("UNAUTHORIZED REQUEST!");
          });
})
app.get('/admin',function(req,res){
    const sessionCookie=req.cookies.session||"";
    admin.auth().verifySessionCookie(sessionCookie,true)
    .then(()=>{
        res.render('admin-index.html')
    }).catch((error)=>{
        res.redirect('/loginPage')
    })
    
})
var currentGameDate,currentGametim,currentGametickets;
app.get('/game',function(req,res){
    f_ref.ref("Games").once('value',(snapshot)=>{
        if(snapshot.val()==null){
            res.send("<h1 styele='text-align:center;margin-top:50px;'>No Such Game Available<h1>")
        }
        else{
            var count=0;
            snapshot.forEach((d)=>{
                
                if(req.query.date==d.key){
                    
                    d.forEach((childdata)=>{
                        if(childdata.key==req.query.time){
                            clearInterval(setTimer);
                            
                            
                                var data=[];
                                first_row_winner=undefined,second_row_winner=undefined,third_row_winner=undefined,first_fullhouse_winner=undefined,second_fullhouse_winner=undefined,first_five_winnder=undefined,corner_winner=undefined,sheet_winner=undefined;
                                f_fullhouse_winner_status=false,s_fullhouse_winner_status=false,first_row_winner_status=false,second_row_winner_status=false,third_row_winner_status=false,firstfive_winner_status=false,corner_winner_status=false,sheet_winner_status=false;
                            
                            
                                currentGameDate=req.query.date;
                                currentGametime=req.query.time;
                                currentGametickets=req.query.ticket;
                                
                                history=[];
                                f_ref.ref("Games/"+req.query.date+"/"+req.query.time+"/tickets").once('value',(snapshot)=>{
                                    snapshot.forEach((d)=>{
                                        data.push(d);
                                    })
                            
                                    
                                    fs.writeFileSync("./data.json",JSON.stringify(data));
                                    winning.setdata(currentGametickets);
                                            res.render('game.html')
                                        
                                    
                                },(error)=>{
                                    if(!error){
                                        
                                    }
                                })
                                
                            
                            count++;
                        }
                    })
                    
                    
                }
               
            })
            if(count==0){
                res.send("<h1 style='text-align:center;margin-top:50px;'>No Such Game Available<h1><a href='/' style='width:100%;text-align:center;background-color:aqua;'><h3 style='font-size:20px;'>Click here to go home</h3></a>")
            }
        }
    })
    
   
})
app.get("/createticket",function(req,res){
    var no_of_tickets=req.query.ticket;  
    var sheets=[];
    for(var i=0;i<no_of_tickets;i++){
       var ti=gen_random.gen_ticket(); 
       sheets.push(ti);
       
     }
    var ticketno=1;
    for(var i=0;i<sheets.length;i++){
        
        for(var j=0;j<6;j++){
            f_ref.ref("Games/"+req.query.date+"/"+req.query.time+"/tickets/"+ticketno).set({
                owner:'admin',
                sheetno:i+1,
                taken:false,
                ticket:sheets[i][j]
            },(error)=>{
                if(error)res.status(424).send();
                else{
                    res.status(200).send();
                }
            })
            ticketno++;
        }
    
    }
    
    
}) 
var history=[];
var setTimer;
io.of("/games").on('connection',(socket)=>{
    socket.emit('old',history);
    
        
    socket.on("start",(msg)=>{
        socket.broadcast.emit("willstart",msg);
        setTimer=setInterval(randomNo,10000);
    });
    
    
    const randomNo=function(){
        var rand=Math.floor(Math.random()*100)
        while(history.includes(rand)==true||rand==0||rand>90){
            rand=Math.floor(Math.random()*100)
        }
        history.push(rand)
       
        
        socket.emit('Random',rand);
        socket.broadcast.emit('Random',rand);
        winner(rand)
        if(history.length>=90){
            clearInterval(setTimer);
        }
       
        if(firstfive_winner_status===true&&corner_winner_status===true&&sheet_winner_status===true&&first_row_winner_status===true&&second_row_winner_status===true&&third_row_winner_status===true&&f_fullhouse_winner_status===true&&s_fullhouse_winner_status===true){
            socket.emit('game-end',"All the Winners are Out!!! Game Has Ended");
            socket.broadcast.emit('game-end',"All the Winners are Out!!! Game Has Ended");
            clearInterval(setTimer);
            
        }
    } 
})
function winner(rand){
    winning.update(rand);
    
   
    if(first_row_winner_status==false){
        first_row_winner=winning.firstrow();
        
        if(first_row_winner.length!=0){
            var winnerJSon=[];           
            console.log('First Row \t'+first_row_winner);
            for(var i=0;i<first_row_winner.length;i++){
                winnerJSon.push({"winner":parseInt(first_row_winner[i]+1)})
            }
            
            f_ref.ref("Games/"+currentGameDate+"/"+currentGametime).child("winners/firstrow/").set({winnerJSon,index:history.length-1});
            first_row_winner_status=true;
        }
    }
    if(second_row_winner_status==false){
        second_row_winner=winning.secondrow();
        
        if(second_row_winner.length!=0){
          
            var winnerJSon=[]; 
            console.log('Second Row \t'+second_row_winner);
            for(var i=0;i<second_row_winner.length;i++){
                winnerJSon.push({"winner":parseInt(second_row_winner[i]+1)})
            }
           
            f_ref.ref("Games/"+currentGameDate+"/"+currentGametime).child("winners/secondrow/").set({winnerJSon,index:history.length-1});
            second_row_winner_status=true;
        }
    }
    if(third_row_winner_status==false){
        third_row_winner=winning.thirdrow();
        
        if(third_row_winner.length!=0){
          
            console.log('Third Row \t'+third_row_winner);
            var winnerJSon=[]; 
           
            for(var i=0;i<third_row_winner.length;i++){
                winnerJSon.push({"winner":parseInt(third_row_winner[i]+1)})
            }
           
            f_ref.ref("Games/"+currentGameDate+"/"+currentGametime).child("winners/thirdrow/").set({winnerJSon,index:history.length-1});
            third_row_winner_status=true;
        }
    }
    if(f_fullhouse_winner_status==false){
        first_fullhouse_winner=winning.fullhouse();
        
        if(first_fullhouse_winner.length!=0){
          
            console.log('First FH \t'+first_fullhouse_winner);
            var winnerJSon=[]; 
           
            for(var i=0;i<first_fullhouse_winner.length;i++){
                winnerJSon.push({"winner":parseInt(first_fullhouse_winner[i]+1)})
            }
           
            f_ref.ref("Games/"+currentGameDate+"/"+currentGametime).child("winners/fullhouse/").set({winnerJSon,index:history.length-1});
           
            f_fullhouse_winner_status=true;
        }
        
    }
    if(f_fullhouse_winner_status==true){
        if(s_fullhouse_winner_status==false){
            second_fullhouse_winner=winning.sfullhouse();
            
            if(second_fullhouse_winner.length!=0){
          
                console.log('First FH \t'+second_fullhouse_winner);
                var winnerJSon=[]; 
           
            for(var i=0;i<second_fullhouse_winner.length;i++){
                winnerJSon.push({"winner":parseInt(second_fullhouse_winner[i]+1)})
            }
           
            f_ref.ref("Games/"+currentGameDate+"/"+currentGametime).child("winners/Secondfullhouse/").set({winnerJSon,index:history.length-1});
                s_fullhouse_winner_status=true;
            }
           
        }
    }
    if(firstfive_winner_status==false){
        first_five_winnder=winning.firstfive();
        
        if(first_five_winnder.length!=0){
            console.log("FH\t"+first_five_winnder);
            var winnerJSon=[]; 
           
            for(var i=0;i<first_five_winnder.length;i++){
                winnerJSon.push({"winner":parseInt(first_five_winnder[i]+1)})
            }
           
            f_ref.ref("Games/"+currentGameDate+"/"+currentGametime).child("winners/firstfive/").set({winnerJSon,index:history.length-1});
            
            
            firstfive_winner_status=true;
        }
    }
    
    if(corner_winner_status==false){
        corner_winner=winning.corner();
        
        if(corner_winner.length!=0){
           
            console.log('Corner\t'+corner_winner);
            var winnerJSon=[]; 
           
            for(var i=0;i<corner_winner.length;i++){
                winnerJSon.push({"winner":parseInt(corner_winner[i]+1)})
            }
           
            f_ref.ref("Games/"+currentGameDate+"/"+currentGametime).child("winners/corner/").set({winnerJSon,index:history.length-1});
           
            corner_winner_status=true;
        }
    }
    if(sheet_winner_status==false){
        sheet_winner=winning.sheetwinner();
        if(sheet_winner.length!=0){
            console.log('sheet \t'+sheet_winner);
            var winnerJSon=[]; 
           
            for(var i=0;i<sheet_winner.length;i++){
                winnerJSon.push({"winner":parseInt(sheet_winner[i]+1)})
            }
           
            f_ref.ref("Games/"+currentGameDate+"/"+currentGametime).child("winners/sheetwinner/").set({winnerJSon,index:history.length-1});
            
            sheet_winner_status=true;
            
        }
      
        
       
    }
    
    
    
    
}
app.get("/sessionlogout",function(req,res){
    res.clearCookie("session");
    //fs.writeFileSync("./data/log.json",JSON.stringify({logged:false}));
    res.redirect("/");
    
  });
server.listen(Port,()=>{
    console.log("listening on "+Port)
})
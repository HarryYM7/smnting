var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
const APP_TOKEN = "EAAXmNF7aGREBALdxrZBWPQQIh9rWIIy5RfaW8TnRsqyi6rEDbI5LZC5F8coSJ35EwAuSBwAP5rrsFh8znjN2JjT3veBgpWebzF82DeQZCPoH1TWHgHYSUZBkPxTvoynZA6tndvZA2GUNd8ZAJtAydQB4Azrrmo6XjwUeuFnwohUXAZDZD";
var app = express();
app.use(bodyParser.json());

app.listen(8080, function(){
console.log("servidor online");
});
app.get('/', function(req, resp){
resp.send("hola");
});

app.get('/webhook', function(req, resp){
if(req.query['hub.verify_token']=== 'Yuimizuno7#'){

resp.send(req.query['hub.challenge']);

}else{resp.send('acceso no autorizado');}
});

app.post('/webhook', function(req, resp){
var data = req.body;

if(data.object == 'page'){
data.entry.forEach(function(pageEntry){
pageEntry.messaging.forEach(function(messagingEvent){
console.log("entro");
if(messagingEvent.message){

receiveMessage(messagingEvent);}
});

});

resp.sendStatus(200);
}
});




function receiveMessage(event){
var senderID = event.sender.id;
var messageText = event.message.text;

console.log(senderID);
console.log(messageText);
eMessage(senderID, messageText);
}

function eMessage(recipientId, message){
var finalMessage = '';
if(isContain(message,'bug')){
finalMessage = 'gracias por reportar el bug';
}else{
finalMessage = 'gracias por comunicarte a Harry IC, en un momento te atenderemos';}
sendMessageText(recipientId, finalMessage);
}

function isContain(sentence, word){
return sentence.indexOf(word) > -1;
}
function sendMessageText(recipientId, message){
var messageData ={
recipient : {
id:recipientId
},
message :{
text: message
}
};
callSAPI(messageData);
}

function callSAPI(messageData){
request({
uri: 'https://graph.facebook.com/v2.6/me/messages',
qs: {access_token: APP_TOKEN},
method: 'POST',
json: messageData
}, function(error,response,data){
if(error){
console.log("error");
}
else{console.log("susess");}
});
}
var socket = require('socket.io-client')('http://stuffcontrol.ddns.net:8000');
var path = require('path');
var sys = require('sys')
var exec = require('child_process').exec;
var fs = require('fs');


var child;
var camera_id = "3GYZKGGyEZNKmWw";
var things = [];
  things.push("3GYZKGGyEZNKmWw");
var emitir = false;

  socket.on('connect', function(){
  	socket.emit('joinserver','3GYZKGGyEZNKmWw','camera',things);
  	socket.emit('joincamera','3GYZKGGyEZNKmWw');
  		//takeImage();
  });
  socket.on('event', function(data){});
  socket.on('disconnect', function(){});
  socket.on('people', function(data){
    console.log(data)
    if (data != "0"){
      emitir = true;
      takeImage()
    }
    else{
      emitir = false;
    }
  })


function takeImage() {
    exec('raspistill -w 640 -h 480 -t 10 -o ./stream/image.jpg', function(){
      if(emitir){
    	sendImage();
      }
    });
}

function sendImage() {
    fs.readFile('./stream/image.jpg', function(err, buffer){
        socket.emit('liveStream',"3GYZKGGyEZNKmWw" ,buffer.toString('base64'));
        takeImage();
    });
}
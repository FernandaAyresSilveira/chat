// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
require("jquery")
//require ('rails_autolink')

import chatRoomChannel from "../channels/chat_room_channel";

$(document).on('turbolinks:load', function () {
  $("form#set_name").on('submit', function(e){
    e.preventDefault();
    let name = $('#add_name').val();
    sessionStorage.setItem('chat_room_name', name)
    chatRoomChannel.assistant({name});
    chatRoomChannel.announce({ name, type: 'join'})
    $("#modal").css('display', 'none');
  });

  $("form#send_message").on('submit', function(e){
    e.preventDefault('send_message');
    let message = $('#message').val();
    if (message.length > 0) {
      chatRoomChannel.speak(message);
      chatRoomChannel.assistant({message});
      $('#message').val('')
    }
  });

  $(window).on('beforeunload', function() {
    let name = sessionStorage.getItem('chat_room_name')
    chatRoomChannel.announce({ name, type: 'leave'})
  });

  $("#message").keydown(function() {
    var s = "mconf";
    var msg = $("#message").val();
    var newmsg = '';
    var pattern = '#1f528b';
    var color = ['#481E9D', '#8D74C0', '#CA4B57', '#2B2D42', '#1C77C3', '#81B29A', '#E98039'];
    color.sort(() => Math.random() - 0.5);
    //console.log(color);
    var meet =  $("#meet").val();
    console.log(msg.match(/mconf/gi));
    if (msg.match(/mconf/gi) != null && meet==0) {

      var re = /mconf/gi;
      newmsg = msg.replace(re,`<b style='color:${color[1]}'>MConf</b>`);
      //console.log(newmsg);

      $("#message").val('');
      $("#message").val(newmsg);

      const d = document.getElementById("message");
      d.innerHTML = newmsg;
      $("#meet").val(1);
      $('#main').css('backgroundColor',color[0]);
    }else{
      if (msg.indexOf("mconf") == -1) {
         $("#meet").val(0);
         $('#main').css('backgroundColor',pattern);
      }
    }
    
  });
})
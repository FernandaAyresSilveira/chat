import consumer from "./consumer"
 


const chatRoomChannel = consumer.subscriptions.create("ChatRoomChannel", {
  connected() {
    console.log("Connected to the chat room!");
    $("#modal").css('display', 'flex');
  },

  disconnected() {

  },

  received(data) {
    //$('#messages').append('<p class="received"> ' + data.message + '</p>');
    if (data.message) {
      console.log("received"+data);
      let current_name = sessionStorage.getItem('chat_room_name')
      let msg_class = data.sent_by === current_name ?   "received":"sent"
      $('#messages').append(`<p class='${msg_class}'>` + data.message + '</p>')
    } else if(data.chat_room_name) {
      let name = data.chat_room_name;
      let announcement_type = data.type == 'join' ? 'joined' : 'left';
      $('#messages').append(`<p class="announce"><em>${name}</em> ${announcement_type} the room</p>`)
    }
  },

  assistant(data){
    var msg ='';
    var msg_db ='';
    var send = 'assistant';
    var date = new Date();
    var date_formated = date.getDate() + '/' + (date.getMonth() + 1) + '/' 
                      + date.getFullYear() + ' '+ date.getHours() + ':' + date.getMinutes(); 
   
    if (data.name) { 

      msg = `<p class="announce"><small>${date_formated}</small>  <em>${data.name}</em> seja bem-vindo(a)</p>`;

      this.perform('speak',{ name: send,message: msg  });//enviando a msg p bd
      $('#messages').load('home/last', function(){
        $('#messages').animate({scrollTop: $('#messages')[0].scrollHeight}, 500);
      });

      msg = `<p class='received'><small>${date_formated}</small><br/> Como posso lhe ajudar?<br>
        Escolha uma opção: <br>
        1. E-mail para contato <br>
        2. Dúvidas sobre Elos <br>
        3. Elogios <br>
        4. Como utilizar o Elos<br>
        5. Todos participantes precisam de conta?<br>
        6. Acesso por celular e tablet<br>
        7. Qual câmera posso utilizar?<br>
        8. Criando sua conta<br>
         </p>`;
      //$('#messages').append( msg );
      this.perform('speak',{ name: send,message: msg });
      $('#messages').load('home/last', function(){
        $('#messages').animate({scrollTop: $('#messages')[0].scrollHeight}, 500);
      });

    }else{
      if (data.message) {
       // console.log(data.message);
        let message = data.message;
        let message_complete =  `<p class='sent'> <small>${date_formated}</small><br/> ${message}</p>`;
        this.perform('speak',{  name: name, message:message_complete })
        message = parseInt(data.message);

          


        if (data.message.length ==1) {//escolheu uma opção

          let name =  data.name;


          switch (message) {
            case 1:
              msg = `<p class='received'> <small>${date_formated}</small><br/> Para entrar em contato diretamente por e-mail:
                <b>contato@elos.vc</b> </p>`;
              //$('#messages').append(msg);
                this.perform('speak',{  name: send,message: msg });//enviando a msg p bd
                $('#messages').load('home/last', function(){
                  $('#messages').animate({scrollTop: $('#messages')[0].scrollHeight}, 500);
                });
              break;
            case 2:
              msg = `<p class='received'> <small>${date_formated}</small><br/> Deixe aqui sua dúvida que o setor de atendimento entrará
                em contato o mais breve possível: </p>`;
              //$('#messages').append(msg);
              this.perform('speak',{name: send,message: msg });//enviando a msg p bd
              $('#messages').load('home/last', function(){
                $('#messages').animate({scrollTop: $('#messages')[0].scrollHeight}, 500);
              });
            break;
            case 3:
              msg = `<p class='received'> <small>${date_formated}</small><br/> 
                Deixe aqui seu elogio que o setor de atendimento, sua mensagem é muito importante para nós! </p>`;
              //$('#messages').append(msg)
                this.perform('speak',{ name: send,message: msg });//enviando a msg p bd
                $('#messages').load('home/last', function(){
                $('#messages').animate({scrollTop: $('#messages')[0].scrollHeight}, 500);
              });
            break;

            case 4:
              msg=`<p class='received'> <small>${date_formated}</small><br/>                 
                Usar o Elos é simples. Basta ter conexão com a internet e uma conta, 
                nenhuma instalação é necessária. Acesse nossa Central de Ajuda para conhecer 
                todas as funcionalidades do Elos: 
                <a href="https://ajuda.elos.vc/kb/article/150995/tudo-sobre-o-elos"> Veja aqui</a> </p>`;
             // $('#messages').append(msg)
                this.perform('speak',{  name: send,message: msg});//enviando a msg p bd
                $('#messages').load('home/last', function(){
                  $('#messages').animate({scrollTop: $('#messages')[0].scrollHeight}, 500);
                });
            break;
            case 5:
              msg =`<p class='received'> <small>${date_formated}</small><br/> 
                Não. Somente o dono da sala de videoconferência precisa ter conta, os demais podem entrar na reunião 
                utilizando a opção "convidado"! </p>`;
              //$('#messages').append(msg)
                this.perform('speak',{ name: send,message: msg });//enviando a msg p bd
                $('#messages').load('home/last', function(){
                  $('#messages').animate({scrollTop: $('#messages')[0].scrollHeight}, 500);
                });
            break;
            case 6:
              msg = `<p class='received'> <small>${date_formated}</small><br/> 
                A plataforma é totalmente online, e você pode acessá-la em qualquer dispositivo que tenha um navegador </p>`;
              //$('#messages').append(msg)
                this.perform('speak',{ name: send,message: msg });//enviando a msg p bd
                $('#messages').load('home/last', function(){
                  $('#messages').animate({scrollTop: $('#messages')[0].scrollHeight}, 500);
                });
            break;
            case 7:
              msg = `<p class='received'> <small>${date_formated}</small><br/> 
                Qualquer câmera ou webcam que você conectar no seu computador e for detectada pelo seu sistema operacional será suportada pelo Elos,  
                inclusive as que já vêm em notebooks. Por facilidade, muitos usuários costumam utilizar webcams 
                com conexão USB, que possuem qualidade suficiente para a transmissão e que são de fácil conexão 
                e configuração no sistema. Nos dispositivos mobile (celular e tablet) você pode usar tanto a 
                câmera frontal quanto a câmera traseira do equipamento. </p>`;
              //$('#messages').append(msg)
                this.perform('speak',{name: send,message: msg});//enviando a msg p bd
                $('#messages').load('home/last', function(){
                  $('#messages').animate({scrollTop: $('#messages')[0].scrollHeight}, 500);
                });
            break;
            case 8:
              msg = `<p class='received'> <small>${date_formated}</small><br/> 
                Criar uma conta Elos é gratuito, basta se registrar 
                <a href="https://elos.vc/language/pt-br?redir_url=%2Fregister"> aqui </a> </p>`;
              $('#messages').append(msg)
                this.perform('speak',{ name: send,message: msg});//enviando a msg p bd
            break;
            default:
              msg = `<p class='received'> <small>${date_formated}</small><br/> Desculpe, mas não entendi sua mensagem</b>
                </p>`;
              //$('#messages').append(msg);
              this.perform('speak',{ name: send,message: msg});//enviando a msg p bd
              $('#messages').load('home/last', function(){
                  $('#messages').animate({scrollTop: $('#messages')[0].scrollHeight}, 500);
                });
              break;
          }

         
        }else{//tem mais caracteres
          let message = data.message;

          let name =  data.name;
          this.perform('speak',{  name: name, message:message })

          $('#messages').load('home/last', function(){
            $('#messages').animate({scrollTop: $('#messages')[0].scrollHeight}, 500);
          });
          msg = `<p class='received'> <small>${date_formated}</small><br/> Certo, estou anotando tudo aqui...</b>
                </p>`;
          //$('#messages').append(msg);
          this.perform('speak',{  name: send,message: msg });//enviando a msg p bd
          $('#messages').load('home/last', function(){
            $('#messages').animate({scrollTop: $('#messages')[0].scrollHeight}, 500);
          });

        }
        
      }
    }
  },

  speak(message) {
    let name = sessionStorage.getItem('chat_room_name')
    this.perform('speak', { message, name })    
    //this.perform('speak', { auto_link(message), name })
    this.received({ message,name })
  },

  announce(content) {
    this.perform('announce', { name: content.name, type: content.type })
  }
});

export default chatRoomChannel;
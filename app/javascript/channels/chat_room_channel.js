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
    if (data.name) {
      $('#messages').append(`<p class="announce"><em>${data.name}</em> seja bem-vindo(a)</p>`)
      $('#messages').append(`<p class='received'> Em que posso lhe ajudar?` + '</p>')
      $('#messages').append(`<p class='received'> 
        Escolha a opção: <br>
        1. E-mail para contato <br>
        2. Dúvidas sobre Elos <br>
        3. Elogios <br>
        4. Como utilizar o Elos<br>
        5. Todos participantes precisam de conta?<br>
        6. Acesso por celular e tablet<br>
        7. Qual câmera posso utilizar?<br>
        8. Criando sua conta<br>
        ` + '</p>')
    }else{
      if (data.message) {
        //$('#messages').append(`<p class='received'> mensagem` + '</p>')

        if (data.message.length ==1) {//escolheu uma opção
          console.log(data.message);
          switch (data.message) {
            case 1:
              $('#messages').append(`<p class='received'> Para entrar em contato diretamente por e-mail:
                <b>contato@elos.vc</b>` + '</p>');
              break;
            case 2:
              $('#messages').append(`<p class='received'> Deixe aqui sua dúvida que o setor de atendimento entrará
                em contato o mais breve possível:` + '</p>');
            break;
            case 3:
              $('#messages').append(`<p class='received'> 
                Deixe aqui seu elogio que o setor de atendimento, sua mensagem é muito importante para nós!` + '</p>')
            break;

            case 4:
              $('#messages').append(`<p class='received'>                 
                Usar o Elos é simples. Basta ter conexão com a internet e uma conta, 
                nenhuma instalação é necessária. Acesse nossa Central de Ajuda para conhecer 
                todas as funcionalidades do Elos: 
                <a href="https://ajuda.elos.vc/kb/article/150995/tudo-sobre-o-elos"> Veja aqui</a>` + '</p>')
            break;
            case 5:
              $('#messages').append(`<p class='received'> 
                Não. Somente o dono da sala de videoconferência precisa ter conta, os demais podem entrar na reunião 
                utilizando a opção "convidado"!` + '</p>')
            break;
            case 6:
              $('#messages').append(`<p class='received'> 
                A plataforma é totalmente online, e você pode acessá-la em qualquer dispositivo que tenha um navegador` + '</p>')
            break;
            case 7:
              $('#messages').append(`<p class='received'> 
                Qualquer câmera ou webcam que você conectar no seu computador e for detectada pelo seu sistema operacional será suportada pelo Elos,  
                inclusive as que já vêm em notebooks. Por facilidade, muitos usuários costumam utilizar webcams 
                com conexão USB, que possuem qualidade suficiente para a transmissão e que são de fácil conexão 
                e configuração no sistema. Nos dispositivos mobile (celular e tablet) você pode usar tanto a 
                câmera frontal quanto a câmera traseira do equipamento.` + '</p>')
            break;
            case 8:
              $('#messages').append(`<p class='received'> 
                Criar uma conta Elos é gratuito, basta se registrar <a href="https://elos.vc/language/pt-br?redir_url=%2Fregister"> aqui </a>` + '</p>')
            break;
            default:
              $('#messages').append(`<p class='received'> Desculpe, mas não entendi sua mensagem</b>
               ` + '</p>');
              break;
          }

         
        }//tem mais caracteres
        
      }
    }
  },

  speak(message) {
     console.log('speak'+message);
    let name = sessionStorage.getItem('chat_room_name')
    this.perform('speak', { message, name })
    this.received({ message,name })
  },

  announce(content) {
     console.log(content);
    this.perform('announce', { name: content.name, type: content.type })
  }
});

export default chatRoomChannel;
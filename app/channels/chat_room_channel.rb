class ChatRoomChannel < ApplicationCable::Channel

  # self.table_name = "messages"
  
  def subscribed
    stream_from "chat_room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    @message = Message.new(send:data["name"],message: data["message"])
    @message.save
    
    ActionCable.server.broadcast "chat_room_channel", message: data["message"], sent_by: data["name"]
    # /*msg = Message.create(name: "David", message: "Code Artist")
    # msg.save*/
     # @message = Message.new(send:data["name"],message: data["message"])
     # @message.save


  end

  def announce(data)
    ActionCable.server.broadcast "chat_room_channel", chat_room_name: data["name"], type: data["type"]
  end

  def perform(message)
    ActionCable.server.broadcast "chat_room_channel", chat_room_name: data["name"], type: data["type"]
  end
end
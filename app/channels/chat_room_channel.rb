class ChatRoomChannel < ApplicationCable::Channel

  # self.table_name = "messages"
  
  def subscribed
    stream_from "chat_room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    @message = Message.new(message: data["message"],send:data["name"])
    @message.save

    #@message = Message.order("created_at DESC").limit(1)
    
    ActionCable.server.broadcast "chat_room_channel", message: data["message"], sent_by: data["name"]
  end

  def announce(data)
    ActionCable.server.broadcast "chat_room_channel", chat_room_name: data["name"], type: data["type"]
  end

  def perform(message)
    ActionCable.server.broadcast "chat_room_channel", chat_room_name: data["name"], type: data["type"]
  end

end
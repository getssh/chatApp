import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const {message} = req.body;
    const {id: receiverId} = req.params;
    const senderId = req.user._id;

    let converstation = await Conversation.findOne({
      participants: {$all: [senderId, receiverId]},
    })

    if (!converstation) {
      converstation = await Conversation.create({
        participants: [senderId, receiverId],
      })
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    })

    if (newMessage) {
      converstation.messages.push(newMessage._id);
    }

    await Promise.all([converstation.save(), newMessage.save()])
    res.status(201).json(newMessage)
  } catch (error) {
    console.log("Send message error", error.message)
    res.status(500).json({error: "Interal server error"})
  }
}
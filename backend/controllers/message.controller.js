import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

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

    const receiverSocketId = getReceiverSocketId(receiverId)
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage)
    }

    res.status(201).json(newMessage)
  } catch (error) {
    console.log("Send message error", error.message)
    res.status(500).json({error: "Interal server error"})
  }
}

export const getMessage = async (req, res) => {
  try {
    const {id: userToChatId} = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: {$all: [senderId, userToChatId]}
    }).populate("messages")

    if (!conversation) {
      return res.status(200).json([])
    }

    res.status(200).json(conversation.messages)
  } catch (error) {
    console.log("Recevie message error", error.message)
    res.status(500).json({error: "Interal server error"})
  }
}
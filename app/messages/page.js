"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  MessageSquare,
  Send,
  ClockIcon as UserClock,
} from "lucide-react";
import Image from "next/image";
import messages from "@/public/Asset/messages.png";
import accountpending from "@/public/Asset/accountpending.png";
import User from "@/public/Asset/User.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTickets } from "@/lib/Redux/Slices/ticketSlice";
import { Sendmessage } from "@/lib/API/Messages/Messages";

export default function MessagingInterface() {
  const { tickets, loading, error } = useSelector((state) => state.tickets);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("User");
  const [sending, Setsending] = useState(false);
  useEffect(() => {
    dispatch(fetchAllTickets(activeTab));
  }, [dispatch, activeTab]);

  const contacts = tickets?.map((ticket) => ({
    id: ticket._id,
    name: ticket.TicketTitle || "Unknown",
    avatar: "/placeholder.svg",
    lastMessage:
      ticket.Message?.[ticket?.Message?.length - 1]?.msg || "No message yet",
    lastMessageTime: ticket.Message?.[ticket?.Message?.length - 1]?.date || "",
    email: "", // You can include this if available in your ticket model
    phone: "", // Same as above
    messages: ticket.Message.map((msg) => ({
      id: msg._id,
      content: msg.msg,
      sender: msg.user === "6800afc07f7c2467f521e9f5" ? "user" : "agent", // Replace accordingly
      timestamp: msg.date,
    })),
  }));

  useEffect(() => {
    if (contacts?.length > 0 && !selectedContact) {
      setSelectedContact(contacts[0]);
    }
  }, [contacts]);

 
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      msg: newMessage,
      date: new Date().toLocaleDateString(),
      user: "6800afc07f7c2467f521e9f5",
    };
    Setsending(true);
    try {
      const response = await Sendmessage(selectedContact.id, {
        Message: messageData,
      });

      if (response?.success) {
        // If the API call is successful, update the selected contact with the new message
        setSelectedContact((prev) => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              id: Date.now().toString(),
              content: newMessage,
              sender: "user",
              timestamp: new Date().toLocaleTimeString(),
            },
          ],
        }));

        setNewMessage(""); // Clear the input field after sending the message
        Setsending(false);
        dispatch(fetchAllTickets(activeTab));
      } else {
        Setsending(false);
        addToast({
          title: `Failed to send message`,
          description: response?.message,
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      Setsending(false);
      addToast({
        title: `Failed to send message`,
        description: error,
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedContact?.messages]);

  return (
    <ScrollArea className=" mx-auto p-4 w-full h-screen pb-14 mb-8">
    

      {/* Messaging Interface */}
      <Card className="overflow-hidden shadow-none rounded-md mb-4 p-0 w-full">
        <div className="flex flex-col h-[500px]">
          {/* Messages Header */}
          <div className="flex justify-between items-center p-2 border-b ">
            <h2 className="text-xl font-semibold">Messages</h2>
          </div>

          <div className="flex h-full w-full">
            {/* Left Sidebar */}
            <div className="w-1/3 border-r flex flex-col h-full">
              {/* Tabs */}
              <Tabs defaultValue="User" className="w-full">
                <TabsList className="grid grid-cols-1 gap-1 h-auto p-0 w-full border">
                  <TabsTrigger
                    value="User"
                    onClick={() => setActiveTab("User")}
                    className={`rounded-none py-2 cursor-pointer border ${
                      activeTab === "User"
                        ? " text-[#106C83] focus:bg-[#106C83]  ring-1 ring-[#106C83]"
                        : "bg-white text-black "
                    }`}
                  >
                    Brindha
                  </TabsTrigger>
                 
                </TabsList>
              </Tabs>

              {/* Contact List */}
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <span className="loader2"></span>
                </div>
              ) : (
                <ScrollArea className="flex-grow overflow-y-auto pb-12">
                  {contacts?.length > 0 ? (
                    contacts?.map((contact) => (
                      <div
                        key={contact?.id}
                        className={`flex items-center p-4 cursor-pointer ${
                          selectedContact?.id === contact?.id
                            ? "bg-[#106C83] text-white"
                            : ""
                        }`}
                        onClick={() => setSelectedContact(contact)}
                      >
                        <div className="w-12 h-12 rounded-sm bg-white overflow-hidden mr-3">
                          <Image
                            src={messages}
                            alt={contact.name}
                            width={48}
                            height={48}
                            className="object-cover opacity-40"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{contact?.name}</h3>
                            <span className="text-xs">
                              {contact?.lastMessageTime}
                            </span>
                          </div>
                          <p
                            className={`text-sm truncate ${
                              selectedContact?.id === contact?.id
                                ? "text-white/80"
                                : "text-gray-500"
                            }`}
                          >
                            {contact?.lastMessage}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center items-center mt-12">
                      <span>No Messages</span>
                    </div>
                  )}
                </ScrollArea>
              )}
            </div>

            {/* Right Chat Area */}
            <div className="w-2/3 flex flex-col  pb-12">
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src={messages}
                    alt={selectedContact?.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{selectedContact?.name}</h3>
                  {selectedContact?.email && (
                    <p className="text-sm text-gray-500">
                      {selectedContact?.email}{" "}
                      {selectedContact?.phone && `| ${selectedContact?.phone}`}
                    </p>
                  )}
                </div>
              </div>

              {/* Chat Messages */}
              <ScrollArea
                ref={scrollRef}
                className="flex-grow p-4 overflow-y-auto h-96"
              >
                {/* {selectedContact.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${
                      message.sender === "user"
                        ? "justify-start"
                        : "justify-end"
                    }`}
                  >
                    {message.sender === "user" && (
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                        <Image
                          src={User}
                          alt={selectedContact.name}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.sender === "user"
                          ? "bg-[#106C83] text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p
                        className={`text-xs mt-1 text-right ${
                          message.sender === "user"
                            ? "text-white/80"
                            : "text-gray-500"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                    {message.sender === "agent" && (
                      <div className="w-8 h-8 rounded-full overflow-hidden ml-2">
                        <Image
                          src={User}
                          alt="Agent"
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))} */}

                {selectedContact?.messages?.map((message) => (
                  <div
                    key={message?.id}
                    className={`p-2 rounded-md max-w-[50%] my-1 ${
                      message?.sender === "user"
                        ? "bg-[#106C83] text-white self-end ml-auto"
                        : "bg-gray-100 text-black self-start"
                    }`}
                  >
                    <p>{message?.content}</p>
                    <span className="text-xs text-gray-400 block mt-1 text-right">
                      {message?.timestamp}
                    </span>
                  </div>
                ))}
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t flex ">
                <Input
                  placeholder="Write message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-grow"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  className="ml-2 bg-[#106C83] hover:bg-teal-700"
                  onClick={handleSendMessage}
                >
                 {sending?<span className="loader"></span>: <Send className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </ScrollArea>
  );
}

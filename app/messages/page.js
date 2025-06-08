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

export default function MessagingInterface() {
  const { tickets, loading, error } = useSelector((state) => state.tickets);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAllTickets(""));
  }, [dispatch]);

  // Sample data
  // const contacts = [
  //   {
  //     id: "1",
  //     name: "Arjun Mahadev",
  //     avatar: "/placeholder.svg?height=50&width=50",
  //     lastMessage: "Hi my name is arjun, I want to...",
  //     lastMessageTime: "12:11 PM",
  //     email: "arjunmaha@gmail.com",
  //     phone: "+91 7839309837",
  //     messages: [
  //       {
  //         id: "m1",
  //         content: "Hi, I does elite sewing machine come with Table?",
  //         sender: "user",
  //         timestamp: "12:11 PM",
  //       },
  //       {
  //         id: "m2",
  //         content:
  //           "No, we provide only the machine! If you want a table buy separately.",
  //         sender: "agent",
  //         timestamp: "12:11 PM",
  //       },
  //     ],
  //   },
  //   {
  //     id: "2",
  //     name: "Jennifer Wills",
  //     avatar: "/placeholder.svg?height=50&width=50",
  //     lastMessage: "Hi my name is sheela, I want to...",
  //     lastMessageTime: "12:11 PM",
  //     messages: [],
  //   },
  //   {
  //     id: "3",
  //     name: "Medona Miller",
  //     avatar: "/placeholder.svg?height=50&width=50",
  //     lastMessage: "Hi my name is sheela, I want to...",
  //     lastMessageTime: "12:11 PM",
  //     messages: [],
  //   },
  //   {
  //     id: "4",
  //     name: "Emmy White",
  //     avatar: "/placeholder.svg?height=50&width=50",
  //     lastMessage: "Hi my name is sheela, I want to...",
  //     lastMessageTime: "12:11 PM",
  //     messages: [],
  //   },
  //   {
  //     id: "5",
  //     name: "Robert Carl",
  //     avatar: "/placeholder.svg?height=50&width=50",
  //     lastMessage: "Hi my name is sheela, I want to...",
  //     lastMessageTime: "12:11 PM",
  //     messages: [],
  //   },
  //   {
  //     id: "6",
  //     name: "Robert Carl",
  //     avatar: "/placeholder.svg?height=50&width=50",
  //     lastMessage: "Hi my name is sheela, I want to...",
  //     lastMessageTime: "12:11 PM",
  //     messages: [],
  //   },
  // ];

  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("customers");

  // const handleSendMessage = () => {
  //   if (!newMessage.trim()) return;

  //   // In a real app, you would send this to an API
  //   console.log("Sending message:", newMessage);

  //   // Clear the input
  //   setNewMessage("");
  // };

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
      sender: msg.user === "your_current_user_id" ? "user" : "agent", // Replace accordingly
      timestamp: msg.date,
    })),
  }));

  useEffect(() => {
    if (contacts?.length > 0 && !selectedContact) {
      setSelectedContact(contacts[0]);
    }
  }, [contacts]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      content: newMessage,
      role: "agent",
      timestamp: new Date().toLocaleTimeString(),
    };

    setSelectedContact((prev) => ({
      ...prev,
      messages: [...prev.messages, newMsg],
    }));

    setNewMessage("");
  };

  console.log(contacts);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedContact?.messages]);

  return (
    <ScrollArea className=" mx-auto p-4 w-full h-screen pb-14 mb-8">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card className="p-4 flex shadow-none rounded-md flex-row items-start">
          <div className="bg-white p-3 rounded-md mr-4 border">
            <Image
              src={messages}
              alt="message-icon"
              className="h-6 w-6 text-gray-700"
            />
          </div>
          <div className="flex-grow">
            <p className="text-gray-700 font-medium">Messages</p>
            <p className="text-xl font-bold text-[#106C83]">7,782</p>
          </div>
          <Button variant="outline" className="ml-auto">
            This Week <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </Card>

        <Card className="p-4 flex shadow-none rounded-md flex-row items-start">
          <div className="bg-white p-3 rounded-md mr-4 border">
            <Image
              src={accountpending}
              alt="accountpending-icon"
              className="h-6 w-6 text-gray-700"
            />
          </div>
          <div className="flex-grow">
            <p className="text-gray-700 font-medium">Pending Response</p>
            <p className="text-xl font-bold text-[#106C83]">555</p>
          </div>
          <Button variant="outline" className="ml-auto">
            This Week <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </Card>
      </div>

      {/* Messaging Interface */}
      <Card className="overflow-hidden shadow-none rounded-md mb-4 p-0 w-full">
        <div className="flex flex-col h-[500px]">
          {/* Messages Header */}
          <div className="flex justify-between items-center p-2 border-b ">
            <h2 className="text-xl font-semibold">Messages</h2>
            <Button variant="outline">
              Today <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="flex h-full w-full">
            {/* Left Sidebar */}
            <div className="w-1/3 border-r flex flex-col h-full">
              {/* Tabs */}
              <Tabs defaultValue="customers" className="w-full">
                <TabsList className="grid grid-cols-2 h-auto p-0 w-full">
                  <TabsTrigger
                    value="customers"
                    onClick={() => setActiveTab("customers")}
                    className={`rounded-none py-2 cursor-pointer ${
                      activeTab === "customers"
                        ? " text-[#106C83] focus:bg-[#106C83]"
                        : "bg-white text-black"
                    }`}
                  >
                    Customers
                  </TabsTrigger>
                  <TabsTrigger
                    value="sellers"
                    onClick={() => setActiveTab("sellers")}
                    className={`rounded-none py-2 cursor-pointer ${
                      activeTab === "sellers"
                        ? " text-[#106C83] focus:bg-[#106C83]"
                        : "bg-white text-black"
                    }`}
                  >
                    Sellers
                  </TabsTrigger>
                
                </TabsList>
              </Tabs>

              {/* Contact List */}
              <ScrollArea className="flex-grow overflow-y-auto pb-12">
                {contacts?.map((contact) => (
                  <div
                    key={contact?.id}
                    className={`flex items-center p-4 cursor-pointer ${
                      selectedContact?.id === contact?.id
                        ? "bg-[#106C83] text-white"
                        : ""
                    }`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                      {/* <Image
                        src={User}
                        alt={contact.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      /> */}
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
                ))}
              </ScrollArea>
            </div>

            {/* Right Chat Area */}
            <div className="w-2/3 flex flex-col  pb-12">
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  {/* <Image
                    src={User}
                    alt={selectedContact?.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  /> */}
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
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </ScrollArea>
  );
}

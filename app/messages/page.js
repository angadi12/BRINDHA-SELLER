"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  Download,
  Loader2,
  MessageSquare,
  Paperclip,
  Plus,
  Send,
  UserCircle,
  ClockIcon as UserClock,
} from "lucide-react";
import Image from "next/image";
import messages from "@/public/Asset/messages.png";
import accountpending from "@/public/Asset/accountpending.png";
import User from "@/public/Asset/User.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTickets } from "@/lib/Redux/Slices/ticketSlice";
import { Sendmessage, CreateTicket } from "@/lib/API/Messages/Messages";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Cookies from "js-cookie";
import { Uploadfile } from "@/lib/API/fileupload/multiplefile";
import { useToast } from "@/components/ui/toast-provider";

export default function MessagingInterface() {
  const { addToast } = useToast();

  const { tickets, loading, error } = useSelector((state) => state.tickets);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [userid, Setuserid] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState("User");
  const [sending, Setsending] = useState(false);
  const [open, setOpen] = useState(false);
  const [ticketData, setTicketData] = useState({
    TicketTitle: "",
    role: "Vendor",
    Message: {
      msg: "",
      document: "",
    },
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFile1, setUploadedFile1] = useState(null);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadedFilePreview, setUploadedFilePreview] = useState("");
  const [openDialogMessageId, setOpenDialogMessageId] = useState(null);
  const [hoveredMessageId, setHoveredMessageId] = useState(null);

  useEffect(() => {
    const id = Cookies.get("usid");
    const name = Cookies.get("nme");
    if (id && name) {
      Setuserid(id);
      setName(name);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true); // Start loader

    let documentUrl = "";

    try {
      // 1. Upload file if any
      if (uploadedFile) {
        const uploadResponse = await Uploadfile(uploadedFile);
        if (uploadResponse?.status) {
          documentUrl = uploadResponse?.data;
        } else {
          setCreating(false);
          addToast({
            title: `File upload failed`,
            description: uploadResponse?.message || "Please try again.",
            variant: "destructive",
            duration: 5000,
          });
          return;
        }
      }

      // 2. Create ticket
      const payload = {
        TicketTitle: ticketData.TicketTitle,
        role: ticketData.role,
        Message: {
          msg: ticketData.Message.msg,
          document: documentUrl,
          date: new Date().toISOString(),
          user: userid,
        },
      };

      const response = await CreateTicket(payload);

      if (response?.status) {
        setOpen(false);
        setTicketData({
          TicketTitle: "",
          Message: { msg: "", document: "" },
        });
        setUploadedFile(null);
        dispatch(fetchAllTickets(activeTab));

        addToast({
          title: `Ticket created successfully`,
          description: `Your support request has been submitted.`,
          variant: "success",
          duration: 4000,
        });
      } else {
        addToast({
          title: `Ticket creation failed`,
          description: response?.message || "Please try again.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      addToast({
        title: `Unexpected error`,
        description: error.message || "Something went wrong.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setCreating(false); // Stop loader
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setTicketData((prev) => ({
        ...prev,
        Message: {
          ...prev.Message,
          document: file.name,
        },
      }));
    }
  };
  const handleFileUpload1 = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile1(file);
      setUploadedFilePreview(URL.createObjectURL(file));
      setTicketData((prev) => ({
        ...prev,
        Message: {
          ...prev.Message,
          document: file.name,
        },
      }));
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setTicketData((prev) => ({
      ...prev,
      Message: {
        ...prev.Message,
        document: "",
      },
    }));
  };

  useEffect(() => {
    dispatch(fetchAllTickets(activeTab));
  }, [dispatch, activeTab]);

  const contacts = tickets?.map((ticket) => ({
    id: ticket._id,
    name: ticket.TicketTitle || "Unknown",
    avatar: "/placeholder.svg",
    lastMessage: ticket.Message?.[ticket?.Message?.length - 1]?.msg,
    lastMessageTime: ticket.Message?.[ticket?.Message?.length - 1]?.date || "",
    email: "",
    phone: "",
    messages: ticket?.Message?.map((msg) => ({
      id: msg._id,
      content: msg.msg,
      document: msg.document,
      sender: msg.user === userid ? "user" : "agent",
      timestamp: msg.date,
    })),
  }));

  useEffect(() => {
    if (contacts?.length > 0 && !selectedContact) {
      setSelectedContact(contacts[0]);
    }
  }, [contacts]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() && !uploadedFile1) return;

    // const messageData = {
    //   msg: newMessage,
    //   date: new Date().toLocaleDateString(),
    //   user: userid,
    // };
    Setsending(true);
    try {
      let documentUrl = "";

      // 1. Upload file if exists
      if (uploadedFile1) {
        const uploadRes = await Uploadfile(uploadedFile1);
        if (uploadRes?.status) {
          documentUrl = uploadRes?.data;
        } else {
          Setsending(false);
          addToast({
            title: "File upload failed",
            description: uploadRes?.message || "Please try again.",
            variant: "destructive",
            duration: 5000,
          });
          return;
        }
      }

      const messageData = {
        msg: newMessage,
        document: documentUrl,
        date: new Date().toISOString(),
        user: userid,
      };

      const response = await Sendmessage(selectedContact.id, {
        Message: messageData,
      });

      if (response?.success) {
        const latestMessage = response?.data?.Message?.slice(-1)[0];

        setSelectedContact((prev) => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              id: latestMessage?._id,
              content: latestMessage?.msg,
              document: latestMessage?.document,
              sender: "user",
              timestamp: latestMessage?.date,
            },
          ],
        }));

        setNewMessage("");
        setUploadedFile1(null);
        setUploadedFilePreview("");
        Setsending(false);
      } else {
        Setsending(false);
        addToast({
          title: `Failed to send message`,
          description: response?.message,
          variant: "destructive",
          duration: 5000,
        });
        setNewMessage("");
        setUploadedFile1(null);
        setUploadedFilePreview("");
      }
    } catch (error) {
      Setsending(false);
      addToast({
        title: `Failed to send message`,
        description: error,
        variant: "destructive",
        duration: 5000,
      });
      setNewMessage("");
      setUploadedFile1(null);
      setUploadedFilePreview("");
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [selectedContact?.messages]);

  // Auto-scroll to bottom when component mounts (when chat opens)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollRef.current) {
        const scrollElement = scrollRef.current.querySelector(
          "[data-radix-scroll-area-viewport]"
        );
        if (scrollElement) {
          scrollElement.scrollTop = scrollElement.scrollHeight;
        }
      }
    }, 100); // Small delay to ensure DOM is ready

    return () => clearTimeout(timer);
  }, [selectedContact]);

  useEffect(() => {
    if (tickets?.length > 0) {
      setSelectedContact(contacts[0]);
    } else {
      setSelectedContact(null);
    }
  }, [tickets, activeTab]);

  const downloadImage = async (src) => {
    try {
      setIsDownloading(true);

      // Fetch the image
      const response = await fetch(src);
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Set filename - use provided fileName or extract from URL or use default
      const downloadFileName =
        src.split("/").pop()?.split("?")[0] || `image-${Date.now()}.jpg`;

      link.download = downloadFileName;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadClick = (e, imageUrl) => {
    e.stopPropagation();
    downloadImage(imageUrl);
  };

  return (
    <ScrollArea className=" mx-auto p-4 w-full h-screen pb-14 mb-8">
      {/* Messaging Interface */}
      <Card className="overflow-hidden shadow-none rounded-md mb-4 p-0 w-full">
        <div className="flex flex-col h-[500px]">
          {/* Messages Header */}
          <div className="flex justify-between items-center p-2 border-b ">
            <h2 className="text-xl font-semibold">Messages</h2>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="text-xs border border-[#106C83] bg-[#106C83]/10 hover:bg-[#106C83] hover:text-white text-[#106C83]">
                  Create ticket <Plus className="ml-1 h-3 w-3" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="text-[#106C83]">
                    Create New Ticket
                  </DialogTitle>
                  <DialogDescription>
                    Fill out the form below to create a new support ticket.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Ticket Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter ticket title"
                      value={ticketData.TicketTitle}
                      onChange={(e) =>
                        setTicketData((prev) => ({
                          ...prev,
                          TicketTitle: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your issue or request..."
                      className="min-h-[100px]"
                      value={ticketData.Message.msg}
                      onChange={(e) =>
                        setTicketData((prev) => ({
                          ...prev,
                          Message: {
                            ...prev.Message,
                            msg: e.target.value,
                          },
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="document">Document (Optional)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="document"
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("document")?.click()
                        }
                        className="flex items-center gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        Upload File
                      </Button>
                      {uploadedFile && (
                        <span
                          variant="secondary"
                          className="flex items-center text-sm gap-1"
                        >
                          {uploadedFile.name}
                          <X
                            className="h-3 w-3 cursor-pointer hover:text-red-500"
                            onClick={removeFile}
                          />
                        </span>
                      )}
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#106C83] hover:bg-[#106C83]/90 text-white"
                    >
                      {creating ? (
                        <span className="loader"></span>
                      ) : (
                        "Create Ticket"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
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
                              {new Date(
                                contact?.lastMessageTime
                              ).toLocaleDateString("en-US")}
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
                {loading ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3"></div>
                ) : tickets.length > 0 ? (
                  <>
                    {/* <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <Image
                        src={messages}
                        alt={selectedContact?.name || "ticket"}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div> */}
                    <div className="flex items-center gap-2">
                      <span className="bg-[#106C83]/10 rounded-full">
                        <UserCircle className="text-[#106C83]" />
                      </span>
                      <h3 className="font-medium text-center">Brindha</h3>
                      {/* <h3 className="font-medium">{selectedContact?.name}</h3> */}
                      {/* {selectedContact?.email && (
                        <p className="text-sm text-gray-500">
                          {selectedContact?.email}{" "}
                          {selectedContact?.phone &&
                            `| ${selectedContact?.phone}`}
                        </p>
                      )} */}
                    </div>
                  </>
                ) : (
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3"></div>
                )}
              </div>

              {/* Chat Messages */}
              <ScrollArea
                ref={scrollRef}
                className="flex-grow  p-4 overflow-y-auto h-96 relative overflow-hidden"
              >
                {selectedContact?.messages?.map((message) => (
                  <div
                    key={message?.id}
                    className={`p-2 rounded-md max-w-[50%] my-1 ${
                      message?.sender === "user"
                        ? "bg-[#106C83] text-white self-end ml-auto"
                        : "bg-gray-100 text-black self-start"
                    }`}
                  >
                    {message?.document && (
                      <Dialog
                        open={openDialogMessageId === message.id}
                        onOpenChange={(open) =>
                          setOpenDialogMessageId(open ? message.id : null)
                        }
                      >
                        <DialogTrigger asChild>
                          <div
                            className="relative inline-block group w-full cursor-pointer"
                            onMouseEnter={() => setHoveredMessageId(message.id)}
                            onMouseLeave={() => setHoveredMessageId(null)}
                          >
                            <Image
                              className="w-full h-32 object-fill rounded-lg transition-transform hover:scale-[1.02]"
                              height={20}
                              width={300}
                              src={message?.document || "/placeholder.svg"}
                              alt={"chat-media"}
                            />
                            {/* Download overlay - appears on hover */}
                            <div
                              className={`absolute inset-0 bg-black/20 rounded-lg transition-opacity duration-200 ${
                                hoveredMessageId === message.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            >
                              <Button
                                onClick={(e) =>
                                  handleDownloadClick(e, message?.document)
                                }
                                disabled={isDownloading}
                                className="absolute z-50 top-2 right-2 h-8 w-8 p-0 bg-black/50 hover:bg-black/70 text-white border-none rounded-full"
                                variant="outline"
                              >
                                {isDownloading ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Download className="h-4 w-4" />
                                )}
                              </Button>
                            </div>

                            {/* Click indicator */}
                            <div
                              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                                hoveredMessageId === message.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            >
                              <div className="bg-black/30 rounded-full p-2">
                                {/* <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div> */}
                              </div>
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogTitle></DialogTitle>
                        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/80 border-none">
                          {/* Header with close and download buttons */}
                          <div className="absolute top-4 right-4 flex gap-2 z-10">
                            <Button
                              onClick={() => downloadImage(message?.document)}
                              disabled={isDownloading}
                              className="h-10 w-10 p-0 bg-black/50 hover:bg-white/70 text-white border-none rounded-full"
                              variant="outline"
                            >
                              {isDownloading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                              ) : (
                                <Download className="h-5 w-5" />
                              )}
                            </Button>
                            <Button
                              onClick={() => setOpenDialogMessageId(null)}
                              className="h-10 w-10 p-0 bg-black/50 hover:bg-white/70 text-white border-none rounded-full"
                              variant="outline"
                            >
                              <X className="h-5 w-5" />
                            </Button>
                          </div>

                          {/* Image container */}
                          <div className="flex items-center justify-center min-h-[90vh] p-4">
                            <Image
                              src={message?.document || "/placeholder.svg"}
                              alt="chat-media"
                              width={1200}
                              height={800}
                              className="max-w-full max-h-full object-contain rounded-lg"
                              priority
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                    {message?.content && <p>{message?.content}</p>}
                    <span className="text-xs text-gray-400 block mt-1 text-right">
                      {new Date(message?.timestamp).toLocaleDateString("en-US")}
                    </span>
                  </div>
                ))}

                {uploadedFilePreview && (
                  <div className="top-0 bottom-0 h-full w-full flex justify-center items-center  bg-black/95 absolute overflow-hidden">
                    <Button
                      onClick={() => {
                        setUploadedFilePreview(""), setUploadedFile1(null);
                      }}
                      className="h-10 w-10 p-0 bg-black/50 hover:bg-white/70 text-white border-none rounded-full absolute top-4 right-12"
                      variant="outline"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                    <Image
                      src={uploadedFilePreview}
                      alt="chat-media"
                      height={200}
                      width={200}
                      className="z-50 bg-white"
                    />
                  </div>
                )}
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t flex ">
                <Input
                  id="document1"
                  type="file"
                  onChange={handleFileUpload1}
                  className="hidden"
                />
                <Button
                  className="mr-2 bg-[#106C83] hover:bg-teal-700"
                  onClick={() => document.getElementById("document1")?.click()}
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
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
                  {sending ? (
                    <span className="loader"></span>
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </ScrollArea>
  );
}

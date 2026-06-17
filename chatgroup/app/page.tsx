"use client";

import React, { useState, useEffect, useRef } from "react";

// Types
interface User {
  username: string;
  avatarUrl: string;
  category?: string;
  bio?: string;
  statusText?: string;
}

interface Message {
  id: string;
  sender: string; // username
  recipient: string; // username
  text: string;
  imageUrl?: string; // for image attachments
  time: string;
  status?: "sent" | "delivered" | "read";
  isNew?: boolean;
}

// Preset Avatars for registration and mock contacts
const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80", // Woman 1
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80", // Man 1
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80", // Woman 2
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80", // Man 2
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&h=150&q=80", // Man 3
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80"  // Woman 3
];

// Default built-in mock contacts based on the user's screenshot
const MOCK_CONTACTS: User[] = [
  {
    username: "Ana Malbasa",
    avatarUrl: PRESET_AVATARS[0],
    category: "PERSONAL BLOG",
    bio: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Donec Sit Amet Nunc Augue. Pellentesque Vel Pellentesque Tellus. Nam Lacinia Leo Sed Eleifend Dignissim.",
    statusText: "Active 5m ago"
  },
  {
    username: "Paul Osmand",
    avatarUrl: PRESET_AVATARS[1],
    category: "CREATIVE DESIGNER",
    bio: "Passionate about layouts, dark themes, and rich aesthetics. UI developer & animator based in London.",
    statusText: "hahah, nice!"
  },
  {
    username: "Edward Davis",
    avatarUrl: PRESET_AVATARS[4],
    category: "PHOTOGRAPHER",
    bio: "Capturing moments and cityscapes. Let's grab coffee and share our logs.",
    statusText: "Are we still going for a coffee?"
  },
  {
    username: "Naomi Riste",
    avatarUrl: PRESET_AVATARS[5],
    category: "WRITER",
    bio: "Words shape worlds. Blogging, script-writing, and coffee lover.",
    statusText: "What did your boss say?"
  },
  {
    username: "Jonathan Blake",
    avatarUrl: PRESET_AVATARS[3],
    category: "ARTIST",
    bio: "Abstract lines, digital oil paint, and visual animations.",
    statusText: "Sent you some media"
  }
];

const EMOJI_CATEGORIES = [
  { name: "Smileys", icon: "😀", list: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "😎", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "🥵", "🥶", "😱", "😰", "😥", "😓"] },
  { name: "Love", icon: "❤️", list: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💋", "💌"] },
  { name: "Hands", icon: "👍", list: ["👍", "👎", "👊", "✊", "🤛", "🤜", "🤞", "✌️", "🤟", "🤘", "👌", "🤏", "👈", "👉", "👆", "👇", "👋", "🤚", "🖐️", "✋", "🙏", "👏", "🙌", "👐"] },
  { name: "Nature", icon: "🌸", list: ["🐱", "🐶", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐵", "🐒", "🐔", "🐧", "🐦", "🐤", "🦄", "🐝", "🐛", "🦋", "🌸", "🌹", "🍀", "🍁", "🌲", "🔥", "🌈", "☀️", "🌙"] },
  { name: "Food", icon: "🍕", list: ["🍕", "🍔", "🍟", "🌭", "🍿", "🥞", "🥪", "🥗", "🍣", "🍦", "🍩", "🍪", "🎂", "🍫", "🍬", "🍉", "🍓", "🍇", "🍌", "🍎", "🥑", "☕", "🍺", "🍷"] },
  { name: "Objects", icon: "🎮", list: ["🎮", "👾", "🎨", "🎬", "🎤", "🎧", "💻", "📱", "📷", "💡", "💰", "💵", "📝", "🔑", "🚗", "✈️", "⚽", "🏀", "🏆", "🎁", "🎉", "🎈"] }
];

export default function Home() {
  // Authentication states
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [regUsername, setRegUsername] = useState("");
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState(PRESET_AVATARS[0]);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>(MOCK_CONTACTS);

  // Chat window states
  const [activeContact, setActiveContact] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Emoji Picker states
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [activeEmojiCategory, setActiveEmojiCategory] = useState("Smileys");
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  // Right side panel toggles
  const [isDetailPaneOpen, setIsDetailPaneOpen] = useState(true);

  // Online statuses & typing indicator tracking
  const [onlineUsers, setOnlineUsers] = useState<Record<string, "online" | "away" | "offline">>({
    "Ana Malbasa": "online",
    "Paul Osmand": "online",
    "Edward Davis": "online",
    "Naomi Riste": "away",
    "Jonathan Blake": "offline"
  });
  const [typingUsers, setTypingUsers] = useState<Record<string, boolean>>({});

  // References
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const typingTimeoutRef = useRef<Record<string, NodeJS.Timeout>>({});
  const myTypingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Time state update
  const [currentTime, setCurrentTime] = useState("12:37");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      hours = hours % 12;
      hours = hours ? hours : 12;
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Click outside to close emoji picker
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target as Node)) {
        setIsEmojiPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Audio system triggers
  const playSound = (type: "send" | "receive") => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      if (type === "send") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(950, ctx.currentTime + 0.07);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.07);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.07);
      } else {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(620, ctx.currentTime);
        osc.frequency.setValueAtTime(740, ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch (e) {
      console.warn("Audio Context blocked by browser", e);
    }
  };

  // 1. Initial Load from Local Cache
  useEffect(() => {
    const savedUser = localStorage.getItem("chatgroup_current_user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    const savedUsersList = localStorage.getItem("chatgroup_registered_users");
    if (savedUsersList) {
      const parsed = JSON.parse(savedUsersList) as User[];
      const combined = [...MOCK_CONTACTS];
      parsed.forEach((u) => {
        if (!combined.some((c) => c.username.toLowerCase() === u.username.toLowerCase())) {
          combined.push(u);
        }
      });
      setRegisteredUsers(combined);
    } else {
      localStorage.setItem("chatgroup_registered_users", JSON.stringify(MOCK_CONTACTS));
    }

    const savedMessages = localStorage.getItem("chatgroup_messages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Sample history based on layout photo
      const defaultHistory: Message[] = [
        { id: "h1", sender: "Ana Malbasa", recipient: "Ann", text: "Cool! Don't forget to bring your ice skaters unless you want theirs!", time: "07:43 AM" },
        { id: "h2", sender: "Ann", recipient: "Ana Malbasa", text: "I wish I don't have those bad boys anymore, will use theirs.", time: "07:43 AM", status: "read" },
        { id: "h3", sender: "Ana Malbasa", recipient: "Ann", text: "It's all good! It will go back quick. :)", time: "08:00 AM" },
        { id: "h4", sender: "Ann", recipient: "Ana Malbasa", text: "", imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80", time: "08:00 AM", status: "read" },
        { id: "h5", sender: "Ann", recipient: "Ana Malbasa", text: "Wow! where did you snap that? Looks really nice!", time: "08:04 AM", status: "read" }
      ];
      setMessages(defaultHistory);
      localStorage.setItem("chatgroup_messages", JSON.stringify(defaultHistory));
    }

    // Set first contact selected by default
    setActiveContact(MOCK_CONTACTS[0]);
  }, []);

  // 2. Setup BroadcastChannel for Real-time synchronizations
  useEffect(() => {
    if (!currentUser) return;

    const channel = new BroadcastChannel("chatgroup_realtime");
    channelRef.current = channel;

    const sendHeartbeat = () => {
      channel.postMessage({
        type: "HEARTBEAT",
        username: currentUser.username,
        avatarUrl: currentUser.avatarUrl
      });
    };
    sendHeartbeat();
    const heartbeatInterval = setInterval(sendHeartbeat, 3000);

    const onlineTimerMap: Record<string, NodeJS.Timeout> = {};

    channel.onmessage = (event) => {
      const data = event.data;
      if (!data) return;

      switch (data.type) {
        case "HEARTBEAT":
          setOnlineUsers((prev) => ({ ...prev, [data.username]: "online" }));
          
          if (onlineTimerMap[data.username]) {
            clearTimeout(onlineTimerMap[data.username]);
          }
          onlineTimerMap[data.username] = setTimeout(() => {
            setOnlineUsers((prev) => ({ ...prev, [data.username]: "offline" }));
          }, 8000);

          setRegisteredUsers((prev) => {
            if (prev.some((u) => u.username.toLowerCase() === data.username.toLowerCase())) {
              return prev;
            }
            const newList = [...prev, { username: data.username, avatarUrl: data.avatarUrl, category: "MEMBER", bio: "Available to chat in real-time." }];
            localStorage.setItem("chatgroup_registered_users", JSON.stringify(newList));
            return newList;
          });
          break;

        case "USER_REGISTER":
          setRegisteredUsers((prev) => {
            if (prev.some((u) => u.username.toLowerCase() === data.user.username.toLowerCase())) {
              return prev;
            }
            const newList = [...prev, data.user];
            localStorage.setItem("chatgroup_registered_users", JSON.stringify(newList));
            return newList;
          });
          setOnlineUsers((prev) => ({ ...prev, [data.user.username]: "online" }));
          break;

        case "MSG":
          if (data.to === currentUser.username || data.from === currentUser.username) {
            const newMsg: Message = data.msg;
            setMessages((prev) => {
              if (prev.some((m) => m.id === newMsg.id)) return prev;
              const nextMsgs = [...prev, newMsg];
              localStorage.setItem("chatgroup_messages", JSON.stringify(nextMsgs));
              return nextMsgs;
            });
            
            if (data.from !== currentUser.username) {
              playSound("receive");
              if (activeContact && activeContact.username === data.from) {
                channel.postMessage({
                  type: "READ_RECEIPT",
                  msgId: newMsg.id,
                  reader: currentUser.username,
                  sender: data.from
                });
              }
            }
            setTimeout(() => scrollToBottom("smooth"), 50);
          }
          break;

        case "READ_RECEIPT":
          if (data.sender === currentUser.username) {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === data.msgId ? { ...msg, status: "read" } : msg
              )
            );
          }
          break;

        case "TYPING":
          if (data.to === currentUser.username) {
            setTypingUsers((prev) => ({ ...prev, [data.from]: data.isTyping }));
            
            if (data.isTyping) {
              if (typingTimeoutRef.current[data.from]) {
                clearTimeout(typingTimeoutRef.current[data.from]);
              }
              typingTimeoutRef.current[data.from] = setTimeout(() => {
                setTypingUsers((prev) => ({ ...prev, [data.from]: false }));
              }, 4000);
            }
          }
          break;

        default:
          break;
      }
    };

    return () => {
      clearInterval(heartbeatInterval);
      channel.close();
      Object.values(onlineTimerMap).forEach(clearTimeout);
    };
  }, [currentUser, activeContact]);

  // Handle local user keystroke relays for typing animations
  const handleUserTyping = (textLength: number) => {
    if (!channelRef.current || !currentUser || !activeContact) return;

    channelRef.current.postMessage({
      type: "TYPING",
      from: currentUser.username,
      to: activeContact.username,
      isTyping: textLength > 0
    });

    if (myTypingTimeoutRef.current) {
      clearTimeout(myTypingTimeoutRef.current);
    }

    if (textLength > 0) {
      myTypingTimeoutRef.current = setTimeout(() => {
        if (channelRef.current && currentUser && activeContact) {
          channelRef.current.postMessage({
            type: "TYPING",
            from: currentUser.username,
            to: activeContact.username,
            isTyping: false
          });
        }
      }, 2500);
    }
  };

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  // Submit registration form
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regUsername.trim()) return;

    const newUser: User = {
      username: regUsername.trim(),
      avatarUrl: selectedAvatarUrl,
      category: "MEMBER",
      bio: "Joined ChatGroup. Let's communicate in real-time."
    };

    setCurrentUser(newUser);
    localStorage.setItem("chatgroup_current_user", JSON.stringify(newUser));

    setRegisteredUsers((prev) => {
      const exists = prev.some((u) => u.username.toLowerCase() === newUser.username.toLowerCase());
      if (exists) return prev;
      const nextList = [...prev, newUser];
      localStorage.setItem("chatgroup_registered_users", JSON.stringify(nextList));
      return nextList;
    });

    const channel = new BroadcastChannel("chatgroup_realtime");
    channel.postMessage({
      type: "USER_REGISTER",
      user: newUser
    });
    channel.close();
  };

  // Send message submit
  const handleSendMessage = (textToSend = inputText, imageLink?: string) => {
    const textContent = textToSend.trim();
    if (!textContent && !imageLink) return;
    if (!currentUser || !activeContact) return;

    const timeString = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

    const newMsg: Message = {
      id: Math.random().toString(36).substring(2, 9),
      sender: currentUser.username,
      recipient: activeContact.username,
      text: textContent,
      imageUrl: imageLink,
      time: timeString,
      status: "sent",
      isNew: true
    };

    setMessages((prev) => {
      const nextMsgs = [...prev, newMsg];
      localStorage.setItem("chatgroup_messages", JSON.stringify(nextMsgs));
      return nextMsgs;
    });

    setInputText("");
    playSound("send");
    setTimeout(() => scrollToBottom("smooth"), 50);

    if (myTypingTimeoutRef.current) {
      clearTimeout(myTypingTimeoutRef.current);
    }
    if (channelRef.current) {
      channelRef.current.postMessage({
        type: "TYPING",
        from: currentUser.username,
        to: activeContact.username,
        isTyping: false
      });
      channelRef.current.postMessage({
        type: "MSG",
        msg: newMsg,
        from: currentUser.username,
        to: activeContact.username
      });
    }

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMsg.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 1000);

    // Trigger mock responses if needed
    const isMock = MOCK_CONTACTS.some((c) => c.username === activeContact.username);
    const isOffline = onlineUsers[activeContact.username] === "offline" || !onlineUsers[activeContact.username];
    if (isMock && isOffline) {
      triggerMockResponse(activeContact.username);
    }
  };

  // Simulated responses for offline directory contacts
  const triggerMockResponse = (contactName: string) => {
    setTimeout(() => {
      setTypingUsers((prev) => ({ ...prev, [contactName]: true }));
      setTimeout(() => scrollToBottom("smooth"), 50);

      setTimeout(() => {
        const replies = [
          "Cool! I'll double check my schedules.",
          "Awesome. Send me the media logs when you've got them.",
          "It's a gorgeous photo, where was it taken?",
          "Sure thing, talk to you later tonight!",
          "Yes! Let's get together soon."
        ];
        const text = replies[Math.floor(Math.random() * replies.length)];
        const timeString = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        });

        const replyMessage: Message = {
          id: Math.random().toString(36).substring(2, 9),
          sender: contactName,
          recipient: currentUser?.username || "Ann",
          text,
          time: timeString,
          isNew: true
        };

        setMessages((prev) => {
          const next = [...prev, replyMessage];
          localStorage.setItem("chatgroup_messages", JSON.stringify(next));
          return next;
        });

        setTypingUsers((prev) => ({ ...prev, [contactName]: false }));
        playSound("receive");
        setTimeout(() => scrollToBottom("smooth"), 50);
      }, 2000);
    }, 1500);
  };

  // Mock attachment click: triggers a gorgeous nature photography message send
  const handleSendMockImage = () => {
    if (!currentUser || !activeContact) return;
    const mockImageUrls = [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1472214222555-d404758b1c42?auto=format&fit=crop&w=400&q=80"
    ];
    const chosenImage = mockImageUrls[Math.floor(Math.random() * mockImageUrls.length)];
    handleSendMessage("", chosenImage);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveContact(MOCK_CONTACTS[0]);
    localStorage.removeItem("chatgroup_current_user");
  };

  // Filters messages for selected user
  const conversationMessages = messages.filter(
    (msg) =>
      currentUser &&
      activeContact &&
      ((msg.sender === currentUser.username && msg.recipient === activeContact.username) ||
        (msg.sender === activeContact.username && msg.recipient === currentUser.username))
  );

  // Filters contacts list for sidebar search
  const filteredContacts = registeredUsers.filter(
    (user) =>
      currentUser &&
      user.username.toLowerCase() !== currentUser.username.toLowerCase() &&
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get last message info for sidebar preview
  const getLastMessage = (username: string) => {
    const thread = messages.filter(
      (m) =>
        currentUser &&
        ((m.sender === currentUser.username && m.recipient === username) ||
          (m.sender === username && m.recipient === currentUser.username))
    );
    return thread[thread.length - 1];
  };

  const renderCheckmarks = (status: "sent" | "delivered" | "read") => {
    // Matches screenshot double checkmarks!
    const color = status === "read" ? "text-emerald-500" : "text-slate-400";
    return (
      <svg
        className={`w-3.5 h-3.5 inline ml-1 ${color} transition-colors duration-300`}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25l6-6 4.5-4.5" />
      </svg>
    );
  };

  return (
    <div className="w-full h-screen max-h-screen bg-white text-slate-800 flex flex-col font-sans antialiased overflow-hidden">
      
      {/* 1. TOP CHATGROUP NAVBAR */}
      <header className="h-[60px] border-b border-slate-200 bg-white px-6 flex items-center justify-between z-50 flex-shrink-0">
        
        {/* Left Branding */}
        <div className="flex items-center gap-2.5 select-none">
          <svg className="w-6.5 h-6.5 text-sky-500 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.119 2 11.2c0 2.925 1.458 5.519 3.743 7.151l-.736 2.946a.75.75 0 001.087.828l3.414-1.707c.803.18 1.637.282 2.492.282 5.523 0 10-4.119 10-9.2C22 6.119 17.523 2 12 2zm1 13h-2v-2h2v2zm0-4h-2V7h2v4z" />
          </svg>
          {/* Custom logo text font */}
          <span className="text-[19px] font-extrabold tracking-tight bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ChatGroup
          </span>
        </div>

        {/* Center Search bar (Fidelity replica) */}
        <div className="hidden md:flex w-[260px] h-[36px] bg-slate-100 border border-slate-200 rounded-lg items-center px-3 gap-2">
          <svg className="w-4.5 h-4.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm w-full outline-none text-slate-700 placeholder-slate-400 font-normal"
          />
        </div>

        {/* Right Nav Icons (Replica menu with sm: responsive visibility) */}
        <div className="flex items-center gap-5">
          {/* Search Icon */}
          <button className="text-slate-600 hover:text-slate-900 transition-colors hidden sm:block">
            <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
            </svg>
          </button>
          
          {/* Direct Messages Icon */}
          <button className="text-slate-600 hover:text-slate-900 transition-colors relative">
            <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
            <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-red-500 text-[9px] font-bold flex items-center justify-center text-white">1</span>
          </button>

          {/* Home Icon */}
          <button className="text-slate-600 hover:text-slate-900 transition-colors hidden sm:block">
            <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </button>

          {/* Notifications Heart */}
          <button className="text-slate-600 hover:text-slate-900 transition-colors hidden sm:block">
            <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>

          {/* Logged in user circle profile */}
          {currentUser ? (
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.username}
              className="w-7 h-7 rounded-full object-cover border border-slate-200 active:scale-95 transition-transform"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 border border-white/20 flex items-center justify-center text-white">
              <span className="text-[10px] font-bold">U</span>
            </div>
          )}
        </div>
      </header>

      {/* 2. AUTH / LOGOUT / REGISTER CONTAINER */}
      {!currentUser ? (
        <div className="flex-1 flex items-center justify-center bg-white p-6">
          <div className="w-full max-w-[390px] bg-white rounded-2xl p-8 shadow-[0_15px_40px_rgba(0,0,0,0.04)] flex flex-col items-center animate-chat-bubble border border-slate-200">
            
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/10 mb-4 text-white">
              <svg className="w-7 h-7 stroke-[2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>

            <h2 className="text-xl font-extrabold tracking-wide text-slate-800 mb-1">Enter ChatGroup</h2>
            <p className="text-[12px] text-slate-500 text-center mb-6 leading-relaxed">
              Register a username and choose a profile photo to start chatting in real-time.
            </p>

            <form onSubmit={handleRegister} className="w-full flex flex-col gap-5">
              {/* Preset avatars selection grid */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Select Profile Face</span>
                <div className="grid grid-cols-6 gap-2">
                  {PRESET_AVATARS.map((avatar, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setSelectedAvatarUrl(avatar)}
                      className={`relative w-10 h-10 rounded-full overflow-hidden border-2 transition-all active:scale-90 ${
                        selectedAvatarUrl === avatar ? "border-sky-500 scale-105" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={avatar} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Username input */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Username</label>
                <input
                  type="text"
                  maxLength={18}
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  placeholder="e.g. Ann"
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 focus:border-sky-500/50 rounded-xl outline-none text-sm text-slate-800 placeholder-slate-400 transition-colors font-medium shadow-sm"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!regUsername.trim()}
                className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 font-bold text-white rounded-xl shadow-md active:scale-95 transition-all text-sm mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Join Server
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* MAIN 3-COLUMN FLEXBOARD VIEWPORT */
        <div className="flex-1 flex overflow-hidden w-full relative">
          
          {/* COLUMN 1: LEFT SIDEBAR MESSAGES LIST (350px) */}
          <section 
            className={`bg-[#ffffff] border-r border-slate-200 flex flex-col flex-shrink-0 transition-all duration-300 ${
              activeContact 
                ? "hidden md:flex w-[350px] h-full" // Collapse on mobile view if direct message is active
                : "w-full md:w-[350px] h-full"
            }`}
          >
            {/* Search Input bar */}
            <div className="p-4 flex flex-col gap-3 border-b border-slate-100">
              <div className="w-full h-[36px] bg-slate-50 border border-slate-200 rounded-lg flex items-center px-3 gap-2">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm w-full outline-none text-slate-700 placeholder-slate-400 font-normal"
                />
              </div>
              
              <div className="flex justify-between items-center text-xs text-slate-400 font-bold tracking-wide">
                {/* Dropdown filters and direct message blue circular action button */}
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-600">
                  <span>Latest First</span>
                  <svg className="w-3 h-3 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
                
                <button 
                  onClick={handleLogout}
                  className="w-6 h-6 rounded-full bg-sky-500 hover:bg-sky-400 text-white flex items-center justify-center active:scale-90 transition-transform shadow-md"
                >
                  <svg className="w-3.5 h-3.5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Scrollable contact items list */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {filteredContacts.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">No contacts found</div>
              ) : (
                filteredContacts.map((user) => {
                  const isOnline = onlineUsers[user.username] === "online";
                  const isAway = onlineUsers[user.username] === "away";
                  const isTyping = typingUsers[user.username];
                  const isActive = activeContact?.username === user.username;
                  const lastMsg = getLastMessage(user.username);
                  
                  // Render active notification badge for "Paul Osmand" or "Edward Davis" matching picture
                  const hasMockBadge = (user.username === "Paul Osmand" || user.username === "Edward Davis") && !lastMsg;

                  return (
                    <button
                      key={user.username}
                      onClick={() => setActiveContact(user)}
                      className={`w-full p-3.5 flex items-center gap-3.5 rounded-xl hover-scale relative ${
                        isActive
                          ? "bg-slate-100"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      {/* Avatar with status dots and active indicators */}
                      <div className="relative flex-shrink-0">
                        <div className={`w-[52px] h-[52px] rounded-full overflow-hidden p-[2.5px] ${
                          isActive ? "insta-gradient-border" : "border border-slate-200"
                        }`}>
                          <img 
                            src={user.avatarUrl} 
                            className="w-full h-full rounded-full object-cover border border-white" 
                          />
                        </div>
                        
                        {/* Status Circle Indicator */}
                        <span className={`absolute top-0.5 right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                          isTyping ? "bg-amber-400 animate-pulse" :
                          isOnline ? "bg-emerald-500 pulse-online" :
                          isAway ? "bg-amber-500" : "bg-slate-300"
                        }`} />
                      </div>
                      
                      {/* Name / Preview logs */}
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                          <span className="text-[13.5px] font-bold text-slate-700 tracking-wide truncate">
                            {user.username.toUpperCase()}
                          </span>
                          {lastMsg ? (
                            <span className="text-[10px] text-slate-400 font-semibold">{lastMsg.time}</span>
                          ) : (
                            <span className="text-[10px] text-slate-400 font-medium">08:04 AM</span>
                          )}
                        </div>
                        
                        <p className="text-[11.5px] text-slate-500 truncate leading-snug">
                          {isTyping ? (
                            <span className="text-purple-500 font-bold animate-pulse">typing...</span>
                          ) : lastMsg ? (
                            lastMsg.text || "📷 Photo attachment"
                          ) : (
                            user.statusText || "Start DM"
                          )}
                        </p>
                      </div>

                      {/* Mock Notification Badge */}
                      {hasMockBadge && (
                        <span className="absolute right-4 w-4.5 h-4.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-[10px] font-black text-white flex items-center justify-center select-none shadow">
                          1
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </section>

          {/* COLUMN 2: MIDDLE PANE - ACTIVE DIRECT MESSAGE STREAM */}
          <main 
            className={`flex-1 flex flex-col bg-[#ffffff] border-r border-slate-200 transition-all duration-300 ${
              !activeContact 
                ? "hidden md:flex h-full items-center justify-center" // Center dashboard if no contact selected
                : "flex h-full"
            }`}
          >
            {activeContact ? (
              <>
                {/* Active Chat Header */}
                <header className="h-[60px] px-6 border-b border-slate-200 bg-[#ffffff] flex items-center justify-between flex-shrink-0 z-40 select-none">
                  <div className="flex items-center gap-3">
                    {/* Responsive Back Button for mobile */}
                    <button 
                      onClick={() => setActiveContact(null)}
                      className="md:hidden p-1.5 rounded-full text-slate-500 hover:text-slate-800 active:scale-95"
                    >
                      <svg className="w-5 h-5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>

                    <div className="relative">
                      <img
                        src={activeContact.avatarUrl}
                        alt={activeContact.username}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                      <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-white ${
                        typingUsers[activeContact.username] ? "bg-amber-400 animate-pulse" :
                        onlineUsers[activeContact.username] === "online" ? "bg-emerald-500" :
                        onlineUsers[activeContact.username] === "away" ? "bg-amber-500" : "bg-slate-300"
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 tracking-wide">{activeContact.username}</h3>
                      <p className="text-[10px] text-slate-400 font-semibold tracking-wide">
                        {typingUsers[activeContact.username] ? "typing..." : "Active now"}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Right Detail View button */}
                  <button 
                    onClick={() => setIsDetailPaneOpen((prev) => !prev)}
                    className={`w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all active:scale-90 ${
                      isDetailPaneOpen ? "bg-slate-100 text-slate-700" : ""
                    }`}
                  >
                    <svg className="w-5.5 h-5.5 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                  </button>
                </header>

                {/* Message feeds stream (Avatars adjacent to bubble elements) */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 bg-white custom-scrollbar flex flex-col">
                  
                  {/* Real-time tab sync info header banner */}
                  <div className="w-full bg-indigo-50 border border-indigo-100 rounded-xl p-3 flex items-center justify-between text-xs text-indigo-700 gap-3 shadow-sm select-none animate-chat-bubble flex-shrink-0">
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                      </span>
                      <span><b>Real-time Sync Active</b>: Open this site in another tab to chat live.</span>
                    </div>
                    <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider bg-indigo-500/10 px-2 py-0.5 rounded">Tab Sync</span>
                  </div>

                  {conversationMessages.map((msg) => {
                    const isMe = msg.sender === currentUser.username;
                    
                    return (
                      <div
                        key={msg.id}
                        className={`flex w-full items-end gap-2.5 ${
                          isMe ? "justify-end" : "justify-start"
                        } ${msg.isNew ? "animate-chat-bubble" : ""}`}
                      >
                        {/* 1. If recipient: Show recipient avatar on the left side of bubble */}
                        {!isMe && (
                          <img
                            src={activeContact.avatarUrl}
                            alt={activeContact.username}
                            className="w-[28px] h-[28px] rounded-full object-cover border border-slate-200 flex-shrink-0 select-none mb-1"
                          />
                        )}

                        {/* 2. Chat message bubble container */}
                        <div className="flex flex-col max-w-[70%]">
                          <div
                            className={`px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed shadow-sm break-words relative ${
                              isMe
                                ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-br-sm bubble-shadow-me"
                                : "bg-slate-100 text-slate-800 rounded-bl-sm bubble-shadow-them"
                            }`}
                          >
                            {/* Text message */}
                            {msg.text && <p className="font-normal">{msg.text}</p>}
                            
                            {/* Image attachment message if present */}
                            {msg.imageUrl && (
                              <img
                                src={msg.imageUrl}
                                alt="Attachment"
                                className="rounded-lg max-h-[220px] object-cover mt-1 select-none border border-slate-200/50"
                              />
                            )}

                            {/* Bubble footer stats */}
                            <div className="flex items-center justify-end mt-1 text-[9px] font-semibold select-none">
                              <span className={isMe ? "text-white/80" : "text-slate-400"}>{msg.time}</span>
                              {isMe && msg.status && renderCheckmarks(msg.status)}
                            </div>
                          </div>
                        </div>

                        {/* 3. If sender: Show user's avatar on the right side of bubble */}
                        {isMe && (
                          <img
                            src={currentUser.avatarUrl}
                            alt={currentUser.username}
                            className="w-[28px] h-[28px] rounded-full object-cover border border-slate-200 flex-shrink-0 select-none mb-1"
                          />
                        )}
                      </div>
                    );
                  })}

                  {/* typing status indicator visual overlay */}
                  {typingUsers[activeContact.username] && (
                    <div className="flex w-full items-end gap-2.5 justify-start animate-chat-bubble">
                      <img
                        src={activeContact.avatarUrl}
                        alt={activeContact.username}
                        className="w-[28px] h-[28px] rounded-full object-cover border border-slate-200 flex-shrink-0 mb-1"
                      />
                      <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-slate-100 text-slate-800 flex items-center gap-1.5 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Instagram Direct style Footer input box */}
                <footer className="p-4 border-t border-slate-200 bg-[#ffffff] flex items-center gap-3 select-none flex-shrink-0">
                  
                  {/* Photo mock attachment trigger */}
                  <button 
                    onClick={handleSendMockImage}
                    title="Send photography media"
                    className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all active:scale-90"
                  >
                    <svg className="w-6.5 h-6.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </button>

                  {/* Emoji Picker Popover Wrapper */}
                  <div className="relative" ref={emojiPickerRef}>
                    <button 
                      onClick={() => setIsEmojiPickerOpen((prev) => !prev)}
                      title="Insert emoji"
                      className={`p-1.5 rounded-full hover:bg-slate-100 transition-all active:scale-90 ${
                        isEmojiPickerOpen ? "text-sky-500 bg-slate-100" : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      <svg className="w-6.5 h-6.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                      </svg>
                    </button>

                    {/* Interactive Emojis Popover Panel */}
                    {isEmojiPickerOpen && (
                      <div className="absolute bottom-[52px] left-0 w-[270px] bg-[#ffffff] border border-slate-200 rounded-2xl p-3 shadow-xl flex flex-col z-50 animate-chat-bubble select-none">
                        
                        {/* Tab Selector Categories Header */}
                        <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-2">
                          {EMOJI_CATEGORIES.map((cat) => (
                            <button
                              type="button"
                              key={cat.name}
                              onClick={() => setActiveEmojiCategory(cat.name)}
                              title={cat.name}
                              className={`w-7 h-7 flex items-center justify-center rounded-lg text-sm transition-all active:scale-95 ${
                                activeEmojiCategory === cat.name ? "bg-slate-100 text-slate-800" : "opacity-50 hover:opacity-100"
                              }`}
                            >
                              {cat.icon}
                            </button>
                          ))}
                        </div>

                        {/* Emojis list grid layout scrollable */}
                        <div className="grid grid-cols-7 gap-1.5 overflow-y-auto max-h-[140px] custom-scrollbar p-1">
                          {EMOJI_CATEGORIES.find((c) => c.name === activeEmojiCategory)?.list.map((emoji) => (
                            <button
                              type="button"
                              key={emoji}
                              onClick={() => setInputText((prev) => prev + emoji)}
                              className="w-8 h-8 flex items-center justify-center text-[18px] hover:bg-slate-100 active:scale-90 rounded-lg transition-all"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* unified text container input */}
                  <div className="flex-1 h-[44px] px-4 bg-slate-50 border border-slate-200 focus-within:border-slate-300 transition-colors rounded-full flex items-center">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Message..."
                      className="bg-transparent text-sm w-full outline-none text-slate-800 placeholder-slate-400 font-normal"
                    />
                  </div>

                  {/* Microphone dictation mockup */}
                  <button 
                    onClick={() => {
                      setInputText("Listening...");
                      setTimeout(() => setInputText("I'm skating tonight!"), 1500);
                    }}
                    className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all active:scale-90"
                  >
                    <svg className="w-6.5 h-6.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                    </svg>
                  </button>

                  {/* Send Action Arrow Button (Gradient background style matching photo) */}
                  <button
                    onClick={() => handleSendMessage()}
                    className={`w-[40px] h-[40px] rounded-full flex items-center justify-center transition-all ${
                      inputText.trim()
                        ? "insta-send-gradient hover:opacity-90 active:scale-90 text-white shadow-md"
                        : "bg-slate-100 text-slate-300 cursor-not-allowed"
                    }`}
                    disabled={!inputText.trim()}
                  >
                    <svg className="w-[16px] h-[16px] rotate-45 -translate-x-[1px] stroke-[2.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </button>
                </footer>
              </>
            ) : (
              /* If no chat is active */
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-white select-none">
                <div className="w-20 h-20 rounded-full border-2 border-slate-200 flex items-center justify-center text-slate-400 mb-4 shadow-sm bg-white">
                  <svg className="w-10 h-10 stroke-[1.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </div>
                <h2 className="text-[17px] font-bold text-slate-700 uppercase tracking-widest">Your Messages</h2>
                <p className="text-[12px] text-slate-400 max-w-[240px] mt-2 leading-relaxed">
                  Send private messages and media photos to a friend or group. Select a conversation to start.
                </p>
              </div>
            )}
          </main>

          {/* COLUMN 3: RIGHT PANEL - CONTACT DETAIL INFO DISPLAY (320px) */}
          {activeContact && isDetailPaneOpen && (
            <aside 
              className="w-full lg:w-[320px] bg-white border-l border-slate-200 flex flex-col items-center p-6 text-center select-none z-45 animate-chat-bubble absolute lg:static top-0 right-0 h-full lg:h-auto shadow-2xl lg:shadow-none"
            >
              {/* Close Button on mobile screen overlay overlay */}
              <button 
                onClick={() => setIsDetailPaneOpen(false)}
                className="lg:hidden absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Large Profile Picture Photo */}
              <div className="relative mt-8 mb-5 select-none">
                <div className="w-[120px] h-[120px] rounded-full overflow-hidden border border-slate-200 p-[3px] shadow-sm">
                  <img
                    src={activeContact.avatarUrl}
                    alt={activeContact.username}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              {/* Title Names */}
              <h2 className="text-[18px] font-black tracking-wide text-slate-800 mb-0.5">
                {activeContact.username.toUpperCase()}
              </h2>
              <p className="text-[11px] font-extrabold tracking-widest text-slate-400 uppercase mb-4">
                {activeContact.category || "MEMBER"}
              </p>

              {/* Description Biography Block */}
              <p className="text-[12px] leading-relaxed text-slate-500 max-w-[240px] mb-6 font-medium">
                {activeContact.bio || "No profile biography available yet."}
              </p>

              {/* Blue Action CTA view button */}
              <button className="px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 font-bold text-white active:scale-95 transition-all text-xs tracking-wide shadow-md">
                VIEW PROFILE
              </button>

              {/* Dialing buttons footer (Phone + video) */}
              <div className="flex gap-4 mt-auto pt-8 select-none">
                {/* Voice Call */}
                <button className="w-[52px] h-[52px] rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center active:scale-90 transition-all shadow-sm">
                  <svg className="w-5.5 h-5.5 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </button>
                {/* Video Call */}
                <button className="w-[52px] h-[52px] rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center active:scale-90 transition-all shadow-sm">
                  <svg className="w-5.5 h-5.5 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.557-5.118-3.851-6.674-6.674l1.293-.97c.362-.272.528-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </button>
              </div>
            </aside>
          )}

        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  Send,
  Phone,
  MoreVertical,
  MapPin,
  Clock
} from "lucide-react";

const mockConversations = [
  {
    id: "1",
    participant: {
      name: "Sarah Johnson",
      avatar: "",
      isOnline: true
    },
    lastMessage: {
      text: "I'll be there in 5 minutes!",
      timestamp: new Date(),
      isRead: false,
      fromMe: false
    },
    trip: {
      route: "Campus → Downtown Mall",
      datetime: new Date(2024, 7, 29, 14, 30)
    }
  },
  {
    id: "2",
    participant: {
      name: "Mike Chen",
      avatar: "",
      isOnline: false
    },
    lastMessage: {
      text: "Thanks for the ride! 5 stars ⭐",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true,
      fromMe: false
    },
    trip: {
      route: "Dormitory → Airport",
      datetime: new Date(2024, 7, 28, 9, 0)
    }
  },
  {
    id: "3",
    participant: {
      name: "Emma Wilson",
      avatar: "",
      isOnline: true
    },
    lastMessage: {
      text: "What time should I be ready?",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: true,
      fromMe: false
    },
    trip: {
      route: "Campus → City Center",
      datetime: new Date(2024, 7, 30, 16, 0)
    }
  }
];

const mockMessages = [
  {
    id: "1",
    text: "Hi! I'm interested in your ride to Downtown Mall tomorrow.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    fromMe: false
  },
  {
    id: "2",
    text: "Great! There's still space available. The pickup is at 2:30 PM from the Computer Science building.",
    timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000),
    fromMe: true
  },
  {
    id: "3",
    text: "Perfect! I'll be there at 2:25 PM. Should I wait at the main entrance?",
    timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000),
    fromMe: false
  },
  {
    id: "4",
    text: "Yes, I'll be in a blue Honda Civic. I'll send you my number closer to the time.",
    timestamp: new Date(Date.now() - 21 * 60 * 60 * 1000),
    fromMe: true
  },
  {
    id: "5",
    text: "I'll be there in 5 minutes!",
    timestamp: new Date(),
    fromMe: false
  }
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${Math.floor(diffHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message
      setNewMessage("");
    }
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-8rem)] flex gap-6">
        {/* Conversations List */}
        <Card className="w-1/3 flex flex-col">
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-2 p-2">
            {mockConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedConversation.id === conversation.id
                    ? 'bg-primary/10 border border-primary/20'
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversation.participant.avatar} />
                      <AvatarFallback>
                        {conversation.participant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.participant.isOnline && (
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-success rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm truncate">
                        {conversation.participant.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(conversation.lastMessage.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-1">
                      {conversation.trip.route}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <p className={`text-sm truncate ${
                        !conversation.lastMessage.isRead && !conversation.lastMessage.fromMe
                          ? 'font-medium text-foreground'
                          : 'text-muted-foreground'
                      }`}>
                        {conversation.lastMessage.text}
                      </p>
                      {!conversation.lastMessage.isRead && !conversation.lastMessage.fromMe && (
                        <Badge className="h-2 w-2 p-0 bg-primary"></Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Message View */}
        <Card className="flex-1 flex flex-col">
          {/* Chat Header */}
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedConversation.participant.avatar} />
                    <AvatarFallback>
                      {selectedConversation.participant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {selectedConversation.participant.isOnline && (
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-success rounded-full border-2 border-background"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{selectedConversation.participant.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{selectedConversation.trip.route}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{selectedConversation.trip.datetime.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.fromMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.fromMe
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.fromMe ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
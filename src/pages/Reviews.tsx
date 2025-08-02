import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star,
  ThumbsUp,
  MessageCircle,
  TrendingUp
} from "lucide-react";

const mockReceivedReviews = [
  {
    id: "1",
    reviewer: {
      name: "Sarah Johnson",
      avatar: "",
      isVerified: true
    },
    rating: 5,
    comment: "Excellent driver! Very punctual and the car was clean. Great conversation during the ride. Would definitely ride with John again!",
    date: new Date(2024, 7, 25),
    trip: "Campus → Downtown Mall"
  },
  {
    id: "2",
    reviewer: {
      name: "Mike Chen",
      avatar: "",
      isVerified: true
    },
    rating: 5,
    comment: "Perfect ride to the airport. John was early, helped with luggage, and the music was great. Highly recommend!",
    date: new Date(2024, 7, 22),
    trip: "Dormitory → Airport"
  },
  {
    id: "3",
    reviewer: {
      name: "Emma Wilson",
      avatar: "",
      isVerified: false
    },
    rating: 4,
    comment: "Good ride overall. Car was comfortable and John was friendly. Only minor issue was we were a few minutes late.",
    date: new Date(2024, 7, 20),
    trip: "Library → City Center"
  }
];

const mockGivenReviews = [
  {
    id: "1",
    reviewee: {
      name: "Alice Martinez",
      avatar: "",
      isVerified: true
    },
    rating: 5,
    comment: "Great passenger! Very respectful and easy to talk to. Was ready on time.",
    date: new Date(2024, 7, 23),
    trip: "Campus → Shopping District"
  },
  {
    id: "2",
    reviewee: {
      name: "David Kim",
      avatar: "",
      isVerified: true
    },
    rating: 4,
    comment: "Nice guy, good conversation. Just took a bit longer to find the pickup spot.",
    date: new Date(2024, 7, 18),
    trip: "Science Building → Train Station"
  }
];

export default function Reviews() {
  const overallRating = 4.8;
  const totalReviews = 127;
  
  const ratingDistribution = [
    { stars: 5, count: 98, percentage: 77 },
    { stars: 4, count: 23, percentage: 18 },
    { stars: 3, count: 4, percentage: 3 },
    { stars: 2, count: 2, percentage: 2 },
    { stars: 1, count: 0, percentage: 0 }
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-warning text-warning' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Reviews & Ratings</h1>
          <p className="text-muted-foreground">
            See what others say about your rides and trips
          </p>
        </div>

        {/* Rating Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overall Rating */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Overall Rating</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div>
                <div className="text-4xl font-bold text-primary">{overallRating}</div>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  {renderStars(5)}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on {totalReviews} reviews
                </p>
              </div>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">98%</div>
                  <div className="text-xs text-muted-foreground">Positive</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">127</div>
                  <div className="text-xs text-muted-foreground">Total</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rating Distribution */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Rating Breakdown</CardTitle>
              <CardDescription>How passengers rate your service</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-16">
                    <span className="text-sm">{item.stars}</span>
                    <Star className="h-3 w-3 fill-warning text-warning" />
                  </div>
                  <Progress value={item.percentage} className="flex-1" />
                  <span className="text-sm text-muted-foreground w-12">
                    {item.count}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Reviews Tabs */}
        <Tabs defaultValue="received" className="space-y-4">
          <TabsList>
            <TabsTrigger value="received">
              Reviews Received ({mockReceivedReviews.length})
            </TabsTrigger>
            <TabsTrigger value="given">
              Reviews Given ({mockGivenReviews.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="received" className="space-y-4">
            {mockReceivedReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={review.reviewer.avatar} />
                      <AvatarFallback>
                        {review.reviewer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{review.reviewer.name}</h3>
                          {review.reviewer.isVerified && (
                            <Badge variant="secondary" className="text-xs">
                              ✓ Verified
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(review.date)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          • {review.trip}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground">{review.comment}</p>
                      
                      <div className="flex items-center space-x-4 pt-2">
                        <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground">
                          <ThumbsUp className="h-4 w-4" />
                          <span>Helpful</span>
                        </button>
                        <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground">
                          <MessageCircle className="h-4 w-4" />
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="given" className="space-y-4">
            {mockGivenReviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={review.reviewee.avatar} />
                      <AvatarFallback>
                        {review.reviewee.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{review.reviewee.name}</h3>
                          {review.reviewee.isVerified && (
                            <Badge variant="secondary" className="text-xs">
                              ✓ Verified
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(review.date)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          • {review.trip}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Insights & Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-success mb-2">Top Strengths</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Punctuality (mentioned 89% of reviews)</li>
                  <li>• Clean vehicle (mentioned 76% of reviews)</li>
                  <li>• Friendly conversation (mentioned 82% of reviews)</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-warning mb-2">Areas to Improve</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• GPS accuracy for pickup locations</li>
                  <li>• Communication about delays</li>
                  <li>• Music volume preferences</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Recent Trends</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Rating increased by 0.2 this month</li>
                  <li>• 15% more positive comments</li>
                  <li>• Airport trips rated highest (4.9/5)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
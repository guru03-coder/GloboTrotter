import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CommunityPost {
  id: number;
  author: {
    name: string;
    avatar: string;
    initials: string;
  };
  content: string;
  image?: string;
  tripName?: string;
  location?: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
  timeAgo: string;
}

const communityPosts: CommunityPost[] = [
  {
    id: 1,
    author: { name: "Priya Sharma", avatar: "", initials: "PS" },
    content: "Just spent a week exploring the backwaters of Kerala on a houseboat! The sunrise over Alleppey was absolutely magical. Must-visit for anyone seeking peace 🌅",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=500&fit=crop&q=80",
    tripName: "Kerala Backwaters Retreat",
    location: "Alleppey, Kerala",
    likes: 342,
    comments: 56,
    isLiked: false,
    isBookmarked: false,
    timeAgo: "2 hours ago",
  },
  {
    id: 2,
    author: { name: "Rahul Verma", avatar: "", initials: "RV" },
    content: "Conquered Rohtang Pass! The snow-capped peaks and winding roads of Manali are breathtaking. Pro tip: Start early to avoid traffic and get the best views 🏔️",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=500&fit=crop&q=80",
    tripName: "Himalayan Adventure",
    location: "Manali, Himachal Pradesh",
    likes: 267,
    comments: 43,
    isLiked: true,
    isBookmarked: false,
    timeAgo: "5 hours ago",
  },
  {
    id: 3,
    author: { name: "Ananya Patel", avatar: "", initials: "AP" },
    content: "Lakshadweep is India's best kept secret! Crystal clear waters, pristine beaches, and the most peaceful vibes. Like Maldives but better! 🏝️",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop&q=80",
    tripName: "Island Paradise",
    location: "Lakshadweep Islands",
    likes: 512,
    comments: 89,
    isLiked: false,
    isBookmarked: true,
    timeAgo: "1 day ago",
  },
  {
    id: 4,
    author: { name: "Vikram Singh", avatar: "", initials: "VS" },
    content: "The Pink City lived up to its name! Hawa Mahal at sunset is a photographer's dream. Don't miss the authentic Rajasthani thali at local restaurants 🏰",
    tripName: "Rajasthan Heritage",
    location: "Jaipur, Rajasthan",
    likes: 423,
    comments: 67,
    isLiked: false,
    isBookmarked: false,
    timeAgo: "2 days ago",
  },
];

const CommunityPage = () => {
  const [posts, setPosts] = useState(communityPosts);

  const toggleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const toggleBookmark = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, isBookmarked: !post.isBookmarked } : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Feed */}
            <div className="lg:col-span-3 space-y-6">
              {/* Header */}
              <div className="animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  <span className="gradient-text">Community</span>
                </h1>
                <p className="text-muted-foreground">
                  Share your travel experiences across India and discover adventures from fellow travelers
                </p>
              </div>

              {/* Search */}
              <SearchBar placeholder="Search posts, trips, activities..." />

              {/* Posts */}
              <div className="space-y-4 animate-slide-up">
                {posts.map((post) => (
                  <Card key={post.id} glass className="overflow-hidden">
                    <CardContent className="p-0">
                      {/* Author Header */}
                      <div className="flex items-center gap-3 p-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                          {post.author.initials}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{post.author.name}</p>
                          <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
                        </div>
                        {post.tripName && (
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg">
                            {post.tripName}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="px-4 pb-3">
                        <p className="text-foreground">{post.content}</p>
                        {post.location && (
                          <p className="text-sm text-muted-foreground mt-2">📍 {post.location}</p>
                        )}
                      </div>

                      {/* Image */}
                      {post.image && (
                        <div className="relative">
                          <img
                            src={post.image}
                            alt={post.tripName}
                            className="w-full h-64 object-cover"
                          />
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between p-4 border-t border-border">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleLike(post.id)}
                            className={cn(
                              "gap-2",
                              post.isLiked && "text-destructive"
                            )}
                          >
                            <Heart
                              size={18}
                              fill={post.isLiked ? "currentColor" : "none"}
                            />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <MessageCircle size={18} />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 size={18} />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleBookmark(post.id)}
                          className={cn(post.isBookmarked && "text-primary")}
                        >
                          <Bookmark
                            size={18}
                            fill={post.isBookmarked ? "currentColor" : "none"}
                          />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Card glass className="p-4">
                <h3 className="font-semibold mb-3">About Community</h3>
                <p className="text-sm text-muted-foreground">
                  Join India's largest travel community! Share your experiences, discover hidden gems, and connect with fellow travelers exploring Incredible India.
                </p>
              </Card>

              <Card glass className="p-4">
                <h3 className="font-semibold mb-3">Trending Destinations</h3>
                <div className="flex flex-wrap gap-2">
                  {["#Kerala", "#Manali", "#Lakshadweep", "#Rajasthan", "#Ladakh", "#Goa", "#Varanasi"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-lg hover:bg-primary/20 hover:text-primary cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommunityPage;

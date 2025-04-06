
// Improved tweet service
const sampleTweet = {
  avatar: "",
  name: "John Doe",
  username: "johndoe",
  verified: true,
  content: "Just tried this amazing Tweet Screenshot Generator! It's a game-changer for creating professional social media content. Check it out!",
  date: "10:30 AM · Apr 3, 2025",
  likes: 42,
  retweets: 9,
  comments: 3,
  views: 1240
};

// Better function to fetch tweet data from a URL
export const fetchTweetData = async (tweetUrl: string) => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (tweetUrl === "sample") {
      return { ...sampleTweet, success: true };
    }
    
    // Validate URL first
    if (!tweetUrl.startsWith("https://twitter.com/") && !tweetUrl.startsWith("https://x.com/")) {
      return { 
        success: false, 
        error: "Invalid URL. Please enter a valid Twitter or X.com URL" 
      };
    }
    
    // Extract tweet ID from URL (improved version)
    const tweetId = extractTweetId(tweetUrl);
    
    if (!tweetId) {
      return { 
        success: false, 
        error: "Could not extract tweet ID from URL. Make sure it's a valid tweet link" 
      };
    }
    
    // In a production implementation, this would call a backend API using Puppeteer
    // to capture the actual tweet and extract its data
    // For this demo, we're returning mock data based on the tweet ID
    const username = extractUsername(tweetUrl);
    
    // return {
    //   avatar: "",
    //   name: username ? capitalizeFirstLetter(username) : "Twitter User",
    //   username: username || "user" + tweetId.substring(0, 4),
    //   verified: Math.random() > 0.5,
    //   content: `This is tweet #${tweetId}. In a production implementation, this would show the actual tweet content captured using Puppeteer.`,
    //   date: "10:30 AM · Apr 3, 2025",
    //   likes: Math.floor(Math.random() * 1000),
    //   retweets: Math.floor(Math.random() * 100),
    //   comments: Math.floor(Math.random() * 50),
    //   views: Math.floor(Math.random() * 10000),
    //   success: true
    // };

    
  } catch (error) {
    console.error("Error fetching tweet:", error);
    return {
      success: false,
      error: "Failed to fetch tweet data"
    };
  }
};

// Improved function to extract tweet ID from URL
const extractTweetId = (url: string): string | null => {
  // Support for both twitter.com and x.com URLs with better regex
  const twitterRegex = /(?:twitter\.com|x\.com)\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)/i;
  const match = url.match(twitterRegex);
  
  if (match && match[2]) {
    return match[2];
  }
  
  // If it doesn't match the standard format, attempt to be more lenient
  const numbersOnly = /(\d{10,20})/;
  const numMatch = url.match(numbersOnly);
  
  if (numMatch && numMatch[1]) {
    return numMatch[1];
  }
  
  return null;
};

// Extract username from URL
const extractUsername = (url: string): string | null => {
  const usernameRegex = /(?:twitter\.com|x\.com)\/(?:#!\/)?(\w+)/i;
  const match = url.match(usernameRegex);
  
  if (match && match[1] && match[1] !== 'status' && match[1] !== 'statuses') {
    return match[1];
  }
  
  return null;
};

// Helper function to capitalize the first letter of a string
const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

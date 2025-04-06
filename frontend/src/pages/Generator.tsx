
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import TweetForm from "@/components/TweetForm";
import TweetPreview from "@/components/TweetPreview";
import ScreenshotControls from "@/components/ScreenshotControls";
import { fetchTweetData } from "@/services/tweetService";
import { generateTweetScreenshot } from "@/services/screenshotService";
import { downloadScreenshot } from "@/utils/screenshotUtils";
import useTweetScreenshot from "@/hooks/generate";

const Generator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tweetData, setTweetData] = useState<any | null>(null);
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState("#82d2ff");
  const { toast } = useToast();
  const previewRef = useRef<HTMLDivElement>(null);
  const {generateScreenshot, loading, imageUrl, error} = useTweetScreenshot()
  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    setUploadedImageUrl(null);
    
    try {

      generateScreenshot(url)
      // Use the new screenshot service
      const result = await generateTweetScreenshot(url);
      
      if (result.success && result.tweetData) {
        setTweetData(result.tweetData);
        
        if (result.imageUrl) {
          setScreenshotUrl(result.imageUrl);
        }
        
        toast({
          title: "Tweet loaded successfully",
          description: "Your tweet has been loaded and is ready for customization.",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to fetch tweet data",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (file: File) => {
    setIsLoading(true);
    setTweetData(null);
    setScreenshotUrl(null);
    
    // Create a local URL for the uploaded image
    const imageUrl = URL.createObjectURL(file);
    setUploadedImageUrl(imageUrl);
    
    toast({
      title: "Image uploaded successfully",
      description: "Your tweet image has been loaded and is ready for customization.",
    });
    
    setIsLoading(false);
  };
  
  const handleScreenshot = async () => {
    if (!previewRef.current) return;
    
    try {
      const success = await downloadScreenshot("tweet-preview-container", "tweet-screenshot.png");
      
      if (success) {
        toast({
          title: "Success!",
          description: "Your screenshot has been downloaded",
        });
      } else {
        throw new Error("Failed to download screenshot");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate screenshot",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Generate Your Tweet Screenshot</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter a tweet URL or upload an image below to create a beautiful screenshot that you can download and share.
          </p>
        </div>
        
        <TweetForm 
          onSubmit={handleSubmit} 
          onImageUpload={handleImageUpload}
          isLoading={isLoading} 
        />
        
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div id="tweet-preview-container" ref={previewRef}>
              {uploadedImageUrl ? (
                <div className="p-8 md:p-10 rounded-xl flex items-center justify-center" style={{ backgroundColor }}>
                  <img 
                    src={uploadedImageUrl} 
                    alt="Uploaded tweet" 
                    className="max-w-full rounded-xl shadow-lg"
                  />
                </div>
              ) : (
                 
                // <TweetPreview
                //   avatar={tweetData?.avatar || ""}
                //   name={tweetData?.name || "User Name"}
                //   username={tweetData?.username || "username"}
                //   verified={tweetData?.verified || true}
                //   content={tweetData?.content || "This is a sample tweet. Enter a tweet URL to see the actual content."}
                //   date={tweetData?.date || "10:30 AM · Apr 3, 2025"}
                //   backgroundColor={backgroundColor}
                //   likes={tweetData?.likes || 42}
                //   retweets={tweetData?.retweets || 9}
                //   comments={tweetData?.comments || 3}
                //   views={tweetData?.views || 1240}
                // />

                <TweetPreview imgUrl={imageUrl} backgroundColor={backgroundColor}/>
              )}
            </div>
          </div>
          
          <div>
            <ScreenshotControls
              onBackgroundChange={setBackgroundColor}
              onScreenshot={handleScreenshot}
              canScreenshot={!!tweetData || !!uploadedImageUrl}
              elementId="tweet-preview-container"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;

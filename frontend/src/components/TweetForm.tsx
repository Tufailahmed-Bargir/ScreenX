
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, Upload } from "lucide-react";
 
import useTweetScreenshot from "@/hooks/generate";

interface TweetFormProps {
  onSubmit: (url: string) => void;
  onImageUpload: (file: File) => void;
  isLoading: boolean;
}

const TweetForm = ({ onSubmit, onImageUpload, isLoading }: TweetFormProps) => {
  const [tweetUrl, setTweetUrl] = useState("");
  const { toast } = useToast();
  const {generateScreenshot, loading, imageUrl, error} = useTweetScreenshot()

  console.log('image generated success!', imageUrl);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tweetUrl) {
      toast({
        title: "Please enter a tweet URL",
        variant: "destructive",
      });
      return;
    }

    if (tweetUrl !== "sample" && 
        !tweetUrl.startsWith("https://twitter.com/") && 
        !tweetUrl.startsWith("https://x.com/")) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid Twitter or X.com URL",
        variant: "destructive",
      });
      return;
    }

  

    
    onSubmit(tweetUrl);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast({
        title: "No file selected",
        variant: "destructive",
      });
      return;
    }

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    onImageUpload(file);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Tabs defaultValue="url" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="url">Tweet URL</TabsTrigger>
          <TabsTrigger value="upload">Upload Image</TabsTrigger>
          <TabsTrigger value="text">Sample Tweet</TabsTrigger>
        </TabsList>
        
        <TabsContent value="url">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-2">
              <Input
                placeholder="Paste Twitter/X URL here... (https://twitter.com/... or https://x.com/...)"
                value={tweetUrl}
                onChange={(e) => setTweetUrl(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="submit" 
                className="bg-brand-pink hover:bg-brand-pink/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Generate"} 
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Enter a link to any tweet to create a beautiful screenshot
            </p>
          </form>
        </TabsContent>
        
        <TabsContent value="upload">
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <label htmlFor="tweet-image" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG or GIF</p>
                </div>
                <Input 
                  id="tweet-image" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                  disabled={isLoading}
                />
              </label>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Upload an image of a tweet from your local machine
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="text">
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <Button 
                onClick={() => onSubmit("sample")}
                className="bg-brand-pink hover:bg-brand-pink/90 text-white w-full md:w-auto"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Use Sample Tweet"} 
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Don't have a tweet? Try our sample tweet to test the features
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TweetForm;

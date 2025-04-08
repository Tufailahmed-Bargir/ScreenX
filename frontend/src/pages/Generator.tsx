 
import { useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import TweetPreview from "@/components/TweetPreview";
import ScreenshotControls from "@/components/ScreenshotControls";
import { downloadScreenshot } from "@/utils/screenshotUtils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Upload } from "lucide-react";
import useTweetScreenshot from "@/hooks/generate";

const Generator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState("#82d2ff");
  const [tweetUrl, setTweetUrl] = useState("");

  const { toast } = useToast();
  const previewRef = useRef<HTMLDivElement>(null);
  const { generateScreenshot, imageUrl, error } = useTweetScreenshot();

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    setUploadedImageUrl(null);

    try {
      await generateScreenshot(url);
      // generateScreenshot sets imageUrl via the hook
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!tweetUrl) {
      toast({
        title: "Please enter a tweet URL",
        variant: "destructive",
      });
      return;
    }

    if (
      tweetUrl !== "sample" &&
      !tweetUrl.startsWith("https://twitter.com/") &&
      !tweetUrl.startsWith("https://x.com/")
    ) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid Twitter or X.com URL",
        variant: "destructive",
      });
      return;
    }

    handleSubmit(tweetUrl);
  };

  const handleInputFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast({
        title: "No file selected",
        variant: "destructive",
      });
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    handleImageUpload(file);
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-gray-800" id="generate">Generate Your Tweet Screenshot</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter a tweet URL or upload an image below to create a beautiful screenshot that you can download and share.
          </p>
        </div>

        {/* Combined TweetForm */}
        <div className="w-full max-w-3xl mx-auto mb-8">
          <Tabs defaultValue="url" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="url">Tweet URL</TabsTrigger>
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
              <TabsTrigger value="text">Sample Tweet</TabsTrigger>
            </TabsList>

            <TabsContent value="url">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-2">
                  <Input
                    placeholder="Paste Twitter/X URL here..."
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
                  <label
                    htmlFor="tweet-image"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG or GIF</p>
                    </div>
                    <Input
                      id="tweet-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleInputFileUpload}
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
                <Button
                  onClick={() => handleSubmit("sample")}
                  className="bg-brand-pink hover:bg-brand-pink/90 text-white w-full md:w-auto"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Use Sample Tweet"}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Don't have a tweet? Try our sample tweet to test the features
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview and Controls */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div id="tweet-preview-container" ref={previewRef}>
              {isLoading ? (
                <div
                  style={{
                    backgroundColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "200px",
                    borderRadius: "10px",
                    padding: "20px",
                  }}
                >
                  <div className="loader">Loading...</div>
                </div>
              ) : uploadedImageUrl || imageUrl ? (
                <TweetPreview
                  imgUrl={uploadedImageUrl || imageUrl}
                  backgroundColor={backgroundColor}
                />
              ) : null}
            </div>
          </div>

          <div>
            <ScreenshotControls
              onBackgroundChange={setBackgroundColor}
              onScreenshot={handleScreenshot}
              canScreenshot={!!uploadedImageUrl || !!imageUrl}
              elementId="tweet-preview-container"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;
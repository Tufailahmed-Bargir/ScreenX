
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Download, Share, Camera } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { copyScreenshotToClipboard } from "@/utils/screenshotUtils";

interface ScreenshotControlsProps {
  onBackgroundChange: (color: string) => void;
  onScreenshot: () => void;
  canScreenshot: boolean;
  elementId: string;
}

const ScreenshotControls = ({
  onBackgroundChange,
  onScreenshot,
  canScreenshot,
  elementId
}: ScreenshotControlsProps) => {
  const [paddingSize, setPaddingSize] = useState(10);
  const { toast } = useToast();
  
  const backgroundOptions = [
    { value: "#82d2ff", label: "Blue" },
    { value: "#f24fbc", label: "Pink" },
    { value: "#8b5cf6", label: "Purple" },
    { value: "#f3f4f6", label: "Light Gray" },
  ];

  const handleCopyToClipboard = async () => {
    if (!canScreenshot) return;
    
    try {
      const success = await copyScreenshotToClipboard(elementId);
      
      if (success) {
        toast({
          title: "Screenshot copied",
          description: "The screenshot has been copied to your clipboard."
        });
      } else {
        throw new Error("Failed to copy screenshot to clipboard");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy screenshot to clipboard",
        variant: "destructive",
      });
    }
  };

  // Update padding when the slider changes
  const handlePaddingChange = (value: number[]) => {
    setPaddingSize(value[0]);
    const element = document.getElementById(elementId);
    if (element) {
      element.style.padding = `${value[0]}px`;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Background Color</Label>
            <RadioGroup 
              defaultValue="#82d2ff" 
              className="flex flex-wrap gap-2"
              onValueChange={onBackgroundChange}
            >
              {backgroundOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={option.value} 
                    id={option.value}
                    className="peer sr-only" 
                  />
                  <Label
                    htmlFor={option.value}
                    className="flex items-center justify-center p-2 border rounded-md cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:border-2"
                  >
                    <div 
                      className="w-8 h-8 rounded-full mr-2" 
                      style={{ backgroundColor: option.value }}
                    />
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Padding Size</Label>
              <span className="text-sm text-muted-foreground">{paddingSize}px</span>
            </div>
            <Slider
              value={[paddingSize]}
              min={0}
              max={50}
              step={1}
              onValueChange={handlePaddingChange}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="w-full" onClick={onScreenshot} disabled={!canScreenshot}>
              <Camera className="mr-2 h-4 w-4" />
              Capture
            </Button>
            <Button variant="outline" className="w-full" onClick={handleCopyToClipboard} disabled={!canScreenshot}>
              <Share className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button className="w-full bg-brand-pink hover:bg-brand-pink/90" onClick={onScreenshot} disabled={!canScreenshot}>
              <Download className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScreenshotControls;

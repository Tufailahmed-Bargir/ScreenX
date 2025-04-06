
import html2canvas from "html2canvas";

export const captureScreenshot = async (elementId: string, fileName: string = "tweet-screenshot.png") => {
  try {
    const element = document.getElementById(elementId);
    
    if (!element) {
      throw new Error(`Element with ID ${elementId} not found`);
    }
    
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });
    
    // Convert to blob
    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Failed to create blob from canvas"));
        }
      }, "image/png");
    });
  } catch (error) {
    console.error("Error capturing screenshot:", error);
    throw error;
  }
};

export const downloadScreenshot = async (elementId: string, fileName: string = "tweet-screenshot.png") => {
  try {
    const blob = await captureScreenshot(elementId);
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error("Error downloading screenshot:", error);
    return false;
  }
};

export const copyScreenshotToClipboard = async (elementId: string) => {
  try {
    const blob = await captureScreenshot(elementId);
    
    // Copy to clipboard using Clipboard API
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob
      })
    ]);
    
    return true;
  } catch (error) {
    console.error("Error copying screenshot to clipboard:", error);
    
    // Try fallback method for browsers with limited clipboard support
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      const element = document.getElementById(elementId);
      if (!element) throw new Error(`Element with ID ${elementId} not found`);
      
      await html2canvas(element, { scale: 2 }).then(canvas => {
        const dataUrl = canvas.toDataURL('image/png');
        
        // Try to use the newer clipboard API
        navigator.clipboard.writeText(dataUrl);
      });
      
      return true;
    } catch (fallbackError) {
      console.error("Fallback clipboard method also failed:", fallbackError);
      return false;
    }
  }
};

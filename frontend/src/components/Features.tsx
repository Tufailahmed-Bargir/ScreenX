
import { Card, CardContent } from "@/components/ui/card";
import { Check, Download, Image, Camera } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Image className="h-6 w-6 text-brand-pink" />,
      title: "Beautiful Designs",
      description: "Create stunning tweet screenshots with customizable backgrounds and styles.",
    },
    {
      icon: <Check className="h-6 w-6 text-brand-pink" />,
      title: "Simple to Use",
      description: "Just paste a tweet URL and get your screenshot in seconds.",
    },
    {
      icon: <Download className="h-6 w-6 text-brand-pink" />,
      title: "Easy Export",
      description: "Download your screenshots in high-resolution formats.",
    },
    {
      icon: <Camera className="h-6 w-6 text-brand-pink" />,
      title: "Professional Look",
      description: "Make your social media content stand out with pixel-perfect designs.",
    },
  ];

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="feature-card border-none">
              <CardContent className="p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

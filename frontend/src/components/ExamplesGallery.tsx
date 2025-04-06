
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ExamplesGallery = () => {
  const categories = ["All", "Professional", "Colorful", "Minimal"];
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Mock data for examples
  const examples = [
    { id: 1, category: "Professional", bgColor: "#82d2ff", imageUrl: "/placeholder.svg" },
    { id: 2, category: "Colorful", bgColor: "#f24fbc", imageUrl: "/placeholder.svg" },
    { id: 3, category: "Minimal", bgColor: "#f3f4f6", imageUrl: "/placeholder.svg" },
    { id: 4, category: "Professional", bgColor: "#8b5cf6", imageUrl: "/placeholder.svg" },
    { id: 5, category: "Colorful", bgColor: "#fde68a", imageUrl: "/placeholder.svg" },
    { id: 6, category: "Minimal", bgColor: "#e0e7ff", imageUrl: "/placeholder.svg" },
  ];
  
  const filteredExamples = activeCategory === "All" 
    ? examples 
    : examples.filter(example => example.category === activeCategory);

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Example Screenshots</h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Take inspiration from these beautifully designed tweet screenshots
        </p>
        
        <Tabs defaultValue="All" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-4">
            {categories.map(category => (
              <TabsTrigger 
                key={category} 
                value={category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map(category => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredExamples.map(example => (
                  <Card 
                    key={example.id} 
                    className="overflow-hidden feature-card border-none cursor-pointer"
                  >
                    <div 
                      className="h-48 w-full flex items-center justify-center" 
                      style={{ backgroundColor: example.bgColor }}
                    >
                      <img 
                        src={example.imageUrl} 
                        alt={`Example ${example.id}`} 
                        className="h-32 w-32 object-contain"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ExamplesGallery;

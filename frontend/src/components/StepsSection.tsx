
import { Card, CardContent } from "@/components/ui/card";

const StepsSection = () => {
  const steps = [
    {
      number: "01",
      title: "Paste Tweet URL",
      description: "Copy the URL of any tweet you want to capture.",
    },
    {
      number: "02",
      title: "Customize Design",
      description: "Choose colors, styles, and adjust the layout to match your brand.",
    },
    {
      number: "03",
      title: "Download Image",
      description: "Save your screenshot in high resolution for immediate use.",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          How it works
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Transform your tweets into beautiful images in just three simple steps
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="text-5xl font-bold text-brand-pink opacity-50 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;

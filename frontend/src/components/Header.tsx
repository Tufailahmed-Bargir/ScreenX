
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between border-b">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-pink to-brand-purple">
          Tweet Screenshot Generator
        </h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          GitHub
        </a>
        <Button size="sm" className="bg-brand-pink hover:bg-brand-pink/90">
          Sign Up Free
        </Button>
      </div>
    </header>
  );
};

export default Header;

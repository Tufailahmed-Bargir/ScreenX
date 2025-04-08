
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between border-b">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-pink to-brand-purple">
           sreenX
        </h1>
      </div>
      
      <div className="flex items-center space-x-4">
       
        <Link to={'https://github.com/Tufailahmed-Bargir/ScreenX'} target="_blank">
        
        <Button size="sm" className="bg-brand-pink hover:bg-brand-pink/90">
        GitHub
        </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;

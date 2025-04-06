
// import { Card } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Check, Heart, Repeat, MessageCircle, BarChart2, Share } from "lucide-react";

// interface TweetPreviewProps {
//   avatar?: string;
//   name?: string;
//   username?: string;
//   verified?: boolean;
//   content?: string;
//   date?: string;
//   backgroundColor: string;
//   likes?: number;
//   retweets?: number;
//   comments?: number;
//   views?: number;
// }

// const TweetPreview = ({
//   avatar = "",
//   name = "User Name",
//   username = "username",
//   verified = true,
//   content = "This is a sample tweet. Replace with your content to see how it looks!",
//   date = "10:30 AM · Apr 3, 2025",
//   backgroundColor = "#82d2ff",
//   likes = 42,
//   retweets = 9,
//   comments = 3,
//   views = 1240
// }: TweetPreviewProps) => {
//   return (
//     <div className="p-8 md:p-10 rounded-xl flex items-center justify-center" style={{ backgroundColor }}>
//       <Card className="w-full max-w-lg p-4 bg-white shadow-lg rounded-xl tweet-preview">
//         <div className="flex items-start space-x-3">
//           <Avatar className="h-12 w-12 border">
//             {avatar ? (
//               <AvatarImage src={avatar} alt={name} />
//             ) : (
//               <AvatarFallback className="bg-gray-200 text-gray-600">{name.charAt(0)}</AvatarFallback>
//             )}
//           </Avatar>
          
//           <div className="flex-1 min-w-0">
//             <div className="flex items-center gap-1">
//               <span className="font-bold text-gray-900 truncate">{name}</span>
//               {verified && (
//                 <Badge variant="outline" className="h-5 w-5 p-0 flex items-center justify-center bg-blue-500 border-blue-500">
//                   <Check className="h-3 w-3 text-white" />
//                 </Badge>
//               )}
//             </div>
//             <div className="text-gray-500 text-sm">@{username}</div>
//           </div>
//         </div>
        
//         <div className="mt-3 text-gray-900 text-base leading-relaxed">{content}</div>
        
//         <div className="mt-4 text-gray-500 text-sm">{date}</div>

//         <div className="mt-4 pt-3 border-t border-gray-100">
//           <div className="flex justify-between text-gray-500">
//             <div className="flex items-center space-x-1">
//               <button className="p-2 rounded-full hover:bg-blue-50 hover:text-blue-500 transition-colors">
//                 <MessageCircle className="h-4 w-4" />
//               </button>
//               <span className="text-xs">{comments}</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <button className="p-2 rounded-full hover:bg-green-50 hover:text-green-500 transition-colors">
//                 <Repeat className="h-4 w-4" />
//               </button>
//               <span className="text-xs">{retweets}</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <button className="p-2 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors">
//                 <Heart className="h-4 w-4" />
//               </button>
//               <span className="text-xs">{likes}</span>
//             </div>
//             <div className="flex items-center space-x-1">
//               <button className="p-2 rounded-full hover:bg-blue-50 hover:text-blue-500 transition-colors">
//                 <BarChart2 className="h-4 w-4" />
//               </button>
//               <span className="text-xs">{views}</span>
//             </div>
//             <div>
//               <button className="p-2 rounded-full hover:bg-blue-50 hover:text-blue-500 transition-colors">
//                 <Share className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default TweetPreview;


 
interface TweetPreviewProps {
  imgUrl: string;
   
  backgroundColor: string;
}

const TweetPreview = ({
   imgUrl,
  backgroundColor = "#82d2ff",
}: TweetPreviewProps) => {
  return (
    <div className="p-8 md:p-10 rounded-xl flex items-center justify-center" style={{ backgroundColor }}>
      <img className="rounded-lg" src={imgUrl} alt="" />
      
    </div>
  );
};

export default TweetPreview;

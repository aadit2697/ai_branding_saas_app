import CopyKitt from "@/components/copykitt";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
 
    <CopyKitt/>
     
    </div>
  );
}


// https://7h2itud59f.execute-api.us-east-2.amazonaws.com/prod/generate_snippet?prompt=coffee
"use client"; 

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Default_button() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/register"); 
  };

  return (
    <div className="flex justify-center">
      <Button
        className="hover:bg-white hover:text-black w-1/3 sm:w-1/6 lg:w-1/4"
        onClick={handleRedirect}
      >
        Click me
      </Button>
    </div>
  );
}

import { Button } from "@/ui/button";
import { CoffeeIcon } from "lucide-react";

export const BuyMeACoffee = () => {
  return (
    <div className="relative opacity-0 duration-1000 [@media(min-width:1600px)]:opacity-100">
      <div className="fixed bottom-80 right-32 z-50 w-80 duration-1000 animate-in fade-in-0">
        {/* Bubble container with gradient and shadow */}
        <div className="group relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-60"></div>

          {/* Main bubble with gradient */}
          <div className="relative rounded-3xl border border-white/60 bg-gradient-to-br from-white to-blue-50 px-6 py-5 shadow-2xl dark:border-slate-600/60 dark:from-slate-800 dark:to-slate-700">
            {/* Shine effect */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white via-transparent to-transparent opacity-40"></div>

            {/* Text content */}
            <div className="relative text-balance text-sm font-medium leading-relaxed text-gray-800 dark:text-gray-100">
              <p>
                Hey, I’m Karol 👋. I built this app to make citing websites easy
                peasy. If it saved you time, consider supporting me with a
                coffee ☕
              </p>
              <a
                href="https://buymeacoffee.com/dzialowski"
                target="_blank"
                rel="noopener"
              >
                <Button
                  variant={"minor"}
                  size="minor"
                  className="mt-2 gap-2 bg-gradient-to-b from-[#f1f7ff] to-white"
                >
                  <CoffeeIcon className="h-4 w-4" />
                  Buy me a coffee
                </Button>
              </a>
            </div>

            {/* Tail/pointer */}
            <div className="absolute -bottom-3 left-8 h-6 w-6">
              <div className="absolute inset-0 rounded-full border border-white/60 bg-gradient-to-br from-white to-blue-50 shadow-lg dark:border-slate-600/60 dark:from-slate-800 dark:to-slate-700"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white via-transparent to-transparent opacity-40"></div>
            </div>
          </div>
        </div>
      </div>

      <video
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        data-ol-autoplay-video=""
        poster="/mascot-waving.png"
        className="fixed bottom-0 right-32 z-10 w-[300px] duration-1000 animate-in fade-in-0"
      >
        <source src="/mascot-waving.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

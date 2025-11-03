import { HeartFilledIcon } from "@radix-ui/react-icons";

export const AnnouncementBar = () => (
        <div className="flex w-full items-center bg-[#130f4f] px-12 py-1 text-white">
          <div className="flex grow items-center justify-center gap-2 text-[13px]">
            <HeartFilledIcon className="h-3 w-3 animate-bounce text-[#f3efc6]" />
            <a
              href="https://buymeacoffee.com/dzialowski"
              target="_blank"
              rel="noopener"
            >
              <div className="font-bold text-white/95 underline hover:decoration-dotted">
                Support this project
              </div>
            </a>
            <div className="text-white/75">
              Help me keep this website alive.
            </div>
          </div>
        </div>
)
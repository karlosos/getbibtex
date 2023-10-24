import { Button } from "@/ui/button";
import { useCopyToClipboard } from "@/utils/copy-to-clipboard";
import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";

export const CopyToClipboardButton = ({ value }: { value: string }) => {
  const [_, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);
  const timerId = useRef<NodeJS.Timeout | null>();

  const handleCopy = async () => {
    await copy(value);
    setIsCopied(true);
    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    timerId.current = setTimeout(() => {
      setIsCopied(false);
      timerId.current = null;
    }, 500);
  };

  return (
    <Button
      className="duration-250 gap-2"
      disabled={isCopied}
      onClick={handleCopy}
    >
      {isCopied ? (
        <>
          <Check className="w-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-4" />
          Copy to clipboard
        </>
      )}
    </Button>
  );
};

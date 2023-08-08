import { Input } from "@/ui/input";
import { cn } from "@/utils/cn";

type AdditionalProps = { disabled?: boolean };

export function Search({
  className,
  disabled = false,
}: React.HTMLAttributes<HTMLDivElement> & AdditionalProps) {
  return (
    <div className={cn(className)}>
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
        disabled={disabled}
      />
    </div>
  );
}

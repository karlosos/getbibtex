import { cn } from "@/utils/cn";
import Link from "next/link";

type PostPreviewProps = {
  title: string;
  description: string;
  url: string;
  imgSrc: string;
  className?: string;
};

export const PostPreview = (props: PostPreviewProps) => {
  return (
    <div className={cn("group flex flex-col", props.className)}>
      <Link href={props.url}>
        <div className="h-[250px] w-[280px] overflow-hidden rounded-lg bg-black transition-all duration-300 group-hover:h-[240px] ">
          <img
            src={props.imgSrc}
            alt={props.title}
            className="h-[250px] transition-all duration-300 group-hover:scale-105"
          />
        </div>
        <div className="max-w-[280px] px-1 py-2">
          <h3 className="text-xl font-medium text-slate-800">{props.title}</h3>
          <div className="text-sm  text-slate-400">{props.description}</div>
        </div>
      </Link>
    </div>
  );
};

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
    <div
      className={cn(
        "group flex flex-row items-center sm:flex-col sm:items-stretch",
        props.className,
      )}
    >
      <Link
        href={props.url}
        className="flex flex-row items-center sm:flex-col sm:items-stretch"
      >
        <div className="w-[120px] overflow-hidden rounded-lg bg-black transition-all duration-300 group-hover:brightness-90 sm:h-[250px] sm:w-[280px]">
          <img
            src={props.imgSrc}
            alt={props.title}
            className="h-auto w-full object-cover transition-all duration-300 group-hover:scale-105 sm:h-full"
          />
        </div>
        <div className="flex max-w-[280px] flex-col justify-center px-2 py-2 sm:mt-4 sm:px-1">
          <h3 className="text-base font-medium text-slate-800 sm:text-xl">
            {props.title}
          </h3>
          <div className="text-sm text-slate-400">{props.description}</div>
        </div>
      </Link>
    </div>
  );
};

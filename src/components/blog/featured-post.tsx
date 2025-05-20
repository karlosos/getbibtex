import { BlogPostCategory } from "@/components/blog/blog-post-categories";
import { Button } from "@/ui/button";
import Link from "next/link";

type FeaturedPostProps = {
  title: string;
  description: string;
  date: string;
  url: string;
  imgSrc: string;
  category: BlogPostCategory;
};

export const FeaturedPost = ({
  title,
  description,
  date,
  url,
  imgSrc,
  category,
}: FeaturedPostProps) => (
  <div className="big-shadow flex flex-col rounded-xl border bg-white p-4 md:flex-row">
    <div className="h-[250px] w-full overflow-hidden rounded-lg bg-black md:w-[280px]">
      <img src={imgSrc} alt={title} className="h-full w-full object-cover" />
    </div>
    <div className="mt-4 flex max-w-full flex-col px-0 md:mt-8 md:max-w-[400px] md:px-8">
      <div className="flex gap-1">
        <div className="rounded-full bg-[#f4e2ff] px-2 text-sm font-medium text-[#301d3b]">
          {category.label}
        </div>
        <div className="text-sm text-neutral-600">•</div>
        <div className="text-sm text-neutral-600">{date}</div>
      </div>
      <h2 className="mt-2 text-2xl font-medium">{title}</h2>
      <p className="mt-2 text-neutral-500">{description}</p>
      <div className="mt-2">
        <Link href={url}>
          <Button variant={"minor"} size={"minor"}>
            Read Article
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

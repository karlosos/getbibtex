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
  <div className="big-shadow flex rounded-xl border bg-white p-4">
    <div className="h-[250px] w-[280px] overflow-hidden rounded-lg bg-black ">
      <img src={imgSrc} className="h-[250px]" alt={title} />
    </div>
    <div className="mt-8 flex max-w-[400px] flex-col px-8">
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

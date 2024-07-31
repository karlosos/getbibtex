import { Button } from "@/ui/button";
import Link from "next/link";

export const RecentPosts = () => {
  return (
    <div className="">
      <div className="flex items-end justify-between">
        <Title />
        <Link href={"/blog"}>
          <Button className="h-8 rounded-lg bg-white px-3 text-sm font-medium text-[#36364a] shadow-[0_2px_6px_rgba(18,43,105,.04),_0_1px_2px_rgba(18,43,105,.08),_0_0_0_1px_rgba(18,43,105,.08);] transition-shadow hover:bg-white hover:shadow-[0_2px_6px_rgba(18,43,105,.12),_0_1px_2px_rgba(18,43,105,.12),_0_0_0_1px_rgba(18,43,105,.08);]">
            Browse all
          </Button>
        </Link>
      </div>
      <div className="mt-8 flex min-h-[450px] justify-between">
        <PostPreview
          title="Introducing the Webflow Boosters App"
          description="Advanced code solution added directly inside of Webflow at the click of a button"
        />
        <PostPreview
          title="Top 20 UI Inspiration Sites (2023)"
          description="We've collated the top 20 UI inspiration sites, all with links in one handy spot! Find your inspiration for your next project."
        />
        <PostPreview
          title="How to add a countdown timer to Framer"
          description="Learn how to add a beautiful countdown to your Framer project. Add it to your project in seconds."
        />
      </div>
    </div>
  );
};

const Title = () => {
  return (
    <div>
      <h2 className="text-2xl font-medium text-slate-800">
        getbibtex.com blog
      </h2>
      <div className="text-base  text-slate-600">
        Discover articles and tutorials to help you with LaTeX
      </div>
    </div>
  );
};

type PostPreviewProps = {
  title: string;
  description: string;
};

const PostPreview = (props: PostPreviewProps) => {
  return (
    <div className="group flex flex-col">
      <div className="h-[250px] w-[280px] overflow-hidden rounded-lg bg-black transition-all duration-300 group-hover:h-[240px] ">
        <img
          src="https://cdn.prod.website-files.com/5beab1239ac8840644a660b4/65b851484b52a37a2720e29f_Cover%20Image-p-800.png"
          className="h-[250px] transition-all duration-300 group-hover:scale-105"
        />
      </div>
      <div className="max-w-[280px] px-1 py-2">
        <h3 className="text-xl font-medium text-slate-800">{props.title}</h3>
        <div className="text-sm  text-slate-400">{props.description}</div>
      </div>
    </div>
  );
};

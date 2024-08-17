import { PostPreview } from "@/components/blog/recent-posts";
import { Navigation } from "@/components/main/navigation";
import { Button } from "@/ui/button";
import { Layout } from "@/ui/layout";
import { cn } from "@/utils/cn";
import Link from "next/link";
import React from "react";

export default function Blog() {
  return (
    <Layout>
      <main className="flex flex-col items-center">
        {/* TODO: looks weird without margins on small monitor (and with big margin-top) */}
        <div className="mt-2 flex w-full max-w-7xl flex-col items-center rounded-xl rounded-b-none bg-gradient-to-b from-[#f2f1ff] to-[#e7ebff] p-2 px-8 py-4 text-[#11124d] lg:mt-8">
          <Navigation />
          <div className="mt-12">
            <div className="rounded-full border border-[#e3e3fe] bg-[#efeaff] px-4 py-1 text-sm font-medium">
              Blog & Resources
            </div>
          </div>
          <h1 className="text-medium mt-4 max-w-3xl text-center text-[64px] leading-none">
            Discover articles and tutorials to enhance your LaTeX skills.
          </h1>
        </div>
        <div className="flex h-96 w-full max-w-7xl flex-col items-center rounded-xl rounded-t-none bg-gradient-to-b from-[#e7ebff] to-white p-2 px-8 py-4 text-[#11124d]">
          <div className="mt-3">
            <FeaturedPost />
          </div>
        </div>
        <BlogSectionIntro />
        <CategorySwitcher />
        <PostsList />
      </main>
    </Layout>
  );
}

const FeaturedPost = () => (
  <div className="big-shadow flex rounded-xl border bg-white p-4">
    <div className="h-[250px] w-[280px] overflow-hidden rounded-lg bg-black ">
      <img
        src="https://cdn.prod.website-files.com/5beab1239ac8840644a660b4/65b851484b52a37a2720e29f_Cover%20Image-p-800.png"
        className="h-[250px]"
      />
    </div>
    <div className="mt-8 flex max-w-[400px] flex-col px-8">
      <div className="flex gap-1">
        <div className="rounded-full bg-[#f4e2ff] px-2 text-sm font-medium text-[#301d3b]">
          Resources
        </div>
        <div className="text-sm text-neutral-600">•</div>
        <div className="text-sm text-neutral-600">January 29, 2024</div>
      </div>
      <h2 className="mt-2 text-2xl font-medium">
        Introducing the Webflow Boosters App
      </h2>
      <p className="mt-2 text-neutral-500">
        Advanced code solution added directly inside of Webflow at the click of
        a button
      </p>
      <div className="mt-2">
        <Link href={"/blog"}>
          <Button variant={"minor"} size={"minor"}>
            Read Article
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

const BlogSectionIntro = () => {
  return (
    <div className="mb-10 mt-10 text-center">
      <div className="inline-block rounded-full border border-[#e3e3fe] bg-[#f9f9ff] px-3 py-1 text-sm font-medium text-[#11023b]">
        Browse all our articles
      </div>
      <h2 className="text-medium mt-4 max-w-lg text-center text-[56px] leading-none text-[#230d5b]">
        Latest Guides & News Articles
      </h2>
      <div className="mt-4 text-[#262556]">
        Stay informed with the latest guides and news.
      </div>
    </div>
  );
};

const CategorySwitcher = () => {
  return (
    <div
      className="mb-10 flex w-full max-w-4xl gap-3 border-b border-[#122a6914] py-3"
      role="tablist"
    >
      <CategoryPill isActive onClick={() => undefined}>
        All Topics
      </CategoryPill>
      <CategoryPill onClick={() => undefined}>Articles</CategoryPill>
      <CategoryPill onClick={() => undefined}>Resources</CategoryPill>
      <CategoryPill onClick={() => undefined}>Tutorials</CategoryPill>
    </div>
  );
};

const CategoryPill = ({
  children,
  isActive,
  onClick,
}: {
  children: React.ReactNode;
  isActive?: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={cn(
        "rounded-full border border-white px-3 py-1 text-sm font-medium text-[#11023b] hover:cursor-pointer",
        isActive ? "border-[#caceff57] bg-[#f4f5ff]" : "",
      )}
      role="tab"
      aria-selected={isActive ? "true" : "false"}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const PostsList = () => {
  return (
    <div className="min-h-[450px] justify-between max-w-4xl flex w-full flex-wrap">
      <PostPreview
        title="Introducing the Webflow Boosters App"
        description="Advanced code solution added directly inside of Webflow at the click of a button"
        className="min-h-[450px]"
      />
      <PostPreview
        title="Top 20 UI Inspiration Sites (2023)"
        description="We've collated the top 20 UI inspiration sites, all with links in one handy spot! Find your inspiration for your next project."
        className="min-h-[450px]"
      />
      <PostPreview
        title="How to add a countdown timer to Framer"
        description="Learn how to add a beautiful countdown to your Framer project. Add it to your project in seconds."
        className="min-h-[450px]"
      />
      <PostPreview
        title="How to add a countdown timer to Framer"
        description="Learn how to add a beautiful countdown to your Framer project. Add it to your project in seconds."
        className="min-h-[450px]"
      />
      <PostPreview
        title="Top 20 UI Inspiration Sites (2023)"
        description="We've collated the top 20 UI inspiration sites, all with links in one handy spot! Find your inspiration for your next project."
        className="min-h-[450px]"
      />
      <PostPreview
        title="Introducing the Webflow Boosters App"
        description="Advanced code solution added directly inside of Webflow at the click of a button"
        className="min-h-[450px]"
      />
    </div>
  );
};

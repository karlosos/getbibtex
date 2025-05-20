import { PostPreview } from "@/components/blog/post-preview";
import { recentPosts } from "@/content/blog-posts";
import { Button } from "@/ui/button";
import Link from "next/link";

export const RecentPosts = () => {
  return (
    <div>
      <RecentPostsHeader />
      <div className="mt-8 grid w-full max-w-4xl grid-cols-1 justify-items-center sm:min-h-[450px] sm:grid-cols-2 lg:grid-cols-3">
        {recentPosts.map((post) => (
          <PostPreview
            key={post.title}
            title={post.title}
            description={post.description}
            url={post.url}
            imgSrc={post.imgSrc}
          />
        ))}
      </div>
    </div>
  );
};

const RecentPostsHeader = () => {
  return (
    <div className="flex items-end justify-between">
      <Title />
      <Link href={"/blog"}>
        <Button variant={"minor"} size={"minor"}>
          Browse all
        </Button>
      </Link>
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

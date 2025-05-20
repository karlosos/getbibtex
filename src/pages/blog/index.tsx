import {
  CategorySwitcher,
  useCurrentBlogCategory,
} from "@/components/blog/category-switcher";
import { FeaturedPost } from "@/components/blog/featured-post";
import { PostPreview } from "@/components/blog/post-preview";
import { Navigation } from "@/components/main/navigation";
import {
  BlogPostMeta,
  featuredPost,
  getBlogPostsForCategory,
} from "@/content/blog-posts";
import { Layout } from "@/ui/layout";
import React from "react";

export default function Blog() {
  const category = useCurrentBlogCategory();
  const blogPostsList = getBlogPostsForCategory(category);

  return (
    <Layout>
      <main className="flex flex-col items-center">
        <div className="mt-2 flex w-full max-w-4xl flex-col items-center rounded-xl rounded-b-none bg-gradient-to-b from-[#f2f1ff] to-[#e7ebff] p-2 px-8 py-4 text-[#11124d] lg:mt-8">
          <Navigation />
          <div className="mt-12">
            <div className="rounded-full border border-[#e3e3fe] bg-[#efeaff] px-4 py-1 text-sm font-medium">
              Blog & Resources
            </div>
          </div>
          <h1 className="text-medium mt-4 max-w-3xl text-center text-[32px] leading-none sm:text-[64px]">
            Discover articles and tutorials to enhance your LaTeX skills.
          </h1>
        </div>
        <div className="flex w-full max-w-4xl flex-col items-center rounded-xl rounded-t-none bg-gradient-to-b from-[#e7ebff] to-white p-2 px-8 py-4 text-[#11124d]">
          <div className="mt-3">
            <FeaturedPost
              title={featuredPost.title}
              description={featuredPost.description}
              date={featuredPost.date}
              url={featuredPost.url}
              imgSrc={featuredPost.imgSrc}
              category={featuredPost.category}
            />
          </div>
        </div>
        <BlogSectionIntro />
        <CategorySwitcher />
        <PostsList postsList={blogPostsList} />
      </main>
    </Layout>
  );
}

const BlogSectionIntro = () => {
  return (
    <div className="mb-10 mt-10 text-center">
      <div className="inline-block rounded-full border border-[#e3e3fe] bg-[#f9f9ff] px-3 py-1 text-sm font-medium text-[#11023b]">
        Browse all our articles
      </div>
      <h2 className="text-medium mt-4 max-w-lg text-center text-[28px] leading-none text-[#230d5b] sm:text-[56px]">
        Latest Guides & News Articles
      </h2>
      <div className="mt-4 text-[#262556]">
        Stay informed with the latest guides and news.
      </div>
    </div>
  );
};

type PostsListProps = {
  postsList: BlogPostMeta[];
};

const PostsList = ({ postsList }: PostsListProps) => {
  return (
    <div className="grid w-full max-w-4xl grid-cols-1 justify-items-center sm:min-h-[450px] sm:grid-cols-2 lg:grid-cols-3">
      {postsList.map((post) => (
        <PostPreview
          key={post.title}
          title={post.title}
          description={post.description}
          url={post.url}
          imgSrc={post.imgSrc}
          className="min-h-auto sm:min-h-[450px]"
        />
      ))}
    </div>
  );
};

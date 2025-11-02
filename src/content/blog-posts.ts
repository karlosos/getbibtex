import {
  BlogPostCategory,
} from "@/components/blog/blog-post-categories";
import { howToCiteWebsiteInLatexUsingBibtex } from "@/pages/blog/posts/how-to-cite-website-in-latex-using-bibtex";
import { howToGenerateBibtexFromUrl } from "@/pages/blog/posts/how-to-generate-bibtex-from-url";
import { topLatexTools } from "@/pages/blog/posts/top-latex-tools";

export type BlogPostMeta = {
  title: string;
  description: string;
  date: string;
  url: string;
  imgSrc: string;
  readingTime: number;
  category: BlogPostCategory;
};

/**
 * This list should be updated with metadata to all posts that
 * are defined in `pages/blog/posts/` directory.
 */
export const blogPosts: BlogPostMeta[] = [
  howToCiteWebsiteInLatexUsingBibtex,
  howToGenerateBibtexFromUrl,
  topLatexTools,
];

export const getBlogPostsForCategory = (
  category: BlogPostCategory | undefined,
) => {
  if (category === undefined) {
    return blogPosts;
  }

  return blogPosts.filter((post) => post.category.id === category.id);
};

/**
 * This post will be featured on the blog page
 */
export const featuredPost = blogPosts[1]!;

/**
 * These posts will be shown on the main page
 */
const recentPostsCount = 3;
export const recentPosts = blogPosts.slice(-recentPostsCount);

import {
  BlogPostCategory,
  BlogPostCategories,
} from "@/components/blog/blog-post-categories";

export type BlogPostMeta = {
  title: string;
  description: string;
  date: string;
  url: string;
  imgSrc: string;
  category: BlogPostCategory;
};

/**
 * This list should be updated with metadata to all posts that
 * are defined in `pages/blog/posts/` directory.
 */
export const blogPosts: BlogPostMeta[] = [
  {
    title: "Introducing the Webflow Boosters App",
    description:
      "Advanced code solution added directly inside of Webflow at the click of a button",
    date: "January 29, 2024",
    url: "/blog/posts/example",
    imgSrc:
      "https://cdn.prod.website-files.com/5beab1239ac8840644a660b4/65b851484b52a37a2720e29f_Cover%20Image-p-800.png",
    category: BlogPostCategories.resources,
  },
  {
    title: "Top 20 UI Inspiration Sites (2023)",
    description:
      "We've collated the top 20 UI inspiration sites, all with links in one handy spot! Find your inspiration for your next project.",
    date: "January 29, 2024",
    url: "/blog/posts/example",
    imgSrc:
      "https://cdn.prod.website-files.com/5beab1239ac8840644a660b4/65b851484b52a37a2720e29f_Cover%20Image-p-800.png",
    category: BlogPostCategories.tutorials,
  },
  {
    title: "How to add a countdown timer to Framer",
    description:
      "Learn how to add a beautiful countdown to your Framer project. Add it to your project in seconds.",
    date: "January 29, 2024",
    url: "/blog/posts/example",
    imgSrc:
      "https://cdn.prod.website-files.com/5beab1239ac8840644a660b4/65b851484b52a37a2720e29f_Cover%20Image-p-800.png",
    category: BlogPostCategories.articles,
  },
  {
    title: "Best ways to display multi images",
    description:
      "Learn how to add a beautiful countdown to your Framer project. Add it to your project in seconds.",
    date: "January 29, 2024",
    url: "/blog/posts/example",
    imgSrc:
      "https://cdn.prod.website-files.com/5beab1239ac8840644a660b4/65b851484b52a37a2720e29f_Cover%20Image-p-800.png",
    category: BlogPostCategories.resources,
  },
  {
    title: "Citations 101",
    description:
      "Advanced code solution added directly inside of Webflow at the click of a button",
    date: "January 29, 2024",
    url: "/blog/posts/example",
    imgSrc:
      "https://cdn.prod.website-files.com/5beab1239ac8840644a660b4/65b851484b52a37a2720e29f_Cover%20Image-p-800.png",
    category: BlogPostCategories.articles,
  },
  {
    title: "How to cite website in LaTeX",
    description:
      "We've collated the top 20 UI inspiration sites, all with links in one handy spot! Find your inspiration for your next project.",
    date: "January 29, 2024",
    url: "/blog/posts/example",
    imgSrc:
      "https://cdn.prod.website-files.com/5beab1239ac8840644a660b4/65b851484b52a37a2720e29f_Cover%20Image-p-800.png",
    category: BlogPostCategories.tutorials,
  },
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

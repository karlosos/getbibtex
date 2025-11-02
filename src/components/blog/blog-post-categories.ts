export type BlogPostCategory = {
  id: string;
  label: string;
};

type ids = "resources" | "tutorials" | "articles";

export const BlogPostCategories: Record<ids, BlogPostCategory> = {
  resources: {
    id: "resources",
    label: "Resources",
  },
  tutorials: {
    id: "tutorials",
    label: "Tutorials",
  },
  articles: {
    id: "articles",
    label: "Articles",
  },
};

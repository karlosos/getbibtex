import { BlogPostCategories } from "@/components/blog/blog-post-categories";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useRouter } from "next/router";

export const useCurrentBlogCategory = () => {
  const router = useRouter();
  const { category } = router.query;

  if (!category) {
    return undefined;
  }

  if (Array.isArray(category)) {
    return undefined;
  }

  if (category in BlogPostCategories) {
    return BlogPostCategories[category as keyof typeof BlogPostCategories];
  }
};

export const CategorySwitcher = () => {
  const currentCategory = useCurrentBlogCategory();

  return (
    <div
      className="mb-10 flex w-full max-w-4xl gap-3 border-b border-[#122a6914] py-3"
      role="tablist"
    >
      <Link href="/blog" scroll={false}>
        <CategoryPill isActive={currentCategory === undefined}>
          All Topics
        </CategoryPill>
      </Link>
      {Object.values(BlogPostCategories).map((category) => (
        <Link
          href={`/blog?category=${category.id}`}
          scroll={false}
          key={category.id}
        >
          <CategoryPill isActive={currentCategory === category}>
            {category.label}
          </CategoryPill>
        </Link>
      ))}
    </div>
  );
};

const CategoryPill = ({
  children,
  isActive,
}: {
  children: React.ReactNode;
  isActive?: boolean;
}) => {
  return (
    <div
      className={cn(
        "rounded-full border border-white px-3 py-1 text-sm font-medium text-[#11023b] hover:cursor-pointer",
        isActive ? "border-[#caceff57] bg-[#f4f5ff]" : "",
      )}
      aria-selected={isActive ? "true" : "false"}
    >
      {children}
    </div>
  );
};

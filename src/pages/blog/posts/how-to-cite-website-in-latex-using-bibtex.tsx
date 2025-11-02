import { BlogPostCategories } from "@/components/blog/blog-post-categories";
import { PostLayout } from "@/components/blog/post-layout";
import { BlogPostMeta } from "@/content/blog-posts";
import Image from "next/image";
import Link from "next/link";

const meta: BlogPostMeta = {
  title: "How to Cite a Website in LaTeX Using BibTeX",
  description:
    "Learn how to properly cite online sources in LaTeX using BibTeX, with ready-to-use examples and templates.",
  date: "November 2, 2025",
  url: "/blog/posts/how-to-cite-website-in-latex-using-bibtex",
  imgSrc: "/library-1.jpeg",
  readingTime: 4,
  category: BlogPostCategories.tutorials,
};
export const howToCiteWebsiteInLatexUsingBibtex = meta;

export default function Post() {
  return (
    <PostLayout
      title={meta.title}
      description={meta.description}
      date={meta.date}
      readingTime={meta.readingTime}
    >
      <p>
        Citing online sources correctly in LaTeX can be confusing. Especially
        when it comes to websites. In this tutorial, you’ll learn exactly how to
        cite a website in LaTeX using BibTeX, complete with ready-to-use
        examples, templates, and a free citation generator at{" "}
        <a
          href="https://getbibtex.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          getbibtex.com
        </a>
        .
      </p>

      <h2>1. The Basic Idea of Using BibTeX</h2>
      <p>
        BibTeX helps you manage citations by keeping them in a separate{" "}
        <code>.bib</code> file. You define each source once, and LaTeX
        automatically handles the formatting when you cite it in your document.
        For websites, you can use the <code>@misc</code> entry type, which works
        perfectly for online materials.
      </p>

      <h2>2. Example of a Website Citation in BibTeX</h2>
      <pre>
        {`@misc{lamport2025,
  author = {Leslie Lamport},
  title = {LaTeX Project Website},
  year = {2025},
  url = {https://www.latex-project.org/},
  note = {Accessed: 2025-11-02}
}`}
      </pre>
      <p>
        In your LaTeX file, cite it with{" "}
        <code>\cite&#123;lamport2025&#125;</code> and include your bibliography
        file with <code>\bibliography&#123;references&#125;</code> and{" "}
        <code>\bibliographystyle&#123;plain&#125;</code>.
      </p>

      <h2>3. Tips for Better Website Citations</h2>
      <ul>
        <li>
          <strong>Include access dates:</strong> Since websites can change, add
          a <code>note</code> field like “Accessed: YYYY-MM-DD.”
        </li>
        <li>
          <strong>Use clickable links:</strong> include{" "}
          <code>{`\\usepackage{url}`}</code> or{" "}
          <code>{`\\usepackage{hyperref}`}</code> in your preamble to make URLs
          clickable.
        </li>
        <li>
          <strong>Keep it consistent:</strong> Use the same citation style for
          all online sources.
        </li>
      </ul>

      <h2>4. Generate BibTeX Entries Automatically</h2>
      <p>
        Writing every BibTeX entry by hand can be tedious. You can instantly
        generate a correct entry for any URL at{" "}
        <a
          href="https://getbibtex.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          getbibtex.com
        </a>
        . Just paste the link, and the app creates a properly formatted BibTeX
        entry ready to copy into your <code>.bib</code> file.
      </p>

      <Link href={"/"}>
        <Image
          src="/getbibtex-example.png"
          alt="Illustration of citing websites in LaTeX using BibTeX"
          width={800}
          height={400}
          className="border"
          priority
        />
      </Link>

      <h2>5. Common Pitfalls to Avoid</h2>
      <ul>
        <li>
          Don’t forget to escape special LaTeX characters (like{" "}
          <code>&#123;</code> and <code>&#125;</code> in URLs).
        </li>
        <li>
          Always include the <code>url</code> and <code>note</code> fields for
          clarity.
        </li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        Citing websites in LaTeX with BibTeX doesn’t have to be complicated.
        Whether you’re citing a research paper, a blog, or an online tool, use{" "}
        <code>@misc</code> with a <code>url</code> and an access date. To speed
        up your workflow, use{" "}
        <a
          href="https://getbibtex.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          getbibtex.com
        </a>{" "}
        to generate your BibTeX entries automatically.
      </p>
    </PostLayout>
  );
}

import { Book, Github, Globe, Lightbulb, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const Navigation = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="space-x-1">
      {sessionData && (
        // FIXME: can't it be a Pill with inNewTab={false}?
        <Link href="/admin">
          <button
            type="button"
            className="group mt-4 whitespace-nowrap rounded-lg border border-primary/20 bg-white/50 px-2 py-1.5 text-sm font-medium text-slate-700 shadow-lg shadow-blue-500/5 transition-all hover:shadow-blue-500/10"
          >
            <div className="inline-flex items-center">
              <User className="h-3" />
              <span>admin</span>
            </div>
          </button>
        </Link>
      )}
      <Pill link="/" inNewTab={false}>
        <>
          <Globe className="h-3" />
          <span>getbibtex.com</span>
        </>
      </Pill>
      <Pill link="/blog" inNewTab={false}>
        <>
          <Book className="h-3" />
          <span>blog</span>
        </>
      </Pill>
      <Pill link="https://github.com/karlosos/getbibtex">
        <>
          {/* TODO: use different icons https://github.com/lucide-icons/lucide/issues/670 */}
          <Github className="h-3" />
          <span>star me on github</span>
        </>
      </Pill>
      <Pill link="https://github.com/karlosos/getbibtex/discussions/categories/ideas">
        <>
          <Lightbulb className="h-3" />
          <span>request a feature</span>
        </>
      </Pill>
      <Pill link="https://www.dzialowski.eu/">
        <>
          <User className="h-3" />
          <span>dzialowski.eu</span>
        </>
      </Pill>
    </div>
  );
};

const Pill = ({
  link,
  children,
  inNewTab = true,
}: {
  link: string;
  children: React.ReactElement;
  inNewTab?: boolean;
}) => (
  <button
    type="button"
    className="group whitespace-nowrap rounded-lg border border-primary/20 bg-white/50 px-2 py-1.5 text-sm font-medium text-slate-700 shadow-lg shadow-blue-500/5 transition-all hover:shadow-blue-500/10"
  >
    <a target={inNewTab ? "_blank" : "_self"} href={link}>
      <div className="inline-flex items-center">{children}</div>
    </a>
  </button>
);

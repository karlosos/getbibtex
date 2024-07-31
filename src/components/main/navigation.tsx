import { Book, Github, Globe, Lightbulb, Notebook, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const Navigation = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="space-x-1">
      {sessionData && (
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
      <Pill link="https://getbibtex.com">
        <>
          <Globe className="h-3" />
          <span>getbibtex.com</span>
        </>
      </Pill>
      <Pill link="https://www.dzialowski.eu/">
        <>
          <Book className="h-3" />
          <span>blog</span>
        </>
      </Pill>
      <Pill link="https://github.com/karlosos/getbibtex">
        <>
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
}: {
  link: string;
  children: React.ReactElement;
}) => (
  <button
    type="button"
    className="group whitespace-nowrap rounded-lg border border-primary/20 bg-white/50 px-2 py-1.5 text-sm font-medium text-slate-700 shadow-lg shadow-blue-500/5 transition-all hover:shadow-blue-500/10"
  >
    <a target="_blank" href={link}>
      <div className="inline-flex items-center">{children}</div>
    </a>
  </button>
);
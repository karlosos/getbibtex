import { api } from "@/utils/api";
import { Layout } from "@/ui/layout";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import {
  ArrowRightCircle,
  Check,
  Copy,
  Github,
  Globe,
  Lightbulb,
  User,
} from "lucide-react";
import React, { useRef, useState } from "react";
import { Textarea } from "@/ui/textarea";
import type { EntryData } from "@/server/citations/types";
import { getCurrentDateString } from "@/utils/date-format";
import { useCopyToClipboard } from "@/utils/copy-to-clipboard";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useUserId } from "@/utils/use-user-id";

export default function Home() {
  const userId = useUserId();

  const [url, setUrl] = useState("");
  const [bibtexEntry, setBibtexEntry] = useState("");
  const [bibtexEntryData, setBibtexEntryData] = useState<EntryData | null>(
    null,
  );
  const [isError, setIsError] = useState(false);

  const getBibtex = api.citations.getBibtexInfo.useMutation();

  const handleGetBibtex = () => {
    if (!url) {
      return;
    }

    setBibtexEntry("");
    setBibtexEntryData(null);
    setIsError(false);

    getBibtex.mutate(
      { url: url, userId: userId },
      {
        onSuccess: (data) => {
          setBibtexEntry(data.bibtex);
          setBibtexEntryData(data.entryData);
        },
        onError: (_e) => {
          setIsError(true);
        },
      },
    );
  };

  return (
    <Layout>
      <main className="flex flex-col items-center">
        <div className="mt-2 flex h-80 w-full max-w-4xl flex-col items-center rounded-xl bg-gradient-to-b from-[#d5edd7] to-[#f8eec4] p-2 text-[#11124d] shadow-sm lg:mt-8">
          <Navigation />
          <HeaderText />
        </div>
        <div className="-mt-12 flex w-full max-w-2xl items-center gap-4 rounded-xl bg-white p-4 shadow-xl">
          <Input
            type="text"
            placeholder="URL to website/article"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            className="gap-2 whitespace-nowrap"
            onClick={() => handleGetBibtex()}
          >
            {getBibtex.isLoading ? (
              <span className="loading"></span>
            ) : (
              <ArrowRightCircle className="text-white/80" />
            )}
            Get BibTeX
          </Button>
        </div>
        {bibtexEntry && bibtexEntryData && (
          <div className="z-10 mt-10 w-full max-w-2xl rounded-md border border-primary/20 bg-slate-50/50 p-4 shadow-sm">
            <>
              <Textarea
                className="h-48 bg-white"
                value={bibtexEntry}
                onChange={(e) => setBibtexEntry(e.target.value)}
              />
              <div className="mt-2 flex justify-end space-x-2">
                {/* <Button variant={"outline"} className="gap-2">
                  <Edit className="w-4" />
                  Advanced editing
                </Button> */}
                <CopyToClipboardButton value={bibtexEntry} />
              </div>
              <div className="mt-4">
                <span>
                  {bibtexEntryData.author && bibtexEntryData.author + ". "}
                </span>
                <span className="italic">
                  {bibtexEntryData.title +
                    " --- " +
                    bibtexEntryData.website +
                    ". "}{" "}
                </span>
                <a href={bibtexEntryData.url}>{bibtexEntryData.url}</a>,
                <span> [Accessed {getCurrentDateString()}]</span>
              </div>
            </>
          </div>
        )}
        {isError && (
          <>
            <div className="mt-12 text-center">
              <h3 className="text-xl font-bold">Something bad happened</h3>
              <p>
                Looks like given url caused some problems. Try again with
                different one.
              </p>
              <img
                className="mt-4 w-[500px]"
                src="./error.webp"
                alt="Illustration when error happens."
              ></img>
            </div>
          </>
        )}
      </main>
    </Layout>
  );
}

const Navigation = () => {
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
    className="group mt-4 whitespace-nowrap rounded-lg border border-primary/20 bg-white/50 px-2 py-1.5 text-sm font-medium text-slate-700 shadow-lg shadow-blue-500/5 transition-all hover:shadow-blue-500/10"
  >
    <a target="_blank" href={link}>
      <div className="inline-flex items-center">{children}</div>
    </a>
  </button>
);

const HeaderText = () => (
  <>
    <h1 className="mt-3 text-4xl font-extrabold">Generate BibTeX from URL</h1>
    <p className="mt-4 max-w-xl">
      Paste URL below and generate BibTeX citation. Keep in mind that most
      educators and professionals do not consider it appropriate to use tertiary
      sources such as encyclopedias as a sole source for any information —
      citing an encyclopedia as an important reference in footnotes or
      bibliographies may result in censure or a failing grade.{" "}
    </p>
  </>
);

const CopyToClipboardButton = ({ value }: { value: string }) => {
  // TODO: fix linting. why i cannot disable it in .eslintrc.cjs?
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);
  const timerId = useRef<NodeJS.Timeout | null>();

  const handleCopy = async () => {
    await copy(value);
    setIsCopied(true);
    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    timerId.current = setTimeout(() => {
      setIsCopied(false);
      timerId.current = null;
    }, 500);
  };

  return (
    <Button
      className="duration-250 gap-2"
      disabled={isCopied}
      // TODO: fix linting. why i cannot disable it in .eslintrc.cjs?
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={handleCopy}
    >
      {isCopied ? (
        <>
          <Check className="w-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="w-4" />
          Copy to clipboard
        </>
      )}
    </Button>
  );
};

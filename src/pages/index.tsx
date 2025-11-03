import { api } from "@/utils/api";
import { Layout } from "@/ui/layout";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { ArrowRightCircle  } from "lucide-react";
import React, { useState } from "react";
import { Textarea } from "@/ui/textarea";
import type { EntryData } from "@/server/citations/types";
import { getCurrentDateString } from "@/utils/date-format";
import { useUserId } from "@/utils/use-user-id";
import { ErrorForm } from "@/components/main/error";
import { CopyToClipboardButton } from "@/components/main/copy-to-clipboard-button";
import { Navigation } from "@/components/main/navigation";
import { RecentPosts } from "@/components/blog/recent-posts";
import { BuyMeACoffee } from "@/components/buy-me-a-coffee";
import { AnnouncementBar } from "@/components/announcement-bar";

export default function Home() {
  const userId = useUserId();

  const [url, setUrl] = useState("");
  const [bibtexEntry, setBibtexEntry] = useState("");
  const [bibtexEntryData, setBibtexEntryData] = useState<EntryData | null>(
    null,
  );
  const [isError, setIsError] = useState(false);
  const [isBmcVisible, setIsBmcVisible] = useState(false);

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
          setIsBmcVisible(true);
        },
        onError: (_e) => {
          setIsError(true);
        },
      },
    );
  };

  return (
    <Layout>
      <>
        <AnnouncementBar />
        <main className="flex flex-col items-center">
          <div className="mt-2 flex h-80 w-full max-w-4xl flex-col items-center rounded-xl bg-gradient-to-b from-[#d5edd7] to-[#f8eec4] p-2 pt-4 text-[#11124d] lg:mt-4">
            <Navigation />
            <HeaderText />
          </div>
          <div className="-mt-12 flex w-full max-w-2xl items-center gap-4 rounded-xl border bg-white p-4 shadow-xl">
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
              <Textarea
                className="h-48 bg-white"
                value={bibtexEntry}
                onChange={(e) => setBibtexEntry(e.target.value)}
              />
              <div className="mt-2 flex justify-end space-x-2">
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
            </div>
          )}
          {isError && <ErrorForm url={url} />}
          <div className="my-20 w-full max-w-4xl">
            <RecentPosts />
          </div>
          {isBmcVisible && <BuyMeACoffee />}
        </main>
      </>
    </Layout>
  );
}

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

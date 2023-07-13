import { api } from "@/utils/api";
import { Layout } from "@/ui/layout";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import {
  ArrowRightCircle,
  Copy,
  Edit,
  Github,
  Globe,
  PlusSquare,
} from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/ui/textarea";

export default function Home() {
  const getBibtex = api.example.getBibtexInfo.useMutation();

  const handleGetBibtex = (url: string) => {
    getBibtex.mutate(
      { url: url },
      {
        onSuccess: (data) => {
          setBibtexEntry(
            data.bibtexEntry.author + "\n" + data.bibtexEntry.title
          );
        },
      }
    );
  };

  const [bibtexEntry, setBibtexEntry] = useState("");

  return (
    <Layout>
      <main className="flex flex-col items-center">
        <div className="m-2 flex h-80 w-full max-w-4xl flex-col items-center rounded-2xl bg-gradient-to-b from-[#d5edd7] to-[#f8eec4] p-2 text-[#11124d] shadow-sm">
          <div className="space-x-1">
            <UrlPill />
            <GitHubPill />
            <FeatureRequestPill />
          </div>
          <HeaderText />
        </div>
        <div className="-mt-12 flex w-full max-w-2xl items-center gap-4 rounded-xl bg-white p-4 shadow-xl">
          <Input type="text" placeholder="URL to website/article" />
          <Button
            className="gap-2 whitespace-nowrap"
            onClick={() => handleGetBibtex("urlhehe")}
          >
            {getBibtex.isLoading ? (
              <span className="loading"></span>
            ) : (
              <ArrowRightCircle className="text-white/80" />
            )}
            Get BibTeX
          </Button>
        </div>
        <div className="mt-10 w-full max-w-2xl p-2">
          {bibtexEntry && (
            <>
              <Textarea
                value={bibtexEntry}
                onChange={(e) => setBibtexEntry(e.target.value)}
              />
              <div className="mt-2 flex justify-end space-x-2">
                {/* <Button variant={"outline"} className="gap-2">
                  <Edit className="w-4" />
                  Advanced editing
                </Button> */}
                <Button className="gap-2">
                  <Copy className="w-4" />
                  Copy to clipboard
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </Layout>
  );
}

const UrlPill = () => (
  <button
    type="button"
    className="group mt-4 whitespace-nowrap rounded-lg border border-primary/20 bg-white/50 px-2 py-1.5 text-sm font-medium text-slate-700 shadow-lg shadow-blue-500/5 transition-all hover:shadow-blue-500/10"
  >
    <a href="https://getbibtex.com">
      <div className="inline-flex items-center">
        <Globe className="h-3" />
        <span>getbibtex.com</span>
      </div>
    </a>
  </button>
);

const GitHubPill = () => (
  <button
    type="button"
    className="group mt-4 whitespace-nowrap rounded-lg border border-primary/20 bg-white/50 px-2 py-1.5 text-sm font-medium text-slate-700 shadow-lg shadow-blue-500/5 transition-all hover:shadow-blue-500/10"
  >
    <a target="_blank" href="https://github.com/karlosos/getbibtex">
      <div className="inline-flex items-center">
        <Github className="h-3" />
        <span>give me a star</span>
      </div>
    </a>
  </button>
);

const FeatureRequestPill = () => (
  <button
    type="button"
    className="group mt-4 whitespace-nowrap rounded-lg border border-primary/20 bg-white/50 px-2 py-1.5 text-sm font-medium text-slate-700 shadow-lg shadow-blue-500/5 transition-all hover:shadow-blue-500/10"
  >
    <a
      target="_blank"
      href="https://github.com/karlosos/getbibtex/discussions/categories/ideas"
    >
      <div className="inline-flex items-center">
        <PlusSquare className="h-3" />
        <span>request a feature</span>
      </div>
    </a>
  </button>
);

const HeaderText = () => (
  <>
    <h1 className="mt-3 text-4xl font-extrabold">Generate BibTeX from URL</h1>
    <p className="mt-4 max-w-xl">
      Paste URL below and generate BibTeX citation. Keep in mind that most
      educators and professionals do not consider it appropriate to use tertiary
      sources such as encyclopedias as a sole source for any information—citing
      an encyclopedia as an important reference in footnotes or bibliographies
      may result in censure or a failing grade.{" "}
    </p>
  </>
);

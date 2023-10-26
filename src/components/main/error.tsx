import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import { encodeCharactersInBibTex } from "@/utils/bibtex-encode-characters";
import { getCurrentDateString } from "@/utils/date-format";
import { useState } from "react";
import { CopyToClipboardButton } from "./copy-to-clipboard-button";

export const ErrorForm = ({ url }: { url: string }) => {
  const [bibtexEntry, setBibtexEntry] = useState(
    createFallbackBibtexEntry({ url: url }),
  );

  const [citeKey, setCiteKey] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  return (
    <div className="mb-4">
      <div className="mt-12 text-center">
        <h3 className="mb-2 text-lg font-bold text-[#11124d]">
          Something bad happened 😟
        </h3>
        <div className="text-neutral-500">
          <p>Probably we are being blocked by the domain.</p>
          <p>
            Check if you have a valid url, e.g.{" "}
            <span className="font-mono">
              https://developer.mozilla.org/en-US/
            </span>
            .
          </p>
          <p>
            If it&apos;s not working we have prepared an empty entry that you
            can fill in by yourself.
          </p>
        </div>
      </div>

      <div className="z-10 mt-10 w-full max-w-2xl rounded-md border border-primary/20 bg-slate-50/50 p-4 shadow-sm">
        <div className="mb-2 grid w-full items-center gap-1.5">
          <Label htmlFor="citekey">Citation Key</Label>
          <Input
            type="citekey"
            id="citekey"
            placeholder="Citation Key (e.g. author2024)"
            value={citeKey}
            onChange={(e) => {
              setCiteKey(e.target.value);
              setBibtexEntry(
                createFallbackBibtexEntry({
                  url: url,
                  author: author,
                  citeKey: e.target.value,
                  title: title,
                }),
              );
            }}
          />
          <Label htmlFor="title">Title</Label>
          <Input
            type="title"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setBibtexEntry(
                createFallbackBibtexEntry({
                  url: url,
                  author: author,
                  citeKey: citeKey,
                  title: e.target.value,
                }),
              );
            }}
          />
          <Label htmlFor="author">Author</Label>
          <Input
            type="author"
            id="author"
            placeholder="Author"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
              setBibtexEntry(
                createFallbackBibtexEntry({
                  url: url,
                  author: e.target.value,
                  citeKey: citeKey,
                  title: title,
                }),
              );
            }}
          />
        </div>
        <>
          <Textarea
            className="h-48 bg-white"
            value={bibtexEntry}
            onChange={(e) => setBibtexEntry(e.target.value)}
          />
        </>
        <div className="mt-2 flex justify-end space-x-2">
          <CopyToClipboardButton value={bibtexEntry} />
        </div>
      </div>
    </div>
  );
};

const createFallbackBibtexEntry = ({
  url,
  citeKey,
  author,
  title,
}: {
  url: string;
  citeKey?: string;
  author?: string;
  title?: string;
}) => {
  const bibtexEmptyEntry = `@misc{${citeKey ? citeKey : "key"},
\tauthor = {${author ?? ""}},
\ttitle = {${title ? encodeCharactersInBibTex(title) : ""}},
\thowpublished = {\\url{${url ?? ""}}},
\tyear = {},
\tnote = {[Accessed ${getCurrentDateString()}]},
}`;

  return bibtexEmptyEntry;
};

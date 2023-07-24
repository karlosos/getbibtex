import urlMetadata from "url-metadata";
import { EntryData } from "./types";
import { createCiteKey } from "./createCitekey";
import { getCurrentDate } from "@/utils/current-date";

export const getCitation = async (url: string) => {
  const metadata = await urlMetadata(url);
  const domain = domainFromUrl(url);
  const entryData: EntryData = {
    title: metadata.title,
    author: metadata.author,
    url: url,
    website: domain,
  };

  const bibtex: string = bibtexFromEntryData(entryData);

  return { bibtex, entryData };
};

function domainFromUrl(url: string): string {
  // based on regular expression https://regex101.com/r/MOIFTy/3
  const domainRegex = /^(?:https?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n]+)/;
  const match = url.match(domainRegex);
  let domain: string = "";
  if (match != null) {
    domain = match.at(1) ?? "";
  }
  return domain;
}

function bibtexFromEntryData(entryData: EntryData): string {
  // TODO: check if there are no invalid characters for bibtex
  const currentDate = getCurrentDate();
  const title = upperLettersInBibTex(
    `${entryData.title} --- ${entryData.website}`
  );
  let bibtex: string = `@misc{${createCiteKey(entryData)},
\tauthor = {${entryData.author}},
\ttitle = {${title}},
\thowpublished = {\\url{${entryData.url}}},
\tyear = {},
\tnote = {[Accessed ${currentDate}]},
}`;

  return bibtex;
}

function upperLettersInBibTex(str: string): string {
  return str.replace(/([A-Z])/g, "{$1}");
}

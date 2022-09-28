import type { NextPage } from "next";

import {
  GeistProvider,
  CssBaseline,
  useClipboard,
  Input,
  Spacer,
  Button,
  Textarea,
  Text,
  Note,
  Grid,
} from "@geist-ui/react";

import React, { useEffect, useRef, useState } from "react";
import { Copy, Check } from "@geist-ui/react-icons";
import moment from "moment";
import axios, { AxiosResponse } from "axios";
import { Layout } from "../components/Layout";
import { EntryData } from "../common/types";

const Home: NextPage = () => {
  const [url, setUrl] = useState<string>("");
  const [bibtexEntry, setBibtexEntry] = useState<string>("");
  const [entryData, setEntryData] = useState<EntryData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const copyButtonTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const { copy } = useClipboard();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleButtonClicked = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);

    const response: AxiosResponse<{ bibtex: string, entryData: EntryData}> = await axios.post(`/api/getCitation/`, { url: url })
    const { bibtex, entryData } = response.data;

    setBibtexEntry(bibtex);
    setEntryData(entryData);
    setLoading(false);
  };

  const handleCopyClicked = () => {
    copy(bibtexEntry);
    setCopied(true);

    // When copy button clicked is multiple times
    // then start counting from the last one
    if (copyButtonTimerRef.current !== undefined) {
      clearTimeout(copyButtonTimerRef.current)
    }

    copyButtonTimerRef.current = setTimeout(() => {
      setCopied(false);
      copyButtonTimerRef.current = undefined;
    }, 1500);
  };

  useEffect(() => {
    return () => copyButtonTimerRef.current && clearTimeout(copyButtonTimerRef.current);
  }, []);

  return (
    <Layout>
      <GeistProvider>
        <CssBaseline />
        <Grid.Container
          style={{ marginBottom: "15px", maxWidth: "38em", margin: "0 auto" }}
          justify="center"
          xs={22}
        >
          <Spacer h={2} />
          <Text h1>BibTeX generator from URL</Text>
          <Note label="IMPORTANT NOTE" type="warning">
            Most educators and professionals do not consider it appropriate to
            use tertiary sources such as encyclopedias as a sole source for any
            information—citing an encyclopedia as an important reference in
            footnotes or bibliographies may result in censure or a failing
            grade. Wikipedia articles should be used for background information,
            as a reference for correct terminology and search terms, and as a
            starting point for further research.
          </Note>
          <Spacer h={2} />
          <Text h4>Enter the URL below: </Text>
          <Input
            placeholder="URL to website/article"
            width="100%"
            value={url}
            onChange={handleUrlChange}
          />
          <Spacer h={0.5} />
          <Grid xs={24} justify="center">
            <Button
              loading={loading}
              onClick={handleButtonClicked}
              type="secondary"
              style={{ width: "100%" }}
            >
              Generate BibTeX entry
            </Button>
          </Grid>
          <Spacer h={0.5} />
          <div className="output" style={{ position: "relative" }}>
            <Textarea
              placeholder=""
              width="100%"
              rows={15}
              value={bibtexEntry}
              onChange={(e) => setBibtexEntry(e.target.value)}
            />
            <Button
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                zIndex: 33,
                borderColor: copied ? "green" : "black",
                padding: "0 0.5rem",
              }}
              iconRight={copied ? <Check color="green" /> : <Copy />}
              auto
              scale={1 / 2}
              onClick={handleCopyClicked}
            />
          </div>
          {entryData != null && (
            <span>
              <span>{entryData?.author && entryData?.author + ". "}</span>
              <span style={{ fontStyle: "italic" }}>
                {entryData?.title + " --- " + entryData?.website + ". "}{" "}
              </span>
              <a href={entryData?.url}>{entryData?.url}</a>,
              <span> [Accessed {moment().format("DD-MMM-YYYY")}]</span>
            </span>
          )}
        </Grid.Container>
      </GeistProvider>
    </Layout>
  );
};

export default Home;
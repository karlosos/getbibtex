import { Navigation } from "@/components/main/navigation";
import { Layout } from "@/ui/layout";
import React, { useState } from "react";

export default function Blog() {
  return (
    <Layout>
      <main className="flex flex-col items-center">
        <div className="mt-2 flex w-full max-w-7xl flex-col items-center rounded-b-none rounded-xl bg-gradient-to-b from-[#f2f1ff] to-[#e7ebff] p-2 px-8 py-4 text-[#11124d] lg:mt-8">
          <Navigation />
          <div className="mt-12">
            <div className="rounded-full border border-[#e3e3fe] bg-[#efeaff] px-4 py-1 text-sm font-medium">
              Blog & Resources
            </div>
          </div>
        <h1 className="text-[64px] text-medium max-w-3xl text-center">Discover articles and tutorials to help you build better.</h1>
        </div>
        <div className="flex w-full max-w-7xl flex-col items-center rounded-t-none rounded-xl bg-gradient-to-b from-[#e7ebff] to-white p-2 px-8 py-4 text-[#11124d] h-96"></div>
        <BlogIncomeText />
      </main>
    </Layout>
  );
}

const HeaderText = () => <h1 className="text-xl font-medium">getbibtex.com</h1>;

const BlogIncomeText = () => (
  <>
    <div>
      Latest Guides <br />& News Articles
    </div>
    <div>Stay informed with the latest guides and news</div>
  </>
);

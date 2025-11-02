import { Navigation } from "@/components/main/navigation";
import { Layout } from "@/ui/layout";
import React from "react";

export const PostLayout = ({
  title,
  description,
  date,
  readingTime,
  children,
}: {
  title: string;
  description: string;
  date: string;
  readingTime: number;
  children: React.ReactNode;
}) => {
  return (
    <Layout>
      <main className="flex flex-col items-center">
        <div className="mt-2 flex w-full max-w-7xl flex-col  rounded-xl rounded-b-none bg-gradient-to-b from-[#f2f1ff] to-[#e7ebff] p-1 px-32 pt-4 text-[#11124d] lg:mt-8">
          <div className="mx-auto">
            <Navigation />
          </div>
        </div>
        <div className="flex w-full max-w-7xl flex-col bg-gradient-to-b from-[#e7ebff] to-white p-0 px-32 pb-9 text-[#11124d]">
          <h1 className="text-medium mt-32 max-w-3xl pb-4 text-[32px] font-medium leading-none sm:text-[54px]">
            {title}
          </h1>
          <p className="text-[16px] text-[#262556]">{description}</p>
          <div className="mt-4 flex items-center gap-2 ">
            <div className="text-[14px] font-medium text-[#6c6f89]">{date}</div>
            <div className="rounded-full border bg-[#f1f0ff] px-3 py-1 text-[14px] font-medium text-[#361763]">
              {readingTime} Min Read
            </div>
          </div>
        </div>
        <div className="mb-48 flex w-full max-w-7xl gap-4 px-32">
          <div className="post-content max-w-3xl">{children}</div>
          {/* <div className="mt-12 w-[160px] h-[600px] rounded-md border bg-gray-50 px-8">
            Placeholder
          </div> */}
        </div>
      </main>
    </Layout>
  );
};

import { Button } from "@/ui/button";
import { Layout } from "@/ui/layout";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <Layout>
      <section className="mx-auto max-w-2xl bg-white">
        <div className="container mx-auto flex min-h-screen items-center px-6 py-12">
          <div>
            <p className="text-sm font-medium text-primary ">401 error</p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
              You are unauthorized
            </h1>
            <p className="mt-4 text-gray-500 ">
              Sorry, you cannot access the page you are looking for.
            </p>

            <div className="mt-6 flex items-center gap-x-3">
              <Link href="/admin">
                <Button variant={"outline"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 rtl:rotate-180"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>

                  <span>Go back</span>
                </Button>
              </Link>

              <Link href="/">
                <Button>Take me home</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

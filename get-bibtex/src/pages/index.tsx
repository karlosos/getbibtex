import { api } from "@get-bibtex/utils/api";
import { Layout } from "@get-bibtex/ui/layout";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <Layout>
      <main>
        <p>{hello.data ? hello.data.greeting : "Loading tRPC query..."}</p>
      </main>
    </Layout>
  );
}

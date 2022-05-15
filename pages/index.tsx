import { Doc } from "~/typings/doc";
import { readFile } from "fs/promises";
import * as path from "path";
import Sidebar from "~/components/sidebar";
import Layout from "~/components/layout";

export const getStaticProps = async () => {
  const filePath = path.resolve(process.cwd(), "resources/doc.json");
  const json = await readFile(filePath, "utf8");
  const data = JSON.parse(json) as Doc;
  return {
    props: {
      data,
    },
  };
};

const Home = ({ data }: { data: Doc }) => {
  return (
    <Layout>
      <Sidebar doc={data} />
    </Layout>
  );
};

export default Home;

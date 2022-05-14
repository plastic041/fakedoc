import { readFile } from "fs/promises";
import { GetStaticPaths, GetStaticProps } from "next";
import * as path from "path";
import Sidebar from "../../components/sidebar";
import { Category, Doc, Page } from "../../typings/doc";
import styles from "../../styles/Layout.module.scss";

export const getStaticProps: GetStaticProps = async (context) => {
  const filePath = path.resolve(process.cwd(), "resources/doc.json");
  const json = await readFile(filePath, "utf8");
  const docData = JSON.parse(json) as Doc;

  const { category, page } = context.params as {
    category: string;
    page: string;
  };

  console.log(docData, category);

  const categoryData = docData.categories.find((c) => c.title === category);

  if (!categoryData) {
    throw new Error("Category not found");
  }

  const pageData = categoryData.pages.find((p) => p.title === page);

  if (!pageData) {
    throw new Error("Page not found");
  }

  return {
    props: {
      docData,
      categoryData,
      pageData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.resolve(process.cwd(), "resources/doc.json");
  const json = await readFile(filePath, "utf8");
  const docData = JSON.parse(json) as Doc;

  const paths: { params: { category: string; page: string } }[] = [];
  docData.categories.forEach((category) => {
    category.pages.forEach((page) => {
      paths.push({
        params: {
          category: category.title,
          page: page.title,
        },
      });
    });
  });

  return {
    paths,
    fallback: false,
  };
};

const Page = ({
  docData,
  categoryData,
  pageData,
}: {
  docData: Doc;
  categoryData: Category;
  pageData: Page;
}) => {
  return (
    <div className={styles.container}>
      <Sidebar doc={docData} currentPage={pageData} />
      <main>
        <h1>{pageData.title}</h1>
        <h2>{pageData.subtitle}</h2>
        <time dateTime={pageData.updatedAt}>{pageData.updatedAt}</time>
        <p>{pageData.body}</p>
      </main>
    </div>
  );
};

export default Page;

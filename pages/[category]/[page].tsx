import { readFile } from "fs/promises";
import { GetStaticPaths, GetStaticProps } from "next";
import * as path from "path";
import Sidebar from "../../components/sidebar";
import { Category, Doc, Page } from "../../typings/doc";
import styles from "../../styles/Layout.module.scss";
import { getDoc } from "../../lib/doc";

export const getStaticProps: GetStaticProps = async (context) => {
  const doc = await getDoc();

  const { category, page } = context.params as {
    category: string;
    page: string;
  };

  const categoryData = doc.categories.find((c) => c.title === category);

  if (!categoryData) {
    throw new Error("Category not found");
  }

  const pageData = categoryData.pages.find((p) => p.title === page);

  if (!pageData) {
    throw new Error("Page not found");
  }

  return {
    props: {
      docData: doc,
      categoryData,
      pageData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const doc = await getDoc();

  const paths: { params: { category: string; page: string } }[] = [];
  doc.categories.forEach((category) => {
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
        <span></span>
        <h1>{pageData.title}</h1>
        <h2>{pageData.subtitle}</h2>
        <time dateTime={pageData.updatedAt}>{pageData.updatedAt}</time>
        <p>{pageData.body}</p>
      </main>
    </div>
  );
};

export default Page;

import { GetStaticPaths, GetStaticProps } from "next";
import { Category, Doc, Page } from "~/typings/doc";
import { getDoc } from "~/lib/doc";
import Sidebar from "~/components/sidebar";
import Layout from "~/components/layout";
import Main from "~/components/main";

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
    <Layout>
      <Sidebar doc={docData} currentPage={pageData} />
      <Main category={categoryData} page={pageData} />
    </Layout>
  );
};

export default Page;

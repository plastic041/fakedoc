export type Page = {
  id: string;
  title: string;
  subtitle: string;
  updatedAt: string;
  body: string[];
};

export type Category = {
  id: string;
  title: string;
  pages: Page[];
};

export type Doc = {
  categories: Category[];
};

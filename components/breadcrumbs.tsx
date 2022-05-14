import { Category, Page } from "../typings/doc";
import styles from "../styles/breadcrumbs.module.scss";

type BreadcrumbsProps = {
  category: Category;
  page: Page;
};
const Breadcrumbs = ({ category, page }: BreadcrumbsProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.category}>{category.title}</span>
      <span className={styles.slash}>/</span>
      <span className={styles.page}>{page.title}</span>
    </div>
  );
};

export default Breadcrumbs;

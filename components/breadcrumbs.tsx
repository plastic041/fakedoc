import { Category, Page } from "../typings/doc";
import styles from "../styles/Breadcrumbs.module.scss";

type BreadcrumbsProps = {
  category: Category;
  page: Page;
};
const Breadcrumbs = ({ category, page }: BreadcrumbsProps) => {
  return (
    <div className={styles.breadcrumbs}>
      <span>{category.title}</span>
      <span>/</span>
      <span>{page.title}</span>
    </div>
  );
};

export default Breadcrumbs;

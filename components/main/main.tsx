import { Category, Page } from "~/typings/doc";
import Breadcrumbs from "~/components/breadcrumbs";
import styles from "./styles.module.scss";
import dayjs from "dayjs";

type MainProps = {
  category: Category;
  page: Page;
};
const Main = ({ category, page }: MainProps) => {
  const time = dayjs(page.updatedAt).format("YYYY-MM-DD HH:mm");
  return (
    <main className={styles.container}>
      <Breadcrumbs category={category} page={page} />
      <h1>{page.title}</h1>
      <h2>{page.subtitle}</h2>
      <time dateTime={page.updatedAt}>{time}</time>
      <div>
        {page.body.map((paragraph) => {
          return <p key={paragraph}>{paragraph}</p>;
        })}
      </div>
    </main>
  );
};

export default Main;

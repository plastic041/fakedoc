import Link from "next/link";
import styles from "./styles.module.scss";
import { Doc, Page } from "~/typings/doc";

type SidebarProps = {
  doc: Doc;
  currentPage?: Page;
};
const Sidebar = ({ doc, currentPage }: SidebarProps) => {
  return (
    <nav className={styles.sidebar}>
      <Link href="/">
        <a className={styles.home}>Home</a>
      </Link>
      <ul className={styles.categories}>
        {doc.categories.map((category) => {
          return (
            <li key={category.id}>
              <div className={styles.category}>
                <div>{category.title}</div>
                <ul className={styles.pages}>
                  {category.pages.map((page) => {
                    return (
                      <li key={page.id}>
                        <div className={`${styles.page}`}>
                          <Link href={`/${category.title}/${page.title}`}>
                            <a
                              className={
                                page.id === currentPage?.id
                                  ? styles.current
                                  : ""
                              }
                            >
                              <div>{page.title}</div>
                            </a>
                          </Link>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;

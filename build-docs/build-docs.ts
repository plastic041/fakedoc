import { writeFile } from "fs/promises";
import * as path from "path";
import { faker } from "@faker-js/faker";
import { Category, Doc, Page } from "../typings/doc";

const getPage = (): Page => {
  const title = faker.lorem.word();
  return {
    id: faker.datatype.uuid(),
    title,
    subtitle: `${faker.commerce.productAdjective()} ${title}`,
    updatedAt: faker.date.recent().toISOString(),
    body: faker.lorem.paragraphs(),
  };
};

const getCategory = (): Category => {
  const title = faker.lorem.word();
  const pages = Array(faker.datatype.number(10)).fill(null).map(getPage);
  return {
    id: faker.datatype.uuid(),
    title,
    pages,
  };
};

const getDoc = (): Doc => {
  const categories = Array(faker.datatype.number(10))
    .fill(null)
    .map(getCategory);
  return {
    categories,
  };
};

const saveDoc = () => {
  const doc = getDoc();
  // save doc as json
  const filePath = path.join(process.cwd(), "resources/doc.json");
  writeFile(filePath, JSON.stringify(doc, null, 2));
};

saveDoc();

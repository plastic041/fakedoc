import { writeFile } from "fs/promises";
import * as path from "path";
import { faker } from "@faker-js/faker";
import { Category, Doc, Page } from "../typings/doc";

const getPage = (): Page => {
  const title = faker.lorem.word();
  // body is multiple paragraphs
  const body = Array(
    faker.datatype.number({
      min: 1,
      max: 32,
    })
  )
    .fill(null)
    .map(() =>
      faker.lorem.paragraph(
        faker.datatype.number({
          min: 1,
          max: 16,
        })
      )
    );

  return {
    id: faker.datatype.uuid(),
    title,
    subtitle: `${faker.commerce.productAdjective()} ${title}`,
    updatedAt: faker.date.recent().toISOString(),
    body,
  };
};

const getCategory = (): Category => {
  const title = faker.lorem.word();
  const pages = Array(faker.datatype.number({ min: 2, max: 10 }))
    .fill(null)
    .map(getPage);
  return {
    id: faker.datatype.uuid(),
    title,
    pages,
  };
};

const getDoc = (): Doc => {
  const categories = Array(faker.datatype.number({ min: 10, max: 16 }))
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

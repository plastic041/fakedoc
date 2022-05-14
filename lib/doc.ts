import { readFile } from "fs/promises";
import { resolve } from "path";
import { Doc } from "../typings/doc";

export const getDoc = async () => {
  const filePath = resolve(process.cwd(), "resources/doc.json");
  const json = await readFile(filePath, "utf8");
  const doc = JSON.parse(json) as Doc;

  return doc;
};

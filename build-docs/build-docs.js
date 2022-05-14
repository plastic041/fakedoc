"use strict";
exports.__esModule = true;
var promises_1 = require("fs/promises");
var path = require("path");
var faker_1 = require("@faker-js/faker");
var getPage = function () {
    var title = faker_1.faker.lorem.word();
    // body is multiple paragraphs
    var body = Array(faker_1.faker.datatype.number(10))
        .fill(null)
        .map(function () { return faker_1.faker.lorem.paragraph(faker_1.faker.datatype.number(10)); });
    return {
        id: faker_1.faker.datatype.uuid(),
        title: title,
        subtitle: "".concat(faker_1.faker.commerce.productAdjective(), " ").concat(title),
        updatedAt: faker_1.faker.date.recent().toISOString(),
        body: body
    };
};
var getCategory = function () {
    var title = faker_1.faker.lorem.word();
    var pages = Array(faker_1.faker.datatype.number(10)).fill(null).map(getPage);
    return {
        id: faker_1.faker.datatype.uuid(),
        title: title,
        pages: pages
    };
};
var getDoc = function () {
    var categories = Array(faker_1.faker.datatype.number(10))
        .fill(null)
        .map(getCategory);
    return {
        categories: categories
    };
};
var saveDoc = function () {
    var doc = getDoc();
    // save doc as json
    var filePath = path.join(process.cwd(), "resources/doc.json");
    (0, promises_1.writeFile)(filePath, JSON.stringify(doc, null, 2));
};
saveDoc();

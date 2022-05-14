"use strict";
exports.__esModule = true;
exports.getDoc = exports.getCategory = exports.getPage = void 0;
var promises_1 = require("fs/promises");
var path = require("path");
var faker_1 = require("@faker-js/faker");
var getPage = function () {
    var title = faker_1.faker.commerce.product();
    return {
        id: faker_1.faker.datatype.uuid(),
        title: title,
        subtitle: "".concat(faker_1.faker.commerce.productAdjective(), " ").concat(title),
        updatedAt: faker_1.faker.date.recent().toISOString(),
        body: faker_1.faker.lorem.paragraphs()
    };
};
exports.getPage = getPage;
var getCategory = function () {
    var title = faker_1.faker.commerce.department();
    var pages = Array(faker_1.faker.datatype.number(10)).fill(null).map(exports.getPage);
    return {
        id: faker_1.faker.datatype.uuid(),
        title: title,
        pages: pages
    };
};
exports.getCategory = getCategory;
var getDoc = function () {
    var categories = Array(faker_1.faker.datatype.number(10))
        .fill(null)
        .map(exports.getCategory);
    return {
        categories: categories
    };
};
exports.getDoc = getDoc;
var saveDoc = function () {
    var doc = (0, exports.getDoc)();
    // save doc as json
    var filePath = path.join(process.cwd(), "resources/doc.json");
    (0, promises_1.writeFile)(filePath, JSON.stringify(doc, null, 2));
};
saveDoc();

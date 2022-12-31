'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const offset = (page, size) => {
  return (page - 1) * size;
};
const pageUrls = (page, size, count, endpoint) => {
  const paging = {};
  console.log(page, size);
  if (size + offset(page, size) >= count) {
    paging.next = null;
    if (page > 1) paging.previous = `${endpoint}?page=${page - 1}&size=${size}`;
    else paging.previous = null;
  } else {
    paging.next = `${endpoint}?page=${page + 1}&size=${size}`;
    if (page > 1) paging.previous = `${endpoint}?page=${page - 1}&size=${size}`;
    else paging.previous = null;
  }
  return paging;
};
const paginator = { offset, pageUrls };
exports.default = paginator;
//# sourceMappingURL=paginator.js.map

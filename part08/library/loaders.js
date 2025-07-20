const DataLoader = require("dataloader");
const Book = require("./models/book");

const bookCountLoader = new DataLoader(async (authorIds) => {
  // TODO: implement bookCountLoader
  console.log(
    `new bookCount dataloader. book counts for ${authorIds.length} Authors`
  );

  const bookCount = await Book.aggregate([
    { $match: { author: { $in: authorIds } } },
    { $group: { _id: "$author", count: { $sum: 1 } } },
  ]);

  //console.log(bookCount);

  const countMap = new Map();

  bookCount.forEach(({ _id, count }) => {
    countMap.set(_id.toString(), count);
  });

  return authorIds.map((id) => countMap.get(id.toString()) || 0);
});

module.exports = bookCountLoader;

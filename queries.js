//Question1 crud operatiomns

db.books.find({ genre: "Fiction" });

db.books.find({ published_year: { $gt: 1950 } });

db.books.find({ author: "George Orwell" });

db.books.updateOne(
  { title: "1984" },
  { $set: { price: 12.50 } }
);

db.books.deleteOne({ title: "Moby Dick" });

//Question2 advanced queries

db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
});

db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

db.books.find().sort({ price: 1 });

db.books.find().sort({ price: -1 });

db.books.find().skip(0).limit(5);

db.books.find().skip(5).limit(5);

//Question3 aggregation pipeline
// Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// Group books by publication decade and count
db.books.aggregate([
  {
    $group: {
      _id: {
        $concat: [
          { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },
          "s"
        ]
      },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);

// Question4 text search
// Create index on title for faster search
db.books.createIndex({ title: 1 });

// Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

// Use explain() to show performance improvement
// Without index
db.books.find({ title: "1984" }).explain("executionStats");

// After creating index
db.books.find({ title: "1984" }).explain("executionStats");



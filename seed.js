const connectDB = require("./config/db");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");

const users = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    password: "password123",
  },
  { name: "Bob Smith", email: "bob@example.com", password: "password123" },
  { name: "Carol Lee", email: "carol@example.com", password: "password123" },
];

const products = [
  {
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse",
    price: 24.99,
    stock: 100,
  },
  {
    name: "Bluetooth Keyboard",
    description: "Compact mechanical keyboard",
    price: 59.99,
    stock: 80,
  },
  {
    name: "USB-C Charger",
    description: "Fast charging adapter",
    price: 19.99,
    stock: 150,
  },
  {
    name: "Noise Cancelling Headphones",
    description: "Over-ear headphones with ANC",
    price: 129.99,
    stock: 40,
  },
  {
    name: "Laptop Stand",
    description: "Adjustable aluminum laptop stand",
    price: 34.99,
    stock: 60,
  },
];

const seedData = async () => {
  try {
    await connectDB();

    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);
    const createdProducts = await Product.insertMany(products);

    const orders = [
      {
        user: createdUsers[0]._id,
        items: [
          { product: createdProducts[0]._id, quantity: 2 },
          { product: createdProducts[2]._id, quantity: 1 },
        ],
        totalPrice: 24.99 * 2 + 19.99,
        status: "confirmed",
      },
      {
        user: createdUsers[1]._id,
        items: [
          { product: createdProducts[1]._id, quantity: 1 },
          { product: createdProducts[4]._id, quantity: 1 },
        ],
        totalPrice: 59.99 + 34.99,
        status: "pending",
      },
      {
        user: createdUsers[2]._id,
        items: [{ product: createdProducts[3]._id, quantity: 1 }],
        totalPrice: 129.99,
        status: "shipped",
      },
    ];

    await Order.insertMany(orders);

    console.log("Seed data inserted successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();

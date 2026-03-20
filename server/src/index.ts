import express from "express";
import foodsRouter from "./routes/foods.router";
import categoryRouter from "./routes/categories.router";
import usersRouter from "./routes/users.router";
import orderRouter from "./routes/orders.router";
import loginRouter from "./routes/login.router";

const app = express();
app.use(express.json());

app.use("/foods", foodsRouter);
app.use("/categories", categoryRouter);
app.use("/users", usersRouter);
app.use("/users:id", usersRouter);
app.use("/orders", orderRouter);
app.use("/orders:id", usersRouter);
app.use("/login", loginRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

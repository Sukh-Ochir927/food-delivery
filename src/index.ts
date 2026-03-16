import express from "express";
import foodsRouter from "./routes/foods.router";
import categoryRouter from "./routes/categories.router";
import usersRouter from "./routes/users.router";

const app = express();
app.use(express.json());

app.use("/foods", foodsRouter);
app.use("/categories", categoryRouter);
app.use("/users", usersRouter);
app.use("/users:id", usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

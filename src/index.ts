import express from "express";
import mongoose from "mongoose";
import { router } from "./router";
import path from "node:path";

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    const port = 5001;
    const app = express();
    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );
    app.use(express.json());
    app.use(router);
    app.listen(port, () => console.log(`abriu na http://localhost:${port}`));
  })
  .catch(() => console.log("erro"));

import express from "express";
import ReadingControllers from "./controllers/index.js";

const router = express.Router();

for (const modelName in ReadingControllers) {
  const controller = ReadingControllers[modelName];
  const basePath = `/${modelName.toLowerCase()}`;

  router.get(`${basePath}`, controller.getAll);
  router.get(`${basePath}/search`, controller.search);
  router.get(`${basePath}/:id`, controller.getOne);
  router.post(`${basePath}`, controller.create);
  router.put(`${basePath}/:id`, controller.update);
  router.delete(`${basePath}/:id`, controller.deleteOne);
}

export default router;

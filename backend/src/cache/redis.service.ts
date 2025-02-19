import { Request, Response } from "express";
import Redis from "ioredis";
import { AppDataSource } from "../data_source";
import { Products } from "../entities/Products";
import { config } from "../config/config";

const redis = new Redis(config.redisUrl);

export const getProducts = async (req: Request, res: Response) => {
  try {
    const cachedProducts = await redis.get("products");
    if (cachedProducts) {
      return res.json(JSON.parse(cachedProducts));
    }

    const products = await AppDataSource.getRepository(Products).find();

    await redis.set("products", JSON.stringify(products), "EX", 3600);

    return res.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
};

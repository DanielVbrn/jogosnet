import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data_source";
import routes from "./routes";
import cors from "cors";
import { setupSwagger } from "./swagger";

const app = express();

AppDataSource.initialize()
  .then(() => console.log("📦 Banco de dados conectado com sucesso!"))
  .catch((error) => console.error("Erro ao conectar ao banco de dados:", error));

const corsOptions = {
  origin: ["https://front-chi-six.vercel.app", "https://backend-jogosnet.onrender.com"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json()); // Usa o próprio Express para JSON

app.use(routes);

setupSwagger(app);


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

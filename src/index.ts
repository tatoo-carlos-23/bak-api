import "dotenv/config";
import app from "./app";

const PORT = Number(process.env.PORT) || 3001;

const startServer = async () => {
  console.warn("Iniciando servidor 🚀");
  try {
    app.listen(PORT, () => {
      console.log(`🚀 API ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();

import mongoose from "mongoose";
import chalk from "chalk";
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
console.log("DB DNS:", dns.getServers());

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    

    console.log(chalk.greenBright.bgCyanBright.bold("MongoDB Connected Successfully"));
  } catch (error) {
    console.log(chalk.red.bold("Database Connection Error:", error.message));
    process.exit(1);
  }
};
export default dbConnection;
    
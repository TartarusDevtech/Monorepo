import logger from "@hey/helpers/logger";
import "dotenv/config";

const startJobs = async () => {
  logger.info("Jobs are started...");

  while (true) {
    try {
      logger.info("Jobs are running...");
    } catch (error) {
      logger.error("Error during jobs:", error);
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
};

// Initialize jobs
startJobs();

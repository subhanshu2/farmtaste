import logger from "../../util/logger.util";
import { QueueService } from "@devslane/queue-service-node";
import * as Bull from "bull";
import { APP_IDENTIFIER, ENV_REDIS_HOST, ENV_REDIS_PASSWORD, ENV_REDIS_PORT } from "../../util/secrets.util";

class QueueFactory {
  private constructor() {
    logger.silly(["N-AEC QueueFactory getInstance()"]);
  }

  static getInstance(): QueueService {
    const redisConfig: Bull.QueueOptions = {
      redis: {
        host    : ENV_REDIS_HOST,
        port    : +ENV_REDIS_PORT,
        password: ENV_REDIS_PASSWORD
      }
    };
    return QueueService.init(redisConfig, {
      appIdentifier: APP_IDENTIFIER,
      processCount : 1
    });
  }
}

export const queueService = QueueFactory.getInstance();


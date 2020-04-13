// import { BaseJob } from "./base.job";
// import logger from "../util/logger.util";
//
// export class TestJob extends BaseJob {
//     private count: number;
//
//     private constructor() {
//         super();
//     }
//
//     static init(count: number): TestJob {
//         const testJob = new TestJob();
//
//         testJob.count = count;
//         return testJob;
//     }
//
//     async handle(): Promise<any> {
//         logger.debug(`[Job] was executed with count: ${this.count}`);
//         return undefined;
//     }
// }
import { JobAbstract } from "@devslane/queue-service-node";

export abstract class BaseJob extends JobAbstract {
    public classPath: string;

    constructor() {
        super();
        this.classPath = __dirname;
    }
}
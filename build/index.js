"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moleculer_1 = require("moleculer");
const ApiService = tslib_1.__importStar(require("moleculer-web"));
const ConfigHelper = tslib_1.__importStar(require("platformsh-config"));
// I'll set the rest of this up later once I know what I'm doing
const broker = new moleculer_1.ServiceBroker();
const config = ConfigHelper.config();
class TestServerApiService extends moleculer_1.Service {
    constructor(broker) {
        super(broker);
        this.parseServiceSchema({
            name: "test",
            mixins: [ApiService],
            settings: {
                port: config.port || 3000,
                routes: [{
                        path: "/"
                    }]
            },
            actions: {
                echo: {
                    name: "echo",
                    async handler(ctx) {
                        return ctx;
                    }
                }
            }
        });
    }
}
broker.createService(TestServerApiService);
broker.start();

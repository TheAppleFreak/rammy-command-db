import { ServiceBroker, Service, Context } from "moleculer";
import * as ApiService from "moleculer-web";
import * as ConfigHelper from "platformsh-config";

// I'll set the rest of this up later once I know what I'm doing

const broker = new ServiceBroker();
const config = ConfigHelper.config();

class TestServerApiService extends Service {
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
                    async handler (ctx: Context) {
                        return ctx;
                    }
                }
            }
        })
    }
}

broker.createService(TestServerApiService);

broker.start();
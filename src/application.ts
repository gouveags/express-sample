import express, { Application, Handler } from "express";
import { CepController } from "./infra/controllers/http/cep.controller";
import { IRouter } from "./decorators/http/handlers.decorator";
import { MetadataKeys } from "./decorators/http/metadata.keys";

export const controllers: any[] = [CepController];

export class App {
  private readonly instance: Application;
  constructor() {
    this.instance = express();
    this.registerRouters();
  }

  async listen(port: string | number, callback: () => void) {
    this.instance.listen(port, callback);
  }

  private registerRouters() {
    const info: Array<{ api: string; handler: string }> = [];
    controllers.forEach((controllerClass) => {
      const controller: { [handleName: string]: Handler } =
        new controllerClass() as any;
      const basePath: string = Reflect.getMetadata(
        MetadataKeys.BASE_PATH,
        controllerClass
      );
      console.log({ basePath });
      const routers: IRouter[] = Reflect.getMetadata(
        MetadataKeys.ROUTERS,
        controllerClass
      );

      const exRouter = express.Router();

      routers.forEach(({ method, path, handlerName }) => {
        exRouter[method](
          path,
          controller[String(handlerName)].bind(controller)
        );

        info.push({
          api: `${method.toLocaleUpperCase()} ${basePath + path}`,
          handler: `${controllerClass.name}.${String(handlerName)}`,
        });
      });

      this.instance.use(basePath, exRouter);
    });
    console.table(info);
  }
}

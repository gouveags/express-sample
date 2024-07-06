import { MetadataKeys } from "./metadata.keys";

export const Controller = (basePath = ""): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target);
  };
};

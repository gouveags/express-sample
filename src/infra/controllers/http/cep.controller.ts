import { Request, Response } from "express";
import { GetAddressByCepUseCase } from "../../../core/use-cases/get-address-by-cep.use-case";
import { Get } from "../../../decorators/http/handlers.decorator";
import { Controller } from "../../../decorators/http/controller.decorator";
import { CepService } from "../../service/cep.service";

@Controller("/cep")
export class CepController {
  constructor() {} // private readonly getAddressByCepUseCase: GetAddressByCepUseCase

  @Get("/:cep")
  async getAddressByCep(req: Request, res: Response) {
    const cepService = new CepService();
    const getAddressByCepUseCase = new GetAddressByCepUseCase(cepService);
    const { cep } = req.params;
    // const address = { teste: "teste" };
    const address = await getAddressByCepUseCase.exec(cep);
    res.json(address);
  }
}

// localhost:3000/:cep

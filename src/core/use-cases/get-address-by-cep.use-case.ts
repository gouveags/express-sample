import { injectable, singleton } from "tsyringe";
import { ICepService, Address } from "../abstraction/cep-service.interface";
import { CepService } from "../../infra/service/cep.service";

@injectable()
@singleton()
export class GetAddressByCepUseCase {
  constructor(private readonly cepService: CepService) {}

  async exec(cep: string): Promise<Address> {
    const address = await this.cepService.getAddressByCep(cep);
    return address;
  }
}

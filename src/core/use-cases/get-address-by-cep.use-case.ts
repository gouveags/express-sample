import { ICepService, Address } from "../abstraction/cep-service.interface";

export class GetAddressByCepUseCase {
  constructor(private readonly cepService: ICepService) {}

  async exec(cep: string): Promise<Address> {
    const address = await  this.cepService.getAddressByCep(cep);
    return address;
  }
}
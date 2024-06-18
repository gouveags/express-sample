import {
  ICepService,
  Address,
} from '../../core/abstraction/cep-service.interface';

export class CepService implements ICepService {
  private baseUrl = 'viacep.com.br/ws';

  private formats = {
    json: 'json',
    xml: 'xml',
  };

  // private cep = "22715370";

  async getAddressByCep(cep: String): Promise<Address> {
    return await fetch(`https://${this.baseUrl}/${cep}/${this.formats.json}`, {
      method: 'get',
    }).then((res) => res.json());
  }
}

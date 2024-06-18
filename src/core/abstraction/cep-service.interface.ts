
// Add to a Model
export type Address = {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
};

export interface ICepService {
  getAddressByCep(cep: string): Promise<Address>;
}
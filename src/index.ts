import express, { Response, Request } from 'express';
import { CepService } from './infra/service/cep.service';
import { GetAddressByCepUseCase } from './core/use-cases/get-address-by-cep.use-case';

const cepService = new CepService();
const getAddressByCepUseCase = new GetAddressByCepUseCase(cepService)

const app = express();
const PORT = 3000;

app.get('/cep', async (_req: Request, res: Response) => {
  const response = await getAddressByCepUseCase.exec("22715370");
  res.send(response);
});

app.get("/cep/:cep", async (req, res) => {
  const params = req.params;
  const response = await getAddressByCepUseCase.exec(params.cep);
  res.json(response );
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
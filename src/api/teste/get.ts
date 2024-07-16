import { BaseService, IBaseService } from "#/BaseService/BaseService";
import { HttpException } from "#/exceptions";
import { HTTP } from "#/helpers";
import { validateMissingParam } from "#/helpers/validators";

export class TesteService extends BaseService implements IBaseService {
  public async exec(req: HTTP.Req<void, void, { company: string }>) {
    const transaction = await this.database.beginTransaction()
    try {
      validateMissingParam(req.query, ['company'])

      const { company } = req.query
  
      const top1 =  await this.queryExecutor.one({
        query: 'select TOP 1 * from {SA1} where A1_FILIAL = @paramFilial;',
        tableKeys: { SA1: company },
        params: [{ name: 'paramFilial', type: 'VarChar', value: '' }]
      })
  
      await transaction.commit()
  
      req.sendResponse({
        status: 200,
        message: '',
        data: { bla: top1 }      
      })
    } catch (error) {
      await transaction.rollback()
      throw new HttpException(400, 'Ocorreu um erro ao ')
    }
  }
}

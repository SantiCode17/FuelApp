import { ProvinceResponse, Province } from "../interfaces";

export class ProvinceMapper {
  static fromResponse(response: ProvinceResponse): Province {
    return {
      id: response.idProvincia,
      name: response.nombreProvincia,
    };
  }

  static fromResponseList(responses: ProvinceResponse[]): Province[] {
    return responses.map(ProvinceMapper.fromResponse);
  }
}

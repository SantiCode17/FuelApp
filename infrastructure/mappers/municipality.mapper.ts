import { MunicipalityResponse, Municipality } from "../interfaces";

export class MunicipalityMapper {
  static fromResponse(response: MunicipalityResponse): Municipality {
    return {
      id: response.idMunicipio,
      name: response.nombreMunicipio,
      provinceId: response.idProvincia,
    };
  }

  static fromResponseList(responses: MunicipalityResponse[]): Municipality[] {
    return responses.map(MunicipalityMapper.fromResponse);
  }
}

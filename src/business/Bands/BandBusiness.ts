import { BandDatabase } from "../../data/BandDatabase";
import { Band, BandInput } from "../../model/Band";
import Authenticator from "../../services/Authenticator";
import IdGenerator from "../../services/IdGenerator";

export default class BandBusiness {
  constructor(
    private bandDatabase: BandDatabase,
    private authenticator: Authenticator,
    private idGeneratator: IdGenerator
  ) {}

  public bandRegister = async (band: BandInput, token: string) => {
    try {
      const handleId: string = "";
      const { name, genre, responsible } = band;
      if (!name || !genre || !responsible) {
        throw new Error(
          "Insira corretamente os campos 'name', 'genre' and 'responsible'"
        );
      }
      if (!token) {
        throw new Error("Coloque um token através do headers");
      }
      const tokenData = this.authenticator.getData(token);

      if (!tokenData) {
        throw new Error("Token Inválido");
      }
      if (tokenData.role !== "ADMIN") {
        throw new Error("Você não tem permissão para essa execução");
      }
      const bandExists = await this.bandDatabase.getBandByName(name);
      if (bandExists) {
        throw new Error("A banda já está cadastrada");
      }

      const id = this.idGeneratator.generate();

      const newBand = new Band(id, name, genre, responsible);

      await this.bandDatabase.createBand(newBand);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  public getBand = async (token: string, name: string, id: string) => {
    try {
      if (!token) {
        throw new Error("Coloque um token através do headers");
      }
      const tokenData = this.authenticator.getData(token);

      if (!tokenData) {
        throw new Error("Token invalid");
      }

      const band = await this.bandDatabase.getBandByName(name);

      if (!band) {
        throw new Error("Essa banda ainda não está cadastrada");
      }

      return band;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}

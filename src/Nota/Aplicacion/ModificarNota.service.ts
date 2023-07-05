/* eslint-disable prettier/prettier */
import { IAplicationService } from "src/core/domain/appService/IAplicationService";
import { Nota } from "../Dominio/AgregadoNota";
import { Inject } from "@nestjs/common";
import { Either } from "src/Utils/Either";
import { RepositorioNota } from "../Dominio/RepositorioNota";
import { ModificarNotaDto } from "./dto/ModificarNota.dto";
import { VOImagen } from "../Dominio/Entidades/VOImagen";
import { EstadoEnum } from "../Dominio/ValueObjectsNota/EstadoEnum";
import { Optional } from "src/Utils/Opcional";


export class ModificarNotaService implements IAplicationService<ModificarNotaDto,string>{

    private readonly repositorioNota: RepositorioNota;

    constructor (
        @Inject('RepositorioNota')
        repositorioNota: RepositorioNota){
        
        this.repositorioNota = repositorioNota;
    }

    async execute(s: ModificarNotaDto): Promise<Either<string,Error>> {      
        
      const estado = EstadoEnum.GUARDADO;

      let im;

      let contenido = new Optional<any>();
      if (s.contenido) {
        contenido = new Optional<any>(JSON.parse(s.contenido));
        //si hacemos un multipart el contenido se mandan como un string y hay que parsearlo
        //a pesar de ser inestable, es la unica forma de mandar un array de objetos distintos
        //pido disculpas
      }

      if (s.imagenes) {
        im = s.imagenes.map((i) => {
          return VOImagen.crearImagenNota(i.nombre, i.buffer);
        });
      }

      const opLatitud = new Optional<number>(s.latitud);
      const opLongitud = new Optional<number>(s.longitud);

      const nota = Nota.crearNota( //factory agregado
        s.titulo,
        s.fechaCreacion,
        estado,
        s.grupo,
        opLatitud,
        opLongitud,
        contenido,
      );


        return await this.repositorioNota.updateNota(nota);
    }
}
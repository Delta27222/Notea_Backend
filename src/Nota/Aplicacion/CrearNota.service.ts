/* eslint-disable prettier/prettier */
import { Inject } from '@nestjs/common';
import { IAplicationService } from 'src/core/domain/appService/IAplicationService';
import { CrearNotaDto } from './dto/CrearNota.dto';
import { Either } from 'src/Utils/Either';
import { Nota } from '../Dominio/AgregadoNota';
import { RepositorioNota } from '../Dominio/RepositorioNota';
import { EstadoEnum } from '../Dominio/ValueObjectsNota/EstadoEnum';
import { Optional } from 'src/Utils/Opcional';
import { VOImagen } from '../Dominio/Entidades/VOImagen';

export class CrearNotaService implements IAplicationService<CrearNotaDto, Nota> {

  private readonly repositorioNota: RepositorioNota;
  constructor(
    @Inject('RepositorioNota') 
    repositorioNota: RepositorioNota) {
    this.repositorioNota = repositorioNota;
  }

  async execute(s: CrearNotaDto): Promise<Either<Nota, Error>> {

    const estado = EstadoEnum.GUARDADO;
    
    let contenido = new Optional<any>();
    if (s.contenido){
      const auxcontenido = JSON.stringify(s.contenido);
      contenido = new Optional<any>(JSON.parse(auxcontenido)); 
      //si hacemos un multipart el contenido se mandan como un string y hay que parsearlo
      //a pesar de ser inestable, es la unica forma de mandar un array de objetos distintos
      //pido disculpas
    }
    
    //let im;
    // if (s.imagenes) {
    //   im = s.imagenes.map((i) => {
    //   return VOImagen.crearImagenNota(i.nombre, i.buffer); 
    //   });
    // }

    const opLatitud = new Optional<number>(s.latitud);
    const opLongitud = new Optional<number>(s.longitud);

    const nota =  Nota.crearNota( //factory agregado
      s.titulo,
      s.fechaCreacion,
      estado,
      s.grupo,
      opLatitud,
      opLongitud,
      contenido,
    );

    const notacreada = await this.repositorioNota.crearNota(nota);
    // if (notacreada.isLeft()) {
    //  await this.repositorioNota.guardarImagenes(nota.getId(), im);
    // }

    return notacreada;

  }

}


/* eslint-disable prettier/prettier */
import { IAplicationService } from "src/core/domain/appService/IAplicationService";
import { Nota } from "../dominio/AgregadoNota";
import { Injectable, Inject } from "@nestjs/common";
import { Usuario } from "src/Usuario/Dominio/Usuario";
import { UsuarioRepository } from "src/Usuario/Dominio/usuario.repository";
import { UsuarioRepositoryImpl } from "src/Usuario/Infraestructura/repository/usuarioRepositoryImpl";
import { Either } from "src/utils/either";
import { RepositorioNota } from "../Dominio/RepositorioNota";
import { RepositorioNotaImp } from "../Infraestructura/repository/RepositorioNotaImp";

@Injectable()
export class getAllNotasService implements IAplicationService<null, Iterable<Nota>>{

    private readonly repositorioNota: RepositorioNota;

    constructor (
        @Inject(RepositorioNotaImp)
        repositorioNota: RepositorioNota){
        
        this.repositorioNota = repositorioNota;
    }

    async execute(s: null): Promise<Either<Iterable<Nota>, Error>> {        
        return await this.repositorioNota.buscarNotas();
    }
}
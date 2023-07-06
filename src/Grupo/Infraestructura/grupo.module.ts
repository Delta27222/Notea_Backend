import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntidadGrupo } from './entities/EntidadGrupo';
import { RepositorioGrupoImp } from './repository/RepositorioGrupoImpl';
import { CrearGrupoService } from '../Aplicacion/crearGrupoService';
import { GrupoController } from './controllers/grupoController';
import { buscarGruposService } from '../Aplicacion/buscarGruposService';
import { eliminarGrupoService } from '../Aplicacion/eliminarGrupoService';
import { buscarGruposDeUsuarioService } from '../Aplicacion/buscarGruposDeUsuarioService';
import { EditarGrupoService } from '../Aplicacion/editarGrupoService';
import { buscarGrupoPorIdService } from '../Aplicacion/buscarGrupoPorIdService';
import { DecoratorModule } from 'src/Decorators/Infraestructura/decorator.module';
import { ILoggerImplementation } from 'src/Decorators/Infraestructura/ILoggerImplementation';
import { EntidadUsuario } from 'src/Usuario/Infraestructura/entities/EntidadUsuario';

@Module({
  imports: [TypeOrmModule.forFeature([EntidadGrupo]),TypeOrmModule.forFeature([EntidadUsuario]),forwardRef(() => DecoratorModule)],
  controllers: [GrupoController],
  providers: [
    //RepositorioUsuarioImp,
    CrearGrupoService,
    buscarGruposService,
    eliminarGrupoService,
    buscarGruposDeUsuarioService,
    EditarGrupoService,
    buscarGrupoPorIdService,
    RepositorioGrupoImp,
    ILoggerImplementation,
    {
      provide: 'RepositorioGrupo',
      useClass: RepositorioGrupoImp,
    },
  ],
})
export class GrupoModule {}

import { Usuario } from './usuario.model'
export class Hospital {
  constructor(
    public nombre: string,
    public usuario: Usuario | String,
    public img?: string,
    public _id?: string
  ) {}
}

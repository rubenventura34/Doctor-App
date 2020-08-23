export interface Paciente {
	id: number,
	dui: string,
	nombres: string,
	apellidos: string,
	genero: string,
	telefono?: number,
    nacionalidad: string,
    direccion: string,
    estado_civil: string,
    fecha_nacimiento: string,
    api_token: string,
    municipio_id: number,
    created_at: string,
    updated_at: string,
    municipio: {
      id: number,
      nombre: string,
      departamento_id: number,
      created_at: string,
      updated_at: string
    }
}

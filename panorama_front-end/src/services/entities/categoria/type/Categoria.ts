export interface Categoria{
  id: number;
  nome: string;
  descricao: string | null;
  imgCapaCategoria: string;
}



export interface CategoriaReponse {
  dados: Categoria[]
}
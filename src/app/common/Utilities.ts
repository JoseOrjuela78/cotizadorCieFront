export class Utilities{
  public calcularCantidadPaginas(registrosXPagina: number, totalregistros: number): Array<number>{
    const cantidad = Math.ceil(totalregistros / registrosXPagina);
    const paginas = [];
  for(let i = 1; i <= cantidad; i++){
    paginas.push(i);
  };

  return paginas;

  };
}

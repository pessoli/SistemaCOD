export interface DespesaModel {
  id: number;
  observacao: string;
  data: Date;
  valor: number;
  idUsuario: number;
  idTipoDespesa: number;
  tipoDespesaNome: string;
}

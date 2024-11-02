export interface FinanciamentoModel {
  id: number;
  conta: string;
  totalParcelas: number;
  parcelasRestantes: number;
  parcelasPagas: number;
  valorParcela: number;
  valorTotal: number;
  valorRestante: number;
  valorPago: number;
  ativo: boolean;
  idUsuario: number;
}

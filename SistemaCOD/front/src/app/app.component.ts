import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PrimeNGConfig} from "primeng/api";
import {DicaFinanceiraModel} from "./components/dica-financeira/dicaFinanceira.model";
import {DicaFinanceiraService} from "./services/dica-financeira/dica-financeira.service";
import {concatMap, delay, EMPTY, from, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  novasDicas: DicaFinanceiraModel[] = [
    { id: 0, titulo: '5 DICAS PARA TODO POBRE SEGUIR E TER SUCESSO FINANCEIRO I DICAS DO PRIMO POBRE #Mepoupe89', linkVideo: 'https://www.youtube.com/watch?v=XpR6EAVxGMg&pp=ygUPZGljYSBmaW5hbmNlaXJh', ativo: true },
    { id: 0, titulo: 'COMO ORGANIZAR SUAS FINANÇAS E GUARDAR DINHEIRO | Planejamento financeiro FÁCIL', linkVideo: 'https://www.youtube.com/watch?v=in0XbfQEm2A&pp=ygUPZGljYSBmaW5hbmNlaXJh', ativo: true },
    { id: 0, titulo: 'Encontrar o EQUILÍBRIO FINANCEIRO | A Mentalidade das Finanças Pessoais', linkVideo: 'https://www.youtube.com/watch?v=Ep65y-eQxgE&pp=ygUPZGljYSBmaW5hbmNlaXJh', ativo: true },
    { id: 0, titulo: '10 Dicas Rápidas p/ Uma Vida Financeira Mais Estável', linkVideo: 'https://www.youtube.com/watch?v=ANX7kQAXpmk&pp=ygUPZGljYSBmaW5hbmNlaXJh', ativo: true },
    { id: 0, titulo: 'Planejamento financeiro para quem ganha pouco: TOP 6 dicas para quem tem salário baixo', linkVideo: 'https://www.youtube.com/watch?v=AsU7zPTvwlo&pp=ygUPZGljYSBmaW5hbmNlaXJh', ativo: true },
    { id: 0, titulo: '50 x 30 x 20 - TÉCNICA SIMPLES E PODEROSA PARA INVESTIR DINHEIRO! Revelei o meu segredo!', linkVideo: 'https://www.youtube.com/watch?v=GjLQnuREjlY&pp=ygUPZGljYSBmaW5hbmNlaXJh', ativo: true },
    { id: 0, titulo: 'Aula Completa sobre EDUCAÇÃO FINANCEIRA (Tudo que você precisa saber sobre COMO USAR SEU DINHEIRO!)', linkVideo: 'https://www.youtube.com/watch?v=dunfejH4Q9o&pp=ygUPZGljYSBmaW5hbmNlaXJh', ativo: true },
    { id: 0, titulo: 'DICAS FINANCEIRAS que mudarão SUA MENTE! (Educação Financeira, Dívidas, Pé-de-Meia) - PRIMO POBRE', linkVideo: 'https://www.youtube.com/watch?v=50tCu7gGN-Q&pp=ygUPZGljYSBmaW5hbmNlaXJh', ativo: true },
    { id: 0, titulo: 'COMO CONSEGUIR SAIR DAS DÍVIDAS E GUARDAR DINHEIRO | PRIMO POBRE', linkVideo: 'https://www.youtube.com/watch?v=e8t_3EUzj84&pp=ygUPZGljYSBmaW5hbmNlaXJh', ativo: true },
    { id: 0, titulo: '6 Coisas Que Você Deve Fazer p/ MELHORAR A VIDA FINANCEIRA EM 2024', linkVideo: 'https://www.youtube.com/watch?v=0q-MAxta-d0&pp=ygUPZGljYSBmaW5hbmNlaXJh', ativo: true },
    { id: 0, titulo: 'Como ADMINISTRAR e ORGANIZAR o Dinheiro (Métodos de Livros de Finanças)', linkVideo: 'https://www.youtube.com/watch?v=V7z5bC4GOQI&pp=ygUPZGljYSBmaW5hbmNlaXJh', ativo: true },
    { id: 0, titulo: '3 DICAS INFALÍVEIS PARA MUDAR SUA VIDA FINANCEIRA | Comece agora!', linkVideo: 'https://www.youtube.com/watch?v=C4PvwgorwJY&pp=ygUPZGljYSBmaW5hbmNlaXJh', ativo: true },
    { id: 0, titulo: 'MÉTODO N.A PRA QUEM GANHA POUCO DINHEIRO! Planejamento financeiro FÁCIL!', linkVideo: 'https://www.youtube.com/watch?v=dSLhykOui3Y&pp=ygUPZGljYSBmaW5hbmNlaXJh', ativo: true },
    { id: 0, titulo: 'Educação Financeira Básica: A REGRA DOS 3 FATORES', linkVideo: 'https://www.youtube.com/watch?v=HSXcvFVtsdM&pp=ygUVZWR1Y2HDp8OjbyBmaW5hbmNlaXJh', ativo: true },
    { id: 0, titulo: 'Os 6 Pilares da Educação Financeira – Como Prosperar Mesmo Ganhando Pouco', linkVideo: 'https://www.youtube.com/watch?v=_c7STNa_WUY&pp=ygUVZWR1Y2HDp8OjbyBmaW5hbmNlaXJh', ativo: true },
    { id: 0, titulo: '8 DICAS práticas para juntar R$10 mil. Eu não perderia a 8 de jeito nenhum!', linkVideo: 'https://www.youtube.com/watch?v=zBTrnTQleLQ&pp=ygUVZWR1Y2HDp8OjbyBmaW5hbmNlaXJh', ativo: true },
    { id: 0, titulo: 'TESOURO DIRETO SIMPLIFICADO 2024: 6 passos pra investir TODO MÊS', linkVideo: 'https://www.youtube.com/watch?v=KK-GmGMcWfQ', ativo: true },
    // Adicione mais dicas conforme necessário
  ];

  imagens: File[] = [];

  // Caminhos das imagens em `assets`
  private caminhosDasImagens = [
    'assets/dica-financeira/img.png',
    'assets/dica-financeira/img_1.png',
    'assets/dica-financeira/img_2.png',
    'assets/dica-financeira/img_3.png',
    'assets/dica-financeira/img_4.png',
    'assets/dica-financeira/img_5.png',
    'assets/dica-financeira/img_6.png',
    'assets/dica-financeira/img_7.png',
    'assets/dica-financeira/img_8.png',
    'assets/dica-financeira/img_9.png',
    'assets/dica-financeira/img_10.png',
    'assets/dica-financeira/img_11.png',
    'assets/dica-financeira/img_12.png',
    'assets/dica-financeira/img_13.png',
    'assets/dica-financeira/img_14.png',
    'assets/dica-financeira/img_15.png',
    'assets/dica-financeira/img_16.png',
    // Adicione mais caminhos conforme necessário
  ];

  constructor(
    private http: HttpClient,
    private config: PrimeNGConfig,
    private dicaFinanceiraService: DicaFinanceiraService) {}

  ngOnInit() {

    this.config.setTranslation({
      apply: 'Aplicar',
      clear: 'Limpar',
      accept: 'Sim',
      reject: 'Não',
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje'
    });

    this.carregarImagens(); // Carregar imagens antes de enviar as dicas
  }

  carregarImagens(): void {
    const imageRequests = this.caminhosDasImagens.map((caminho, index) =>
      this.http.get(caminho, { responseType: 'blob' }).pipe(
        tap(blob => {
          const nomeArquivo = caminho.split('/').pop()?.split('?')[0] || `imagem${index + 1}.jpg`; // Nome do arquivo
          const arquivo = new File([blob], nomeArquivo, { type: blob.type });
          this.imagens.push(arquivo); // Adiciona ao array `imagens`
        })
      )
    );

    // Quando todas as imagens forem carregadas, envia as dicas
    from(imageRequests)
      .pipe(
        concatMap(request => request), // Espera cada requisição de imagem ser concluída
        tap(() => {
          if (this.imagens.length === this.caminhosDasImagens.length) {
            this.enviarDicasEmLote(); // Agora que as imagens estão carregadas, envia as dicas
          }
        })
      )
      .subscribe({
        complete: () => console.log('Imagens carregadas e dicas enviadas!'),
        error: (err) => console.error('Erro ao carregar imagens:', err)
      });
  }

  enviarDicasEmLote(): void {
    from(this.novasDicas)
      .pipe(
        concatMap((dica, index) => {
          // Verificar se a dica já existe no banco antes de salvar
          return this.dicaFinanceiraService.verificarDicaExistente(dica.linkVideo).pipe(
            concatMap(existe => {
              console.log(existe)
              if (!existe) {
                // Se a dica não existir, enviar para salvar
                return this.dicaFinanceiraService.salvarDica(dica, this.imagens[index]).pipe(
                  tap(() => console.log(`Dica "${dica.titulo}" salva com sucesso!`)),
                  delay(200) // Pequeno atraso para evitar sobrecarga
                );
              } else {
                console.log(`Dica "${dica.titulo}" já existe no banco.`);
                return EMPTY; // Retorna um Observable vazio para não enviar novamente
              }
            })
          );
        })
      )
      .subscribe({
        complete: () => console.log('Todas as dicas foram verificadas e salvas quando necessário!'),
        error: (err) => console.error('Erro ao salvar as dicas:', err)
      });
  }
}

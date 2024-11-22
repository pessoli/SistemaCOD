import {Component, OnInit} from '@angular/core';
import {MessagesModule} from "primeng/messages";
import {Message} from "primeng/api";
import {MessageSharedService} from "../../services/message/messageShared.service";
import {MenuModule} from "primeng/menu";
import {CurrencyPipe, DatePipe, NgClass, NgStyle} from "@angular/common";
import {ChartModule} from "primeng/chart";
import {TipoDespesaService} from "../../services/tipo-despesa/tipo-despesa.service";
import {SharedService} from "../../services/shared/shared.service";
import {tap} from "rxjs";
import {Button} from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        MessagesModule,
        MenuModule,
        NgStyle,
        NgClass,
        ChartModule,
        Button,
        ToolbarModule
    ],
  providers: [CurrencyPipe, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  messages!: Message[]
  data: any;
  options: any;

  dataSomaDespesa: any;
  optionsSomaDespesa: any;



  constructor(
    private messageService: MessageSharedService,
    private tipoDespesaService: TipoDespesaService,
    private sharedService: SharedService,
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe
  ) {
  }

  public ngOnInit() {
    this.messageService.currentMessage.subscribe(message => {
      this.messages = message as Message[]; // Recebe a mensagem do serviço
    });
    this.loadChartLimiteData();
    this.loadChartSomaData();
  }

  loadChartLimiteData(): void {
    const idUsuario = this.sharedService.getIdUsuario();

    this.tipoDespesaService.chartTipoDespesa(idUsuario as unknown as number).subscribe((chartData: any[]) => {
      const labels = chartData.map(d => d.tipoDespesa);
      const barData = chartData.map(d => d.somaDespesas);
      const lineData = chartData.map(d => d.limite);

      const barColors = chartData.map(d =>
        d.somaDespesas > d.limite ? 'rgb(255, 68, 43)' : 'rgb(105, 193, 121)'
      );

      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.data = {
        labels: labels,
        datasets: [
          {
            type: 'line',
            label: 'Limite (R$)',
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            data: lineData
          },
          {
            type: 'bar',
            label: 'Despesas (R$)',
            backgroundColor: barColors, // Aplica as cores dinâmicas
            data: barData,
            borderColor: 'white',
            borderWidth: 2
          }
        ]
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          },
          title: {
            display: true,
            text: 'Gráfico de Despesas vs Limites',
            color: textColor,
            font: {
              size: 16,
              weight: 'bold'
            },
            padding: {
              top: 10,
              bottom: 10
            },
            align: 'center'
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const value = context.raw; // Valor da data (raw)
                return this.currencyPipe.transform(value, 'BRL', 'symbol'); // Converte para R$
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          },
          y: {
            ticks: {
              color: textColorSecondary,
              callback: (value: any) => {
                return this.currencyPipe.transform(value, 'BRL', 'symbol'); // Formata o valor no eixo Y
              }
            },
            grid: {
              color: surfaceBorder
            }
          }
        }
      };
    });
  }

  loadChartSomaData() {
    const idUsuario = this.sharedService.getIdUsuario();

    this.tipoDespesaService.chartTipoDespesaSomaMes(idUsuario as unknown as number)
      .pipe(
        tap((chartData: any[]) => {
          const labels = Array.from(new Set(chartData.map(d => d.mesAno)));

          // Formatar as datas no formato desejado (MM/YYYY)
          const formattedLabels = labels.map(mesAno => {
            const [ano, mes] = mesAno.split('-');
            return this.datePipe.transform(`${mes}-01-${ano}`, 'MM/yyyy'); // Formata como 'MM/yyyy'
          });

          const tiposDespesa = Array.from(new Set(chartData.map(d => d.tipoDespesa)));
          const dataByTipoDespesa: { [key: string]: number[] } = {};

          tiposDespesa.forEach(tipo => {
            dataByTipoDespesa[tipo] = formattedLabels.map(mes => {
              const found = chartData.find(d => d.tipoDespesa === tipo && this.datePipe.transform(d.mesAno, 'MM/yyyy') === mes);
              return found ? found.somaDespesas : 0;
            });
          });

          const documentStyle = getComputedStyle(document.documentElement);
          const textColor = documentStyle.getPropertyValue('--text-color');
          const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
          const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

          // Definindo cores para as barras, uma cor por tipo de despesa
          const barColors = tiposDespesa.map((_, index) => {
            const colorPalette = [
              'rgba(75, 192, 192, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(255, 99, 132, 0.8)',
              'rgba(153, 102, 255, 0.8)'
            ];
            return colorPalette[index % colorPalette.length];
          });

          // Preparando o formato dos dados para o gráfico
          this.dataSomaDespesa = {
            labels: formattedLabels,
            datasets: tiposDespesa.map((tipo, index) => ({
              type: 'bar',
              label: tipo,
              backgroundColor: barColors[index],
              data: dataByTipoDespesa[tipo],
              borderColor: 'white',
              borderWidth: 2
            }))
          };

          // Definindo opções de configuração para o gráfico
          this.optionsSomaDespesa = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
              tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                  label: (context: any) => {
                    const value = context.raw;
                    return this.currencyPipe.transform(value, 'BRL', 'symbol'); // Exibindo valores em R$
                  }
                }
              },
              legend: {
                labels: {
                  color: textColor
                }
              },
              title: {
                display: true,
                text: 'Gráfico de Soma de Despesas por Mês',
                color: textColor,
                font: {
                  size: 16,
                  weight: 'bold'
                },
                padding: {
                  top: 10,
                  bottom: 10
                },
                align: 'center'
              },
            },
            scales: {
              x: {
                stacked: true,
                ticks: {
                  color: textColorSecondary
                },
                grid: {
                  color: surfaceBorder,
                  drawBorder: false
                }
              },
              y: {
                stacked: true,
                ticks: {
                  color: textColorSecondary,
                  callback: (value: any) => {
                    return this.currencyPipe.transform(value, 'BRL', 'symbol'); // Exibindo valores em R$
                  }
                },
                grid: {
                  color: surfaceBorder,
                  drawBorder: false
                }
              }
            }
          };
        })
      )
      .subscribe();
  }



}

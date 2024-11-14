package com.example.SistemaCOD.service;


import com.example.SistemaCOD.model.Despesa;
import com.example.SistemaCOD.model.TipoDespesa;
import com.example.SistemaCOD.repository.DespesaRepository;
import com.example.SistemaCOD.repository.TipoDespesaRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class DespesaService {

    @Autowired
    public DespesaRepository despesaRepository;

    @Autowired
    public TipoDespesaRepository tipoDespesaRepository;

    public List<Despesa> buscarDespesaPorUsuarioId(Long idUsuario){
        return despesaRepository.findByDespesaPorUsuarioId(idUsuario);
    }

    public Despesa salvarDespesa(Despesa despesa) {
        return despesaRepository.save(despesa);
    }

    public Despesa atualizarDespesa(Despesa despesa) {
        Despesa novaDespesa = this.despesaRepository.findById(despesa.getId()).get();

        novaDespesa.setObservacao(despesa.getObservacao());
        novaDespesa.setValor(despesa.getValor());
        novaDespesa.setIdTipoDespesa(despesa.getIdTipoDespesa());

        return despesaRepository.save(novaDespesa);
    }

    public void deletarDespesa(Long id) {
        this.despesaRepository.deleteById(id);
    }

    public List<TipoDespesa> buscarTipoDespesaLimiteUltrapassado(Long idUsuario) {
        return this.despesaRepository.findTipoDespesaLimiteUltrapassado(idUsuario);
    }

    public Boolean isTipoDespesaLimiteUltrapassado(Long idTipoDespesa, double valor, Long idDespesa) {
        return this.tipoDespesaRepository.isTipoDespesaLimiteUltrapassado(idTipoDespesa, valor, idDespesa);
    }

    public List<Despesa> exportarDespesa(Long idUsuario, LocalDate dataInicio, LocalDate dataFim, List<Long> idTipoDespesa) {
        return despesaRepository.exportarDespesa(idUsuario, dataInicio, dataFim, idTipoDespesa);
    }

    public ByteArrayInputStream exportarRelatorioXlsx(List<Despesa> despesas) {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Despesas");

            // Criar a linha de título
            Row titleRow = sheet.createRow(0);  // Linha 0 para o título "Despesas"

            // Título "Despesas" na primeira célula da linha
            Cell titleCell = titleRow.createCell(0);
            titleCell.setCellValue("Despesas");

            // Estilo para o título: negrito e centralizado
            CellStyle titleStyle = workbook.createCellStyle();
            Font titleFont = workbook.createFont();
            titleFont.setBold(true);
            titleStyle.setFont(titleFont);
            titleStyle.setAlignment(HorizontalAlignment.CENTER);  // Alinhar ao centro
            titleStyle.setVerticalAlignment(VerticalAlignment.CENTER); // Alinhar verticalmente no meio

            // Mesclar todas as colunas (do 0 até 4, que é o número de colunas de dados)
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 4));

            // Aplicar o estilo ao título
            titleCell.setCellStyle(titleStyle);

            // Criar cabeçalhos
            Row headerRow = sheet.createRow(1);  // O cabeçalho vai para a linha 1

            // Definir estilo para o cabeçalho em negrito
            CellStyle headerStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);  // Deixar em negrito
            headerStyle.setFont(headerFont);

            // Criar as células de cabeçalho
            headerRow.createCell(0).setCellValue("ID");
            headerRow.createCell(1).setCellValue("Descrição");
            headerRow.createCell(2).setCellValue("Valor");
            headerRow.createCell(3).setCellValue("Tipo de Despesa");
            headerRow.createCell(4).setCellValue("Data");

            // Aplicar o estilo de negrito no cabeçalho
            for (int i = 0; i < 5; i++) {
                headerRow.getCell(i).setCellStyle(headerStyle);
            }

            // Preencher dados
            int rowIndex = 2;  // Começar a partir da linha 2 para os dados
            for (Despesa despesa : despesas) {
                Optional<TipoDespesa> tipoDespesaOpt = tipoDespesaRepository.findById(despesa.getIdTipoDespesa());
                String tipoDespesaName = tipoDespesaOpt.map(TipoDespesa::getTipoDespesa).orElse("Desconhecido");

                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
                String formattedDate = despesa.getData().format(formatter);

                Row row = sheet.createRow(rowIndex++);
                row.createCell(0).setCellValue(despesa.getId());
                row.createCell(1).setCellValue(despesa.getObservacao());

                // Formatar o valor para "R$" com 2 casas decimais
                Cell valorCell = row.createCell(2);
                valorCell.setCellValue(despesa.getValor());
                CellStyle valorStyle = workbook.createCellStyle();
                valorStyle.setDataFormat(workbook.createDataFormat().getFormat("R$ #,##0.00"));
                valorCell.setCellStyle(valorStyle);

                row.createCell(3).setCellValue(tipoDespesaName);  // Tipo de despesa
                row.createCell(4).setCellValue(formattedDate);  // Data formatada
            }

            // Adicionar a linha de "Valor Total"
            Row totalRow = sheet.createRow(rowIndex + 2);

            // "Valor Total" na célula A
            Cell valorTotalCell = totalRow.createCell(0);
            valorTotalCell.setCellValue("Valor Total");

            // Estilo em negrito para o valor total
            CellStyle boldStyle = workbook.createCellStyle();
            Font boldFont = workbook.createFont();
            boldFont.setBold(true);
            boldStyle.setFont(boldFont);

            // Aplica o estilo de negrito na célula de "Valor Total"
            valorTotalCell.setCellStyle(boldStyle);

            // Somar os valores
            double totalValor = despesas.stream().mapToDouble(Despesa::getValor).sum();

            // Mesclar as células B e C para o Valor Total
            sheet.addMergedRegion(new CellRangeAddress(rowIndex + 2, rowIndex + 2, 1, 2));

            // Exibir o valor total na célula B (mesclada com C)
            Cell totalValueCell = totalRow.createCell(1);
            totalValueCell.setCellValue("R$ " + String.format("%.2f", totalValor));
            totalValueCell.setCellStyle(boldStyle);  // Colocar em negrito

            // Ajustar a largura das colunas
            sheet.autoSizeColumn(0); // ID
            sheet.autoSizeColumn(1); // Descrição
            sheet.autoSizeColumn(2); // Valor
            sheet.autoSizeColumn(3); // Tipo de Despesa
            sheet.autoSizeColumn(4); // Data

            // Escrever o arquivo em um ByteArrayOutputStream
            try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
                workbook.write(out);
                byte[] bytes = out.toByteArray();
                return new ByteArrayInputStream(bytes);
            }
        } catch (IOException e) {
            throw new RuntimeException("Erro ao gerar arquivo XLSX", e);
        }
    }

    public ByteArrayInputStream exportarRelatorioPdf(List<Despesa> despesas) {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // Título do relatório
            com.itextpdf.text.Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14);
            Paragraph para = new Paragraph("Relatório de Despesas", font);
            para.setAlignment(Element.ALIGN_CENTER);
            document.add(para);
            document.add(new Paragraph(" ")); // Adiciona uma linha em branco

            // Criação da tabela com cabeçalhos
            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100);
            table.setWidths(new int[]{2, 4, 2, 4, 2});

            com.itextpdf.text.Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);

            PdfPCell hcell;
            hcell = new PdfPCell(new Phrase("ID", headFont));
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(hcell);

            hcell = new PdfPCell(new Phrase("DESCRIÇÃO", headFont));
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(hcell);

            hcell = new PdfPCell(new Phrase("Tipo de Despesa", headFont));
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(hcell);

            hcell = new PdfPCell(new Phrase("Valor", headFont));
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(hcell);

            hcell = new PdfPCell(new Phrase("Data", headFont));
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(hcell);

            // Preencher dados da tabela
            double valorTotal = 0.0;
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

            for (Despesa despesa : despesas) {
                TipoDespesa tipoDespesa = tipoDespesaRepository.findById(despesa.getIdTipoDespesa()).get();

                PdfPCell cell;

                cell = new PdfPCell(new Phrase(despesa.getId().toString()));
                cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(cell);

                cell = new PdfPCell(new Phrase(despesa.getObservacao()));
                cell.setPaddingLeft(5);
                cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                table.addCell(cell);

                cell = new PdfPCell(new Phrase(String.format("R$ %.2f", despesa.getValor())));
                cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                table.addCell(cell);

                cell = new PdfPCell(new Phrase(tipoDespesa.getTipoDespesa()));
                cell.setPaddingLeft(5);
                cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                cell.setHorizontalAlignment(Element.ALIGN_LEFT);
                table.addCell(cell);

                cell = new PdfPCell(new Phrase(despesa.getData().format(formatter))); // Data no formato dd/MM/yyyy
                cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(cell);

                valorTotal += despesa.getValor(); // Soma do valor total
            }

            // Adicionar o Valor Total
            PdfPCell totalLabelCell = new PdfPCell(new Phrase("Valor Total", headFont));
            totalLabelCell.setColspan(4);  // Mescla as 4 primeiras colunas
            totalLabelCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            totalLabelCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            table.addCell(totalLabelCell);

            PdfPCell totalValueCell = new PdfPCell(new Phrase(String.format("R$ %.2f", valorTotal)));
            totalValueCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            totalValueCell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            table.addCell(totalValueCell);

            document.add(table);
            document.close();

        } catch (DocumentException e) {
            throw new RuntimeException("Erro ao gerar arquivo PDF", e);
        }

        return new ByteArrayInputStream(out.toByteArray());
    }

}

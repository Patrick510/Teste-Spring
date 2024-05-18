package com.project.crud.user;

import org.springframework.stereotype.Service;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.html2pdf.resolver.font.DefaultFontProvider;
import com.itextpdf.kernel.events.PdfDocumentEvent;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;

import java.io.ByteArrayOutputStream;


@Service
public class documentGenerator {

    public byte[] convertHtmlToPdf(String processedHtml) {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            PdfWriter pdfWriter = new PdfWriter(outputStream);
            PdfDocument pdfDocument = new PdfDocument(pdfWriter);
            Document document = new Document(pdfDocument);
            
            DefaultFontProvider defaultFont = new DefaultFontProvider(false, true, false);

            pdfDocument.addEventHandler(PdfDocumentEvent.START_PAGE, new Header());
            pdfDocument.addEventHandler(PdfDocumentEvent.END_PAGE, new Footer());

            ConverterProperties converterProperties = new ConverterProperties();
            converterProperties.setFontProvider(defaultFont);
            HtmlConverter.convertToPdf(processedHtml, pdfDocument, converterProperties);

            document.close();

            return outputStream.toByteArray();
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }
}
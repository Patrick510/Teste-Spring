package com.project.crud.user;

import org.springframework.stereotype.Service;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.html2pdf.resolver.font.DefaultFontProvider;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.project.crud.javabeans.Programa;

import java.io.ByteArrayOutputStream;

@Service
public class documentGenerator {

	public byte[] convertHtmlToPdf(String processedHtml) {
		try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
			PdfWriter pdfWriter = new PdfWriter(outputStream);
			PdfDocument pdfDocument = new PdfDocument(pdfWriter);
			
			DefaultFontProvider defaultFont = new DefaultFontProvider(false, true, false);
			ConverterProperties converterProperties = new ConverterProperties();
			
			converterProperties.setFontProvider(defaultFont);
			
			HtmlConverter.convertToPdf(processedHtml, pdfDocument, converterProperties);

			return outputStream.toByteArray();
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	public byte[] generatePdf(Programa programa, String processedHtml) {
		try {
			return convertHtmlToPdf(processedHtml);
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
}

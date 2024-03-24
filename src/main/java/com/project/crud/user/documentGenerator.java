package com.project.crud.user;

import org.springframework.stereotype.Service;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.html2pdf.resolver.font.DefaultFontProvider;
import com.itextpdf.kernel.pdf.PdfWriter;

@Service
public class documentGenerator {
	
	public String htmltoPdf(String processedHtml) {
	    try {
	        String outputPath = "C:\\Users\\Patrick\\Downloads\\projeto.pdf";
	        PdfWriter pdfWriter = new PdfWriter(outputPath);
	        
	        DefaultFontProvider defaultFont = new DefaultFontProvider(false, true, false);
	        
	        ConverterProperties converterProperties = new ConverterProperties();
	        
	        converterProperties.setFontProvider(defaultFont);
	        
	        HtmlConverter.convertToPdf(processedHtml, pdfWriter, converterProperties);
	        
	        pdfWriter.close();
	        return outputPath;
	    } catch (Exception ex) {
	        ex.printStackTrace();
	        return null;
	    }
	}
}


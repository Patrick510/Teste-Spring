package com.project.crud.user;

import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.events.Event;
import com.itextpdf.kernel.events.IEventHandler;
import com.itextpdf.kernel.events.PdfDocumentEvent;
import com.itextpdf.kernel.pdf.canvas.PdfCanvas;
import com.itextpdf.kernel.pdf.xobject.PdfImageXObject;

public class Footer implements IEventHandler {

    @Override
    public void handleEvent(Event event) {
        PdfDocumentEvent docEvent = (PdfDocumentEvent) event;
        PdfCanvas canvas = new PdfCanvas(docEvent.getPage());

        try {
            // Carrega a imagem do cabeçalho
            String imagePath = "./src/main/resources/templates/rodape.png";
            PdfImageXObject image = new PdfImageXObject(ImageDataFactory.create(imagePath));
            
            // Define a largura e a altura desejadas da imagem manualmente
            float desiredWidth = 500; // largura em pixels
            
            // Adiciona a imagem ao cabeçalho com as dimensões ajustadas
            canvas.addXObject(image, 46, 20, desiredWidth);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
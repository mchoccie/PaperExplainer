import {React, useState} from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import { useLocation } from 'react-router-dom';
import './pdfViewer.css';
import samplePDF from './BERT.pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


const PDFViewer = () => {
  
  const location = useLocation();
  const receivedData = location.state.file;
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      console.log('Selected text:', selection.toString());
    }
  };

  return (

      <Document
        file={receivedData}
        // options={{ workerSrc: "/pdf.worker.js" }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={true} renderAnnotationLayer={true} onMouseUp={handleTextSelection} />
        ))}
      </Document>

  );
};

export default PDFViewer;
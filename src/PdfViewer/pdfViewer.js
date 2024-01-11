import React from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import samplePDF from './Manan_s_SE_Resume.pdf';
import { Worker } from '@react-pdf-viewer/core';
// Import the main component
import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


const PDFViewer = () => {

  return (

    <Document file={samplePDF}>
      <Page pageNumber={1} />
    </Document>
  );
};

export default PDFViewer;
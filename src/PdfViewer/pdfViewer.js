import {React, useState} from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import { useLocation } from 'react-router-dom';
import './pdfViewer.css';
import axios from 'axios';
import samplePDF from './BERT.pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


const PDFViewer = () => {
  
  
  const location = useLocation();
  const receivedData = location.state.file;
  const apiKey = process.env.REACT_APP_API_KEY;
  const [gptRequest, setGptRequest] = useState("")
  const [gptResponse, setGptResponse] = useState("")
  const [numPages, setNumPages] = useState(null);

  const handleSendMessage = async (input) => {
    // Make a request to the ChatGPT API with the user input
    try{
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant' },
          { role: 'user', content: input},
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          
        },
      }
      
    )
    setGptResponse(response.data.choices[0].message.content)
    }
    catch(error){
      console.error('Error sending message:', error.response ? error.response.data : error.message);
    }
    
  
  };
  

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      console.log('Selected text:', selection.toString());
      setGptRequest("What does this snippet of text mean in the paper: ".concat(selection.toString()))
    }
  };

  return (
      <div className="layout">
        <Document
          file={receivedData}
          // options={{ workerSrc: "/pdf.worker.js" }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} renderTextLayer={true} renderAnnotationLayer={true} onMouseUp={handleTextSelection} />
          ))}
        </Document>
        <div className="gptArea">
            {gptRequest}
            <button onClick={() => handleSendMessage(gptRequest)}>Explain</button>
            {gptResponse}
        </div>
      </div>

  );
};

export default PDFViewer;
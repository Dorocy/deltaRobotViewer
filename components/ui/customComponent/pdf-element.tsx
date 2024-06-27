"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import "@babel/polyfill";
import "@babel/polyfill/noConflict";
import "jspdf/dist/polyfills.es.js";
import { FileTextIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import workerSrc from "pdfjs-dist/build/pdf.worker.min.js";

// 워커 파일의 경로를 설정
// pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   // "npm:pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfElement = (props: { detailInfo: any }) => {
  const infoData = props.detailInfo;
  // const fileName = infoData.split("/").pop();
  const fileName = "/SmallSiteDrawing2.pdf";
  const [fileData, setFileData] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/" + "SmallSiteDrawing2.pdf");
        const data = await response.blob();
        const url = URL.createObjectURL(data);
        setFileData(url);
        setLoading(false);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    fetchData();
  }, []);

  const [loading, setLoading] = useState<boolean>(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) =>
    setNumPages(numPages);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <FileTextIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        style={{ maxWidth: "850px", maxHeight: "100vh", overflowY: "scroll" }}
      >
        <div>
          {/* {fileData && (
            <Document
              file={`/${fileName}`}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
              {Array.from(new Array(numPages), (_, index) => (
                <Page
                  width={700}
                  key={index}
                  pageNumber={index + 1}
                  renderAnnotationLayer={false}
                />
              ))}
            </Document>
          )} */}
          <Document
            file={`${fileName}`}
            options={{ workerSrc: "/pdf.worker.js" }}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PdfElement;

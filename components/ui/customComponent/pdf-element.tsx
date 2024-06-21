"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { FileTextIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const PdfElement = (props: { detailInfo: any }) => {
  const infoData = props.detailInfo;
  const fileName = infoData.split("/").pop();
  console.log("파일명추추추루출", fileName);
  const [fileData, setFileData] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/" + fileName);
        const data = await response.blob();
        const url = URL.createObjectURL(data);
        setFileData(url);
        setLoading(false);
        console.log();
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    fetchData();
  }, [fileName]);

  const [loading, setLoading] = useState<boolean>(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

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
          <Document file={`/${fileName}`} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (_, index) => (
              <Page
                width={700}
                key={index}
                pageNumber={index + 1}
                renderAnnotationLayer={false}
              />
            ))}
          </Document>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PdfElement;

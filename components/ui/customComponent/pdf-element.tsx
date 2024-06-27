// Ensure this line is at the top of your TypeScript file
/// <reference types="next" />
/// <reference types="next/types/global" />

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FileTextIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfElement = (props: { detailInfo: any }) => {
  const infoData = props.detailInfo;
  const fileName = "/SmallSiteDrawing2.pdf";
  const [fileData, setFileData] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [numPages, setNumPages] = useState<number>(0); // Initialize with 0 pages
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(fileName);
        const data = await response.blob();
        const url = URL.createObjectURL(data);
        setFileData(url);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

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
          {fileData && (
            <Document file={fileData} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (_, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={700}
                  renderAnnotationLayer={false}
                />
              ))}
            </Document>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PdfElement;

"use client";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import CollapsibleItem from "./collection-item";
import CommonElement from "./common-element";
import PdfElement from "./pdf-element";

const ThemeProperty = (props: {
  dataElement: any;
  //   toggleDrawer: () => void;
}) => {
  const element = props.dataElement;
  console.log('넘어온 각각의 서브모델엘리먼츠',element)
  // const { visible, setVisible } = useContext(ValueContext);
  const [inputValue, setInputValue] = useState(false);

  const [open, setOpen] = useState(true);
  const getFileExtension = (filename: string) => {
    return filename.split(".").pop()?.toLowerCase();
  };

  const toggleContentVisibility = () => {
    // setInputValue(!inputValue);
    setInputValue(!inputValue);
  };

  return (
    <>
      <div className="justspace-x-4 mb-1 flex items-center rounded-md border p-3">
        <div className="flex-1 space-y-1">
          {element.constructor.name === "SubmodelElementCollection" && (
            <p className="text-sm font-medium leading-none">
              <CollapsibleItem item={element} />
            </p>
          )}

          {element.constructor.name === "Property" && (
            <div className="flex items-center space-x-4 px-4">
              <div className="relative w-[200px]">
                <Badge>{element.constructor.name}</Badge>
              </div>
              <div className="w-[350px]">
                <p className="text-sm font-medium leading-none">idShort</p>
                <p className="text-muted-foreground text-sm">
                  {element.idShort}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium leading-none">value</p>
                <p className="text-muted-foreground text-sm">{element.value}</p>
              </div>
            </div>
          )}

          {element.constructor.name === "MultiLanguageProperty" && (
            <div className="flex items-center space-x-4 px-4">
              <div className="relative w-[200px]">
                <Badge>{element.constructor.name}</Badge>
              </div>
              <div className="w-[350px]">
                <p className="text-sm font-medium leading-none">idShort</p>
                <p className="text-muted-foreground text-sm">
                  {element.idShort}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium leading-none">value</p>
                <p className="text-muted-foreground text-sm">
                  {element.value[0].text}
                </p>
              </div>
            </div>
          )}

          {element.constructor.name === "File" && (
            <div className="flex items-center space-x-4 px-4">
              <div className="relative w-[200px]">
                <Badge>{element.constructor.name}</Badge>
              </div>
              <div className="w-[350px]">
                <p className="text-sm font-medium leading-none">idShort</p>
                <p className="text-muted-foreground text-sm">
                  {element.idShort}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium leading-none">Value</p>
                <p className="text-muted-foreground text-sm">{element.value}</p>
              </div>
              {getFileExtension(element.value) === "pdf" ? (
                <PdfElement detailInfo={element.value} />
              ) : (
                <CommonElement detailInfo={element.value} />
              )}
              <PdfElement detailInfo={element.value} />
              {/* <CommonElement detailInfo={element.value} /> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ThemeProperty;

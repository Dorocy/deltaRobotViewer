"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SubmodelElementCollection } from "@aas-core-works/aas-core3.0-typescript/types";
import { ChevronsUpDown } from "lucide-react";
import React from "react";
import "./collection-item.css";
import ThemeProperty from "./theme-property";

const CollapsibleItem = (props: { item: SubmodelElementCollection }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-[100%] space-y-2"
    >
      <div className="flex items-center space-x-4 px-4">
        <div className="relative w-[200px]">
          <Badge>{"SubmodelElementCollection"}</Badge>
        </div>
        <div className="w-[350px]">
          <p className="text-sm font-medium leading-none">idShort</p>
          <p className="text-muted-foreground  text-sm">{props.item.idShort}</p>
        </div>
        <div>
          <p className="text-sm font-medium leading-none">
            value has {props.item.value?.length} elements
          </p>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>

      <>
        <CollapsibleContent className="space-y-2">
          {props.item.value?.map((element, i) => (
            <>
              <ThemeProperty dataElement={element} />
              {/* <div key={i} className=" border-b px-4 py-3 font-mono text-sm">
                <div className="flex items-center space-x-4 ml-0 pl-4">
                  <div className="relative w-[200px]">
                    <Badge>{element.constructor.name}</Badge>
                  </div>

                  <div className="w-[350px]">
                    <p className="text-sm font-medium leading-none">idShort</p>
                    <p className="text-muted-foreground  text-sm">
                      {element.idShort}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">value</p>
                    <p className="text-muted-foreground  text-sm">{"item"}</p>
                  </div>
                </div>
              </div> */}
            </>
          ))}
        </CollapsibleContent>
      </>
    </Collapsible>
  );
};

export default CollapsibleItem;

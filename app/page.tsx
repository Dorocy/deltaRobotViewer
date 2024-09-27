"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ThemeProperty from "@/components/ui/customComponent/theme-property";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as aas from "@aas-core-works/aas-core3.0-typescript";
import {
  AssetAdministrationShell,
  Key,
  Submodel,
} from "@aas-core-works/aas-core3.0-typescript/types";
import { Box, Flex, Text } from "@radix-ui/themes";
import KR from "country-flag-icons/react/3x2/KR";
import US from "country-flag-icons/react/3x2/US";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Package2Icon, QrCodeIcon, SearchIcon, UsersIcon } from "lucide-react";
import { useQRCode } from "next-qrcode";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type NewSubmodels = {
  ReferenceId: Key;
  EncodingId: string;
  modelContent: Submodel;
};

export default function Home() {
  const [aasFile, setAASModel] = useState<AssetAdministrationShell | null>();
  const [logoFile, setLogoFile] = useState<any>();
  const [fmsFile, setThumbnailFile] = useState<string>();
  const [loading, setLoading] = useState(true);
  const { Canvas } = useQRCode();
  const [newSubmodel, setNewSubs] = useState<any[]>([]);
  const [inspectionData, setInspectionData] = useState<Submodel | null>(null);

  useEffect(() => {
    // console.log("모데데잋터", ModelData);
    const fetchData = async () => {
      try {
        const responseThumbnail = await fetch("/api/Repository/aas/thumbnail");
        const data = await responseThumbnail.blob();
        const ImageUrl = URL.createObjectURL(data);
        setThumbnailFile(ImageUrl);

        // 대상모델 가져오기
        const responseModel = await fetch("/api/Repository/aas");
        const jsonData = await responseModel.json();
        const model = aas.jsonization.assetAdministrationShellFromJsonable(
          jsonData.data
        );
        setAASModel(model.value);

        const logoResponse = await fetch("KETI_CI국영문.png");
        const logoBlob = await logoResponse.blob();
        const logoUrl = URL.createObjectURL(logoBlob);
        setLogoFile(logoUrl);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const submodels = aasFile?.submodels;

  useEffect(() => {
    const fetchSubmodels = async () => {
      if (aasFile?.submodels) {
        try {
          const results = await Promise.all(
            aasFile.submodels.map(async (element: any, i: number) => {
              const id = Buffer.from(element.keys[0].value).toString("base64");
              const responseModel = await fetch(
                `/api/Repository/submodels/${id}`
              );
              const jsonData = await responseModel.json();
              const eachSubmodel = aas.jsonization.submodelFromJsonable(
                jsonData.data
              );
              return {
                ReferenceId: element,
                EncodingId: id,
                modelContent: eachSubmodel.value,
              };
            })
          );
          setNewSubs(results); // newSubs 상태 업데이트
        } catch (error) {
          console.error("Error fetching submodels:", error);
        }
      }
    };
    fetchSubmodels();
  }, [aasFile?.submodels]);

  useEffect(() => {
    const fetchInspectionData = async () => {
      const inspectionSubmodel = newSubmodel.find(
        (submodel) => submodel?.modelContent?.idShort === "InspectionData"
      );
      if (inspectionSubmodel) {
        try {
          const response = await fetch(
            `/api/Repository/submodels/${inspectionSubmodel.EncodingId}`
          );
          const jsonData = await response.json();
          const updatedSubmodel = aas.jsonization.submodelFromJsonable(
            jsonData.data
          );
          console.log("Updated Inspection Data:", updatedSubmodel);
          setInspectionData(updatedSubmodel.value);
        } catch (error) {
          console.error("Error fetching inspection data:", error);
        }
      }
    };
    if (newSubmodel.length > 0) {
      console.log("New Submodel Detected:", newSubmodel);
      const intervalId = setInterval(fetchInspectionData, 1000);
      return () => clearInterval(intervalId);
    }
  }, [newSubmodel]);

  useEffect(() => {
    if (inspectionData) {
      // inspectionData가 변경될 때 실행할 로직
      console.log("InspectionData has been updated:", inspectionData);

      // 리렌더링 트리거 로직을 여기에 추가할 수 있습니다.
    }
  }, [inspectionData]); // 의존성 배열에 inspectionData를 추가하여 값이 변경될 때마다 실행

  console.log("확인된 newSubs:", newSubmodel);
  const assetInfo = aasFile?.assetInformation;

  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[350px_1fr]">
      <div className="hidden border-r bg-muted/40 lg:block">
        <div className="flex flex-col gap-2">
          <div className="flex h-[60px] items-center px-6">
            <Link
              href="#"
              className="flex items-center gap-2 font-semibold"
              prefetch={false}
            >
              {logoFile && (
                <Image
                  src={logoFile}
                  alt="logo_image"
                  width={200}
                  height={100}
                />
              )}
            </Link>
          </div>
          {/* <div className="flex-1">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                prefetch={false}
              >
                <HomeIcon className="h-4 w-4" />
                Dashboard
              </Link>
            </nav>
          </div> */}
          <div>
            <Card className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl">
              {fmsFile ? (
                <Image
                  src={fmsFile}
                  alt="Card Image"
                  width={250}
                  height={300}
                  className="thumbnail w-full object-fill"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span>No Image Available</span>
                </div>
              )}
              <CardHeader className="flex flex-row items-center justify-between pb-0">
                <CardTitle className="text-lg text-center font-bold">
                  {"DeltaRobot"}
                </CardTitle>

                {/* <PcCaseIcon className="w-4 h-4 text-muted-foreground" /> */}
              </CardHeader>
            </Card>
          </div>
          <div>
            <Card>
              <Flex gap="3" align="center">
                <Box className="p-2">
                  <Text as="div" size="2" weight="bold" className="text-sm">
                    {"ECLASS"}
                    <Badge className="ml-5" color="cyan" variant={"secondary"}>
                      13.0
                    </Badge>
                  </Text>

                  <Text
                    as="div"
                    size="2"
                    color="gray"
                    className="text-lg font-bold"
                  >
                    0173-1#01-AAZ348#019
                  </Text>
                </Box>
              </Flex>
            </Card>
          </div>
          <div>
            <Card>
              <Flex gap="3" align="center">
                {/* <Avatar radius="full" fallback="J" color="indigo" /> */}
                <Box>
                  <Text as="div" size="2" weight="bold">
                    Jieun Jung
                  </Text>
                  <Text as="div" size="2" color="gray">
                    Engineering
                  </Text>
                </Box>
              </Flex>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
          <Link href="#" className="lg:hidden" prefetch={false}>
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold text-lg">
              Digital Product Passport Dashboard
            </h1>
          </div>
          <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Admin</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {/* <Card className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl">
              {fmsFile ? (
                <Image
                  src={fmsFile}
                  alt="Card Image"
                  width={250}
                  height={300}
                  className="thumbnail w-full object-fill"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span>No Image Available</span>
                </div>
              )}
              <CardHeader className="flex flex-row items-center justify-between pb-0">
                <CardTitle className="text-lg font-bold">DelTaRobot</CardTitle>
              </CardHeader>
            </Card> */}

            <Card className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-bold">
                  AAS Information
                </CardTitle>
                <UsersIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Text as="div" size="2" weight="bold">
                  AAS ID
                </Text>
                <Text as="div" color="gray" size="2">
                  {aasFile?.id}
                </Text>

                <Text as="div" size="2" weight="bold">
                  Description
                </Text>
                <Text as="div" color="gray" size="2" className="flex pl-2">
                  <US title="United States" className="w-5 mr-3" />
                  {aasFile?.description?.[0].text}{" "}
                </Text>
                <Text as="div" color="gray" size="2" className="flex pl-2">
                  <KR title="United States" className="w-5 mr-3" />
                  {"델타로봇 자산의 AAS 입니다."}{" "}
                </Text>

                <div className="flex items-center justify-between">
                  <div className="font-medium">AAS ID</div>
                  <div className="text-gray-500 font-light">{aasFile?.id}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-medium">Manufacturer</div>
                  <div className="text-gray-500 font-semibold">SMIC</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-medium">ProductName</div>
                  <div className="text-gray-500 font-semibold">Pencil case</div>
                </div>
              </CardContent>
            </Card>

            <Card className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-bold">
                  Asset Information
                </CardTitle>
                <UsersIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Text as="div" size="2" weight="bold">
                  Asset ID
                </Text>
                <Text as="div" color="gray" size="2">
                  {assetInfo?.globalAssetId}
                </Text>
                <div className="flex items-center justify-between">
                  <div className="font-medium">AssetID</div>
                  <div className="text-gray-500 font-light">
                    {assetInfo?.globalAssetId}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-medium">AAS ID</div>
                  <div className="text-gray-500 font-light">{aasFile?.id}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-medium">Manufacturer</div>
                  <div className="text-gray-500 font-semibold">SMIC</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-medium">ProductName</div>
                  <div className="text-gray-500 font-semibold">Pencil case</div>
                </div>
              </CardContent>
            </Card>

            <Card className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-bold">
                  Mobile QR Code
                </CardTitle>

                <QrCodeIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-md font-light text-muted-foreground">
                  Scan this QR code using Mobile
                </div>
                <div className="qrCode pt-5">
                  <Canvas
                    text={"https://delta-robot-viewer.vercel.app"}
                    options={{
                      errorCorrectionLevel: "M",
                      margin: 3,
                      scale: 4,
                      width: 150,
                      color: {
                        dark: "#FFFFFFFF", // 어두운 부분을 흰색으로 변경
                        light: "#000000FF",
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Submodel Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Tabs defaultValue={"Nameplate"} className="mt-3">
                      <TabsList className="inline-flex flex-wrap justify-between">
                        {newSubmodel.length > 0
                          ? newSubmodel?.map(
                              (element: NewSubmodels, i: number) => (
                                <TabsTrigger
                                  key={i}
                                  value={element?.modelContent.idShort ?? ""}
                                >
                                  {element.modelContent.idShort ?? ""}
                                </TabsTrigger>
                              )
                            )
                          : loading}
                      </TabsList>
                      {/* {newSubmodel?.map((element: NewSubmodels, i: number) => (
                        <TabsContent
                          key={i}
                          value={element?.modelContent.idShort ?? ""}
                        >

                          {(() => {
                            const elements = [];

                            for (const item of element.modelContent.descendOnce()) {
                              if (aas.types.isSubmodelElement(item)) {
                                elements.push(
                                  <ThemeProperty
                                    key={item.idShort}
                                    dataElement={item}
                                  />
                                );
                              }
                            }

                            return elements;
                          })()}
                        </TabsContent>
                      ))} */}

                      {newSubmodel.map((element: NewSubmodels, i: number) => (
                        <TabsContent
                          key={i}
                          value={element?.modelContent?.idShort ?? ""}
                        >
                          {/* InspectionData 처리 */}
                          {element?.modelContent?.idShort ===
                          "InspectionData" ? (
                            <div>
                              {/* <h2>Inspection Data</h2> */}
                              {inspectionData ? (
                                (() => {
                                  const elements = [];
                                  for (const item of inspectionData.descendOnce()) {
                                    if (aas.types.isSubmodelElement(item)) {
                                      elements.push(
                                        <ThemeProperty
                                          key={item.idShort}
                                          dataElement={item}
                                        />
                                      );
                                    }
                                  }
                                  return elements;
                                })()
                              ) : (
                                <p>Loading inspection data...</p>
                              )}
                            </div>
                          ) : (
                            // 그 외 Submodel에 대한 처리
                            <div>
                              {(() => {
                                const elements = [];

                                for (const item of element.modelContent.descendOnce()) {
                                  if (aas.types.isSubmodelElement(item)) {
                                    elements.push(
                                      <ThemeProperty
                                        key={item.idShort}
                                        dataElement={item}
                                      />
                                    );
                                  }
                                }

                                return elements;
                              })()}
                            </div>
                          )}
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

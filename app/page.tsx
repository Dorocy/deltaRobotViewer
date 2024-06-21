"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as aas from "@aas-core-works/aas-core3.0-typescript";
import { Environment } from "@aas-core-works/aas-core3.0-typescript/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  CalendarIcon,
  HomeIcon,
  MessageCircleIcon,
  Package2Icon,
  PcCaseIcon,
  QrCodeIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { useQRCode } from "next-qrcode";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [aasFile, setAASModel] = useState<Environment | null>();
  const [logoFile, setLogoFile] = useState<any>();
  const [fmsFile, setFmsFile] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 대상모델 가져오기
        const response = await fetch("/dpp copy.json");
        const jsonData = await response.json();
        console.log("djqtdj?", jsonData);
        const model = aas.jsonization.environmentFromJsonable(jsonData);
        setAASModel(model.value);

        console.log("여기여기", model.value);
        //Keti 메인 로고 가져오기
        const logoResponse = await fetch("KETI_CI국영문.png");
        const logoBlob = await logoResponse.blob();
        const logoUrl = URL.createObjectURL(logoBlob);
        setLogoFile(logoUrl);

        //fms사진
        const fmsimageResponse = await fetch("fms_thumbnail.png");
        const fmsimageBlob = await fmsimageResponse.blob();
        const fmsimageUrl = URL.createObjectURL(fmsimageBlob);
        setFmsFile(fmsimageUrl);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const { Canvas } = useQRCode();

  const submodels = aasFile?.submodels;
  const assetInfo = aasFile?.assetAdministrationShells;
  // const submodelElements = aasFile?.submodels;
  console.log(aasFile);

  console.log("확인해볼까요 ? ㅋㅋㅋㅋ s", submodels);

  // if (loading) {
  //   return <p>Loading...</p>;
  // } else

  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
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
          <div className="flex-1">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                prefetch={false}
              >
                <HomeIcon className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary  transition-all hover:text-primary"
                prefetch={false}
              >
                <UsersIcon className="h-4 w-4" />
                Doctors
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                prefetch={false}
              >
                <UsersIcon className="h-4 w-4" />
                Patients
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                prefetch={false}
              >
                <CalendarIcon className="h-4 w-4" />
                Appointments
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                prefetch={false}
              >
                <MessageCircleIcon className="h-4 w-4" />
                Messages
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                prefetch={false}
              >
                <SettingsIcon className="h-4 w-4" />
                Settings
              </Link>
            </nav>
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
                  {/* <img
                    src="/placeholder.svg"
                    width="32"
                    height="32"
                    className="rounded-full"
                    alt="Avatar"
                  /> */}
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
            <Card className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <Image
                src={fmsFile}
                alt="Card Image"
                width={300}
                height={300}
                className="w-full h-48 object-cover"
              />
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-bold">
                  Pencile Case
                </CardTitle>
                <PcCaseIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {/* <div className="text-2xl font-bold">124</div>
                <p className="text-xs text-muted-foreground">
                  +10 since last month
                </p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-bold">
                  AAS Information
                </CardTitle>
                <UsersIcon className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="font-medium">AssetID</div>
                  <div className="text-gray-500 font-semibold">
                    assetInfo?.[0]
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-medium">Site Information</div>
                  <div className="text-gray-500 font-semibold">Main Office</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-medium">Temperature</div>
                  <div className="text-gray-500 font-semibold">22°C</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-medium">Humidity</div>
                  <div className="text-gray-500 font-semibold">65%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-medium">Uptime</div>
                  <div className="text-green-500 font-semibold">99.99%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-medium">Response Time</div>
                  <div className="text-gray-500 font-semibold">250ms</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
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
                    text={"http://172.21.50.144:3002/"}
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
                    <Tabs defaultValue={"DigitalNameplate"} className="mt-3">
                      <TabsList className="inline-flex flex-wrap justify-between">
                        {submodels?.map((element: any, i: number) => (
                          <TabsTrigger key={i} value={element.idShort ?? ""}>
                            {element.idShort ?? ""}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      {/* {submodels?.submodelElements?.map((element, i: number) => (
                        console.log('뭔지확인이필요하지?',element)
                        <TabsContent key={i} value={element.idShort ?? ""}>
                          {(() => {
                            const elements = [];
                            for (const item of element.descendOnce()) {
                              if (aas.types.isSubmodelElement(item)) {
                                elements.push(
                                  "anjsi"
                                  // <ThemeProperty
                                  //   dataElement={item}
                                  //   // toggleDrawer={toggleDrawer}
                                  // />å
                                );
                              }
                            }
                            return elements;
                          })()}
                        </TabsContent>
                      ))} */}
                    </Tabs>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  {"아바타말고"}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Jane Doe</div>
                      <div className="text-xs text-muted-foreground">
                        1 day ago
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      I need to reschedule my appointment. Can you please help
                      me with that?
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Bob Smith</div>
                      <div className="text-xs text-muted-foreground">
                        3 days ago
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      I'm having trouble accessing my patient portal. Can you
                      please help me?
                    </p>
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

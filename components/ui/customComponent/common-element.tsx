"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

import { useEffect, useState } from "react";

const CommonElement = (props: { detailInfo: any }) => {
  const infoData = props.detailInfo;
  // const fileName = infoData.split("/").pop(); // 파일명 추출
  // const fileName = infoData.split("/").pop();
  const fileName = "KETI_Logo.png";
  const [fileData, setFileData] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/logo/" + fileName);
        const data = await response.blob();
        const url = URL.createObjectURL(data);
        setFileData(url);
        setLoading(false);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    fetchData();
  }, [fileName]);

  // const [fileData, setFileData] = useState<string>(fileName); // 이미지 파일 경로 설정

  const [loading, setLoading] = useState<boolean>(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <ImageIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {loading ? (
          <div>image Loading...</div>
        ) : (
          <Image
            src={`/logo/${fileName}`}
            alt="logo_image"
            width={200}
            height={100}
            onLoad={handleImageLoad}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CommonElement;

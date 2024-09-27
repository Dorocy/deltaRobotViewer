export async function GET(req: Request, res: Response) {
  try {
    // 외부 API에서 이미지 가져오기
    const imageResponse = await fetch(
      "https://hm2024.wefactory.kr/api/v3.0/shells/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vNjA0MF82MDUwXzQwNDJfNTIwMQ==/asset-information/thumbnail",
      {
        headers: {
          "Content-Type": "application/octet-stream", // octet-stream 헤더 사용
        },
      }
    );

    // 이미지 데이터가 유효한지 확인
    if (!imageResponse.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch image" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 이미지를 배열 버퍼로 변환
    const imageBuffer = await imageResponse.arrayBuffer();
    return new Response(Buffer.from(imageBuffer), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching image" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

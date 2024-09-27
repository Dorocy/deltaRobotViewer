export async function GET(req: Request, res: Response, encodeId: String) {
  // const { encodeId } = req.query; // 쿼리 파라미터에서 가져오는 예시입니다.

  if (!encodeId) {
    return new Response(JSON.stringify({ error: "encodeId is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = await fetch(
    "https://hm2024.wefactory.kr/api/v3.0/submodels/" + encodeId,
    // "https://hm2024.wefactory.kr/api/v3.0/submodels/aHR0cHM6Ly9zbWljLmtyL2Fhcy9pdmR4Y2VudGVyL3N1Ym1vZGVsL0luc3BlY3Rpb25kYXRh",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
  return Response.json({ data });
}

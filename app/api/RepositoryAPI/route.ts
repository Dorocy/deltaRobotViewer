export async function GET(req: Request, res: Response) {
  const data = await fetch(
    "https://hm2024.wefactory.kr/api/v3.0/submodels/aHR0cHM6Ly9zbWljLmtyL2Fhcy9pdmR4Y2VudGVyL3N1Ym1vZGVsL0luc3BlY3Rpb25kYXRh",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
  return Response.json({ data });
}

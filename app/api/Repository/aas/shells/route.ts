export async function GET(req: Request, res: Response) {
  const data = await fetch("https://hm2024.wefactory.kr/api/v3.0/shells", {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return Response.json({ data });
}

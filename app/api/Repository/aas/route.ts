export async function GET(req: Request, res: Response) {
  const data = await fetch(
    "https://hm2024.wefactory.kr/api/v3.0/shells/aHR0cHM6Ly9leGFtcGxlLmNvbS9pZHMvc20vNjA0MF82MDUwXzQwNDJfNTIwMQ==",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
  return Response.json({ data });
}

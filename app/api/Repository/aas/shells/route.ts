export async function GET(req: Request, res: Response) {
  const data = await fetch("https://106.254.248.74:36941/api/v3.0/shells", {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
  return Response.json({ data });
}

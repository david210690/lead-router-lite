export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}))
  // In a real app: write to DB, call route-lead, insert audit row.
  return new Response(JSON.stringify({ ok: true, received: body }), {
    headers: { 'content-type': 'application/json' }, status: 200
  })
}

// Logout is now handled client-side in the layout
export async function POST() {
  return new Response(null, { status: 405 });
}


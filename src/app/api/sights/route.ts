import { getSights } from "@/lib/graphql/queries";
import client from "@/lib/graphql/serverClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Only allow POST requests

  // console.log(req.url);
  // console.log(req.headers.origin);

  // const origin = req.headers.get("origin") || "";
  // if (origin !== req.url) {
  //   return new NextResponse(null, { status: 403 });
  // }

  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
  }
  try {
    // Forward the request to the Hasura GraphQL endpoint
    const { data, error } = await client.query({
      query: getSights, // Assuming the request body contains a GraphQL query
    });

    if (error) {
      throw error;
    }

    // Send the response back to the client
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error making request to Hasura",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

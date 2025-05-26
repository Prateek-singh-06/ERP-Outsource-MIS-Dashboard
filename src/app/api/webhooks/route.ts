
import { headers } from "next/headers";

export async function POST(req: Request, res: Response) {
    console.log("Webhook received");

    // Get the headers
    //   const headerPayload = headers();
    return new Response("Webhook received", {
        status: 200,
    })
}
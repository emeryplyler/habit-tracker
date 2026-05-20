import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const response = await axios.get(`${process.env.ZENQUOTES_URL!}`);

        // TODO: cors?
        return NextResponse.json(
            { message: "Quote retrieved", data: response.data },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

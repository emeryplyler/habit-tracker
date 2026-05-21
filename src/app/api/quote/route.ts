import axios from "axios";
import { NextResponse } from "next/server";
import { cacheLife } from 'next/cache';

export async function GET(request: Request) {
    try {
        const quoteData = await getQuotes();

        // TODO: cors?
        return NextResponse.json(
            { message: "Quote retrieved", data: quoteData },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
async function getQuotes() {
    'use cache: remote'
    // The Quote API is limited to 10 requests per minute, 
    // so we cache the response for 7 seconds to avoid hitting the limit
    // this cache will be shared by all users
    cacheLife({ expire: 7 })

    const response = await axios.get(`${process.env.ZENQUOTES_URL!}`);
    return response.data;
}

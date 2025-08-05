// pages/api/files.js
import { NextRequest } from 'next/server';
import axios from 'axios';

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NGNjMjZmOS01YTMxLTRiM2YtOGMwMy0zYjBiNzM3MGZiZWUiLCJlbWFpbCI6InJhaWRpdnkzMDEwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxY2MxMzIxMjRkOGVkYmQ5NDVlOSIsInNjb3BlZEtleVNlY3JldCI6ImMxZWNhMjcyZTNjYTQxZmVjNDA0YjhiMmMzMTU0NTc1NjUwY2Y5NDgyZjY5ODEwNmY4ZjllMGMwZjkzY2RjNDUiLCJleHAiOjE3ODU5NDg1MjB9.u238UhpCCRGq0zp8Wzhz91YamZdiJ9Jfr0bcL-XEB8k";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const account = searchParams.get('account');

    // Build Pinata query
    let url = 'https://api.pinata.cloud/data/pinList?status=pinned';
    if (account) {
      url += `&metadata[keyvalues]={"account":{"value":"${account}","op":"eq"}}`;
    }

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    });
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error('Error fetching files from Pinata:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

// pages/api/delete.js
import { NextRequest } from 'next/server';

const PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NGNjMjZmOS01YTMxLTRiM2YtOGMwMy0zYjBiNzM3MGZiZWUiLCJlbWFpbCI6InJhaWRpdnkzMDEwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxY2MxMzIxMjRkOGVkYmQ5NDVlOSIsInNjb3BlZEtleVNlY3JldCI6ImMxZWNhMjcyZTNjYTQxZmVjNDA0YjhiMmMzMTU0NTc1NjUwY2Y5NDgyZjY5ODEwNmY4ZjllMGMwZjkzY2RjNDUiLCJleHAiOjE3ODU5NDg1MjB9.u238UhpCCRGq0zp8Wzhz91YamZdiJ9Jfr0bcL-XEB8k";

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { hash } = body;

    if (!hash) {
      return new Response(JSON.stringify({ message: 'Missing IPFS hash to delete' }), { status: 400 });
    }

    const response = await fetch(`https://api.pinata.cloud/pinning/unpin/${hash}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`
      }
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ message: `Pinata error: ${response.statusText}` }), { status: response.status });
    }

    return new Response(JSON.stringify({ message: 'File successfully deleted' }), { status: 200 });
  } catch (err) {
    const error = err as Error;
    return new Response(JSON.stringify({ message: 'Failed to delete file', error: error.message }), { status: 500 });
  }
}

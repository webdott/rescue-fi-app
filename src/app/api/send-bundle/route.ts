import { NextRequest, NextResponse } from 'next/server';

import { getSepoliaMevShareClient } from '@/lib/flashbots';

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = await req.json();
  const { bundle, blockNumber, privateKey } = body;

  // connect to MEV-Share on mainnet
  const mevShareClient = getSepoliaMevShareClient(privateKey);

  const result = await mevShareClient.sendBundle({
    body: bundle,
    inclusion: {
      block: Number(blockNumber) + 1,
      maxBlock: Number(blockNumber) + 24,
    },
  });

  return NextResponse.json({ data: result });
};

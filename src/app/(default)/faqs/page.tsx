import { Metadata } from 'next';
import React, { Suspense } from 'react';

import { AllFaqs } from '@/components/layout/sections/all-faqs';
import { ScrollArea } from '@/components/ui/scroll-area';

export const metadata: Metadata = {
  title: 'RescueFi | Frequently Asked Questions',
};

const FAQPage = () => {
  return (
    <ScrollArea className="flex h-[calc(100dvh-60px)] w-full flex-col gap-y-7 overflow-y-auto overflow-x-hidden md:h-full">
      <section className="mx-auto flex w-full max-w-[800px] flex-col items-center gap-y-20 px-3 py-10">
        <Suspense>
          <AllFaqs />
        </Suspense>
      </section>
    </ScrollArea>
  );
};

export default FAQPage;

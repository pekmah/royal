import Image from 'next/image';
import React from 'react';
import empty from '@/public/empty.png';
import { Barlow } from 'next/font/google';

const barlowSemi = Barlow({
	style: 'normal',
	weight: '600',
	subsets: ['latin'],
});
const Empty = ({ text }: { text: string }) => {
  const highlightedText = text
    .replace(/Request a quote/g, '<span class="text-blue">Request a quote</span>')
    .replace(/Upload new plans/g, '<span class="text-blue">Upload new plans</span>');

  return (
    <div className='w-full h-[50vh] flex flex-col items-center justify-center'>
      <div className=''>
        <Image height={100} width={100} priority src={empty} alt='/pending_empty' />
      </div>
      <p
        className={`${barlowSemi.className} max-w-xs text-[#667085] mx-auto`}
        dangerouslySetInnerHTML={{ __html: highlightedText }}
      />
    </div>
  );
};

export default Empty;
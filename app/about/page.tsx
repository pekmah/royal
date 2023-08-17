import AboutPageBanner from '@/components/AboutPageBanner'
import { Barlow } from 'next/font/google';
import {TbArrowBadgeRight, TbFlagFilled} from 'react-icons/tb'
import {GiBullseye, GiTorch} from 'react-icons/gi'
import React from 'react'
import AboutCorporate from '@/components/AboutCorporate';

const barlowSemi = Barlow({
  style: 'normal',
  weight: '600',
  subsets: ['latin'],
});

const iconSize = 25
const corevalues = [
  {id:1, value:"Believe in People"},
  {id:2, value:"Coaching and Support"},
  {id:3, value:'Accountability'},
  {id:4, value:'Execution Excellence'},
  {id:5, value: "Team Work"}
]
const about = () => {
  return (
    <div className=''>
      <AboutPageBanner />
      <div className='flex pt-32 pb-10  justify-between px-4'>
       
          <h2 className={`${barlowSemi.className} flex-1 text-[20px] py-2`}>
            <span className='text-black'>The Royal Mabati </span>
            <span className='text-red'> Story</span>
          </h2>
  
        <div className='flex-1 w-full '>
            <p className='text-lightgray text-sm leading-[24px]'>
              For many years, Royal Mabati Factory Limited has supported many clients succeed through our roofing 
              solutions and products. We are a multinational company that primarily deals with roofing materials,
               starting out with a factory in Nairobi since our inception in 2005. Today, we’re one of the leading 
               manufacturers of roofing products with over distribution centers across Kenya and Eastern Africa.
              </p>

              <p className='text-lightgray text-sm pt-6'>
              The strict implementation of state of the art manufacturing facilities, product testing, organized back 
              office, thorough training, field supervision, research & development allows us to ensure the integrity of
               our product and the satisfaction of our consumers.

            </p>
          </div>
      </div>

      <div className='bg-[#181818] w-full h-full'>
      <h2 className={`${barlowSemi.className} flex-1 text-[20px] py-6 text-center`}>
            <span className='text-white'>Our Key </span>
            <span className='text-red'> Milestone</span>
          </h2>
          <div className='flex items-center w-full justify-between'>
            <div className='text-white px-4'>
            <div className='relative text-end'>
              <h4 className="absolute right-24 -top-10">Our Key Milestones</h4>
              <div className='text-white absolute w-[10vw] border -top-7 -right-[4.5rem]' />

              </div>
              <p className='text-center py-4'>We are a multinational company that primarily deals with roofing materials, starting out with a factory in Nairobi since our inception in 2005.</p>
            </div>
            <div className='h-screen border text-white mx-14'/>
            <div className='px-4 text-white'>
              <div className='relative'>
              <h4 className="absolute left-20 -top-10">Our Key Milestones</h4>
              <div className='text-white absolute w-[10vw] border -top-7 -left-[4.5rem]' />

              </div>
              <p className='text-center py-4'>We are a multinational company that primarily deals with roofing materials, starting
                 out with a factory in Nairobi since our inception in 2005.</p>
                 <p className='w-[477px] h-[311px] bg-gray'>

                 </p>
                 
                 <div className='relative'>
              <h4 className="absolute left-20 top-[3rem]">Our Key Milestones</h4>
              <div className='text-white absolute w-[10vw] border top-14 -left-[4.5rem]' />
              </div>
            </div>
          </div>
          <div className='grid grid-cols-3 px-4 py-12 gap-6'>
            <div>
              <div className='flex gap-4 items-center'>
                <TbFlagFilled className='text-white' size={iconSize}/>
                <h4 className={`${barlowSemi.className} flex-1 text-[20px] py-2`}>
                <span className='text-white'>Our </span>
                <span className='text-red'> Mission</span>
                </h4>
              </div>
              <p className='text-white py-2 text-sm leading-[24px]'>We are a multinational company that primarily deals with roofing materials,
                 starting out with a factory in Nairobi since our inception in 2005.</p>
            </div>
            {/* vision */}
            <div>
              <div className='flex gap-4 items-center'>
                <GiBullseye className='text-white rotate-180' size={iconSize}/>
                <h4 className={`${barlowSemi.className} flex-1 text-[20px] py-2`}>
                <span className='text-white'>Our </span>
                <span className='text-red'> Mission</span>
                </h4>
              </div>
              <p className='py-2 text-white text-sm leading-[24px]'>To proactively establish ourselves as the benchmark of customer satisfaction.</p>
            </div>
            {/* core priciple */}
            <div>
              <div className='flex gap-4 items-center'>
                <GiTorch size={iconSize} className='text-white'/>
                <h4 className={`${barlowSemi.className} flex-1 text-[20px] py-2`}>
                <span className='text-white'>Our </span>
                <span className='text-red'> Mission</span>
                </h4>
              </div>
              <p className='text-white py-2 text-sm leading-[24px]'>We are customer maniacs! Our sales teams and technical support centers listen
                 and respond to the voices of their customers. We practice:</p>
                 <ul className='text-white text-sm'>
                  {
                    corevalues.map(({id, value})=>(
                      <div key={id} className='flex gap-2 items-center'>
                        <TbArrowBadgeRight/>
                        <li className='py-1'>{value}</li>
                      </div>
                    ))
                  }
                 </ul>
            </div>
          </div>
      </div>
      <AboutCorporate/>

    </div>
  )
}

export default about
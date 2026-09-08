import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#111218] relative min-h-[2500px] w-full overflow-hidden">
      <div className="absolute h-[2136.836px] left-[-428px] top-[-708px] w-[2775.589px]">
        <div className="absolute inset-[-8.99%_-6.92%]">
          <img alt="" className="block max-w-none size-full" src="/assets/union.svg" />
        </div>
      </div>
      <div className="absolute h-[1012px] left-[401px] top-[600px] w-[1050px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src="/assets/image-1.png" />
      </div>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Bricolage_Grotesque:Bold'] font-bold leading-[72px] left-[calc(50%-0.5px)] text-[72px] text-center text-white top-[120px] w-[879px]">{`Don't let your balance hit zero, master your cash flow with acomo`}</p>
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Bricolage_Grotesque:Medium'] font-medium leading-[28px] left-[calc(50%-0.5px)] text-[18px] text-center text-white top-[360px] w-[571px]">{`Drop your email below to claim your spot in line. We'll give you exclusive early access the second we go live.`}</p>
      
      <div className="-translate-x-1/2 absolute content-stretch flex gap-[8px] items-center left-1/2 top-[480px]">
        <div className="bg-[rgba(255,255,255,0.15)] content-stretch flex h-[56px] items-center px-[24px] relative rounded-[999px] shrink-0 w-[320px]">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="bg-transparent outline-none [word-break:break-word] font-['Bricolage_Grotesque:Regular'] font-normal leading-[normal] relative shrink-0 text-[16px] text-white whitespace-nowrap w-full"
          />
        </div>
        <button className="bg-white hover:bg-gray-200 transition-colors content-stretch flex h-[56px] items-center justify-center px-[32px] py-[8px] relative rounded-[999px] shrink-0 cursor-pointer">
          <p className="[word-break:break-word] font-['Bricolage_Grotesque:Medium'] font-medium leading-[20px] relative shrink-0 text-[14px] text-black text-center whitespace-nowrap">
            Get Early Access
          </p>
        </button>
      </div>
      
      <p className="[word-break:break-word] absolute font-['Bricolage_Grotesque:Bold'] font-bold leading-[48px] left-[calc(50%-318px)] text-[48px] text-white top-[1676px] whitespace-nowrap">
        Frequently Asked Questions
      </p>

      <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[383px] top-[1768px] w-[1152px]">
        <div className="content-stretch flex gap-[24px] items-start justify-center relative shrink-0 w-full">
          <div className="bg-[#1c1e2b] content-stretch flex flex-col items-start px-[24px] py-[8px] relative rounded-[16px] shrink-0 w-[564px]">
            <div className="content-stretch flex h-[76px] items-start justify-between py-[24px] relative rounded-[6px] shrink-0 w-[514px]">
              <div className="content-stretch flex flex-col items-start pr-[16px] relative shrink-0">
                <p className="[word-break:break-word] font-['Bricolage_Grotesque:SemiBold'] font-semibold leading-[28px] relative shrink-0 text-[18px] text-white whitespace-nowrap">{`Lorem Ipsum `}</p>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 size-[24px]">
                <div className="absolute flex items-center justify-center left-[-4.97px] size-[33.941px] top-[-4.97px]">
                  <div className="flex-none rotate-45">
                    <div className="relative size-[24px]">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/icon.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#1c1e2b] content-stretch flex flex-col items-start px-[24px] py-[8px] relative rounded-[16px] shrink-0 w-[564px]">
            <div className="content-stretch flex h-[76px] items-start justify-between py-[24px] relative rounded-[6px] shrink-0 w-[514px]">
              <div className="content-stretch flex flex-col items-start pr-[16px] relative shrink-0">
                <p className="[word-break:break-word] font-['Bricolage_Grotesque:SemiBold'] font-semibold leading-[28px] relative shrink-0 text-[18px] text-white whitespace-nowrap">{`Lorem Ipsum `}</p>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 size-[24px]">
                <div className="absolute flex items-center justify-center left-[-4.97px] size-[33.941px] top-[-4.97px]">
                  <div className="flex-none rotate-45">
                    <div className="relative size-[24px]">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/icon.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col h-[64px] items-start overflow-clip pb-[16px] relative shrink-0 w-full">
              <p className="[word-break:break-word] font-['Bricolage_Grotesque:Regular'] font-normal leading-[24px] relative shrink-0 text-[16px] text-white w-[514px]">{`Lorem ipsum dolor sit amet, dolor officia minim elit culpa laborum. Exercitation eu velit labore veniam minim cillum laborum. `}</p>
            </div>
          </div>
        </div>
        
        <div className="content-stretch flex gap-[24px] items-start justify-center relative shrink-0 w-full">
          <div className="bg-[#1c1e2b] content-stretch flex flex-col items-start px-[24px] py-[8px] relative rounded-[16px] shrink-0 w-[564px]">
            <div className="content-stretch flex h-[76px] items-start justify-between py-[24px] relative rounded-[6px] shrink-0 w-[514px]">
              <div className="content-stretch flex flex-col items-start pr-[16px] relative shrink-0">
                <p className="[word-break:break-word] font-['Bricolage_Grotesque:SemiBold'] font-semibold leading-[28px] relative shrink-0 text-[18px] text-white whitespace-nowrap">{`Lorem Ipsum `}</p>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 size-[24px]">
                <div className="absolute flex items-center justify-center left-[-4.97px] size-[33.941px] top-[-4.97px]">
                  <div className="flex-none rotate-45">
                    <div className="relative size-[24px]">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/icon.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#1c1e2b] content-stretch flex flex-col items-start px-[24px] py-[8px] relative rounded-[16px] shrink-0 w-[564px]">
            <div className="content-stretch flex h-[76px] items-start justify-between py-[24px] relative rounded-[6px] shrink-0 w-[514px]">
              <div className="content-stretch flex flex-col items-start pr-[16px] relative shrink-0">
                <p className="[word-break:break-word] font-['Bricolage_Grotesque:SemiBold'] font-semibold leading-[28px] relative shrink-0 text-[18px] text-white whitespace-nowrap">{`Lorem Ipsum `}</p>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 size-[24px]">
                <div className="absolute flex items-center justify-center left-[-4.97px] size-[33.941px] top-[-4.97px]">
                  <div className="flex-none rotate-45">
                    <div className="relative size-[24px]">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/icon.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-stretch flex gap-[24px] items-start justify-center relative shrink-0 w-full">
          <div className="bg-[#1c1e2b] content-stretch flex flex-col items-start px-[24px] py-[8px] relative rounded-[16px] shrink-0 w-[564px]">
            <div className="content-stretch flex h-[76px] items-start justify-between py-[24px] relative rounded-[6px] shrink-0 w-[514px]">
              <div className="content-stretch flex flex-col items-start pr-[16px] relative shrink-0">
                <p className="[word-break:break-word] font-['Bricolage_Grotesque:SemiBold'] font-semibold leading-[28px] relative shrink-0 text-[18px] text-white whitespace-nowrap">{`Lorem Ipsum `}</p>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 size-[24px]">
                <div className="absolute flex items-center justify-center left-[-4.97px] size-[33.941px] top-[-4.97px]">
                  <div className="flex-none rotate-45">
                    <div className="relative size-[24px]">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/icon.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#1c1e2b] content-stretch flex flex-col items-start px-[24px] py-[8px] relative rounded-[16px] shrink-0 w-[564px]">
            <div className="content-stretch flex h-[76px] items-start justify-between py-[24px] relative rounded-[6px] shrink-0 w-[514px]">
              <div className="content-stretch flex flex-col items-start pr-[16px] relative shrink-0">
                <p className="[word-break:break-word] font-['Bricolage_Grotesque:SemiBold'] font-semibold leading-[28px] relative shrink-0 text-[18px] text-white whitespace-nowrap">{`Lorem Ipsum `}</p>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 size-[24px]">
                <div className="absolute flex items-center justify-center left-[-4.97px] size-[33.941px] top-[-4.97px]">
                  <div className="flex-none rotate-45">
                    <div className="relative size-[24px]">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/icon.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="-translate-x-1/2 absolute content-stretch flex flex-col items-center justify-center left-1/2 top-[2204px]">
        <div className="h-[18px] relative shrink-0 w-[104px]">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/icon-row.svg" />
        </div>
      </div>

      <div className="-translate-x-1/2 [word-break:break-word] absolute content-stretch flex font-['Bricolage_Grotesque:Medium'] font-medium gap-[64px] items-center leading-[28px] left-[calc(50%-0.5px)] text-[18px] text-center text-white top-[2278px] whitespace-nowrap">
        <p className="relative shrink-0 cursor-pointer hover:text-gray-300">Support</p>
        <p className="relative shrink-0 cursor-pointer hover:text-gray-300">Privacy Policy</p>
        <p className="relative shrink-0 cursor-pointer hover:text-gray-300">Terms of Service</p>
        <p className="relative shrink-0 cursor-pointer hover:text-gray-300">Security</p>
      </div>

      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Bricolage_Grotesque:Medium'] font-medium leading-[28px] left-[calc(50%-0.5px)] text-[18px] text-center text-white top-[2350px] whitespace-nowrap">{`© 2026 acomo by wmprawiro.dev `}</p>
    </div>
  );
}

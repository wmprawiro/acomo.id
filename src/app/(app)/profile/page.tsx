import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl rounded-[24px] p-5 border border-white/10 shadow-2xl flex items-center gap-4">
        <div className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white/10 text-white border border-white/20 w-[72px] h-[72px] text-2xl shrink-0 shadow-xl">
          <span className="font-medium text-white/80">WM</span>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-[22px] font-bold text-white tracking-tight leading-tight">Wahyu Maulana</h2>
          <p className="text-[15px] text-white/50 mt-1">wahyump62@gmail.com</p>
        </div>
      </div>

      {/* iOS Style Grouped List */}
      <div className="bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl rounded-[24px] overflow-hidden border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
          <div className="flex items-center gap-3.5">
            <div className="w-[30px] h-[30px] rounded-[8px] bg-emerald-500 flex items-center justify-center text-white shadow-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"/></svg>
            </div>
            <span className="text-[17px] text-white tracking-tight">Currency</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/50 text-[17px]">IDR (Rp)</span>
            <svg className="w-5 h-5 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>

        <div className="flex items-center justify-between p-5 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
          <div className="flex items-center gap-3.5">
            <div className="w-[30px] h-[30px] rounded-[8px] bg-sky-500 flex items-center justify-center text-white shadow-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <span className="text-[17px] text-white tracking-tight">Security</span>
          </div>
          <svg className="w-5 h-5 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </div>

        <div className="flex items-center justify-between p-5 hover:bg-white/5 transition-colors cursor-pointer">
          <div className="flex items-center gap-3.5">
            <div className="w-[30px] h-[30px] rounded-[8px] bg-purple-500 flex items-center justify-center text-white shadow-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd"/></svg>
            </div>
            <span className="text-[17px] text-white tracking-tight">Appearance</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/50 text-[17px]">Dark</span>
            <svg className="w-5 h-5 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <Link href="/logout" className="w-full flex items-center justify-center py-4 bg-gradient-to-br from-[#1C1C1E]/70 to-[#2C2C2E]/70 backdrop-blur-2xl rounded-[24px] border border-white/10 text-rose-500 font-semibold shadow-2xl hover:brightness-110 transition-all">
        Log Out
      </Link>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="flex items-center justify-between flex-wrap px-8 py-16 bg-gradient-to-r from-teal-800 to-teal-600 text-white rounded-b-[50px]">
      <div className="flex-1 min-w-[400px] max-w-[600px] mb-8">
        <h1 className="text-5xl mb-4 font-bold leading-tight">
          Empower Your Future with MicroFinance
        </h1>
        <p className="text-xl mb-8 opacity-85">
          Fast, reliable loans and savings designed for your growth and community development.
        </p>
        <div className="space-x-4">
          <button className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black border-none rounded-full font-semibold cursor-pointer transition-colors duration-300">
            Register
          </button>
          <button className="px-8 py-3 bg-transparent border-2 border-white rounded-full text-white font-semibold cursor-pointer hover:bg-white hover:text-teal-800 transition-colors duration-300">
            Login
          </button>
        </div>
      </div>

      <div className="flex-1 min-w-[400px] text-center">
        <img 
          src="https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=800&q=80"
          alt="Microfinance" 
          className="max-w-full h-auto rounded-2xl shadow-2xl"
        />
      </div>
    </section>
  );
}

export default HeroSection;
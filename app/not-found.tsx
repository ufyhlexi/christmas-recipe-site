import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header hideSearch={true} />
      
      <main className="flex-1 flex items-center justify-center px-4 relative" style={{
        backgroundImage: 'url(/page-not-found.svg)',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/70 to-gray-50"></div>
        
        {/* Content Section - Centered */}
        <div className="relative z-10 max-w-2xl w-full text-center">
          <div className="mb-6">
            <h1 className="text-8xl md:text-9xl font-bold text-gray-300 mb-4">
              404
            </h1>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Sidan hittades inte
          </h2>
          
          <p className="text-gray-600 mb-10 text-lg max-w-lg mx-auto leading-relaxed">
            Tyvärr kunde vi inte hitta den sida du söker efter. Den kan ha flyttats, tagits bort eller så finns den inte.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="group relative bg-[#d32f2f] text-white px-10 py-4 rounded-xl font-semibold hover:bg-[#b71c1c] transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:shadow-[#d32f2f]/30 hover:-translate-y-1 transform"
            >
              <span className="relative z-10">Tillbaka till startsidan</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#d32f2f] to-[#b71c1c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <Link
              href="/#recipes"
              className="group relative bg-white text-[#d32f2f] border-2 border-[#d32f2f] px-10 py-4 rounded-xl font-semibold hover:bg-[#d32f2f] hover:text-white transition-all duration-300 text-center shadow-md hover:shadow-xl hover:shadow-[#d32f2f]/30 hover:-translate-y-1 transform"
            >
              <span className="relative z-10">Se alla recept</span>
              <div className="absolute inset-0 rounded-xl bg-[#d32f2f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}


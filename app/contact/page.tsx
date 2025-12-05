import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default function ContactPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Back to Home Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-[#d32f2f] transition-colors mb-6 group"
          >
            <IoArrowBack className="text-xl group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Tillbaka till startsidan</span>
          </Link>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Vad kan vi hjälpa dig med?
            </h1>
            <p className="text-gray-600 text-lg">
              Fyll i formuläret nedan så återkommer vi till dig så snart som möjligt.
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </>
  );
}


import Footer from "../components/Footer";
import Header from "../components/Header";
import RecetionsGrid from "../components/RecetionsGrid";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="max-w-6xl mx-auto px-4 pt-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center leading-tight text-gray-800">
            Julens söta favoriter
          </h1>
        </div>
        <RecetionsGrid/>
      </main>
      <Footer/>
    </>
  );
}

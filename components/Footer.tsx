
export default function Footer() {
    const year = new Date().getFullYear()
  return (
    <footer className="bg-[#d32f2f] text-white">
      <div className="flex flex-col items-center text-center py-4 px-2">
        
        <p className="text-2xl text-center ">
           Christmas recipes by Grupp 1 All rights reserved  
        </p>
        <span>© {year}</span>
      </div>
    </footer>
    )
}
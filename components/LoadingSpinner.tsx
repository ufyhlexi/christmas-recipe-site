export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px] py-12">
      <div className="relative">
        {/* Spinner circle */}
        <div className="w-16 h-16 border-4 border-gray-200 border-t-[#d32f2f] rounded-full animate-spin"></div>
        {/* Optional: Loading text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-gray-500 font-medium">Laddar...</span>
        </div>
      </div>
    </div>
  );
}


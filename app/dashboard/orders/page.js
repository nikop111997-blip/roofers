export default function ComingSoon() {
  return (
    // Replaced the dark theme with a clean white background
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className={`max-w-4xl text-center space-y-8 `}>
        
        {/* Gradient Heading */}
        <h1 
          className="text-6xl sm:text-7xl md:text-9xl font-extrabold tracking-tight pb-2"
          style={{
            // Custom multi-stop gradient mimicking image_5a328f.png
            backgroundImage: 'linear-gradient(to right, #6be585 0%, #00d2ff 25%, #3a7bd5 50%, #8a2387 75%, #f27121 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Coming Soon
        </h1>

        {/* Subtitle adjusted for white background (dark gray text) */}
        <p className="text-gray-600 text-base md:text-lg lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
         We are build the thing for product add and managemnt
        </p>

      </div>
    </div>
  );
}
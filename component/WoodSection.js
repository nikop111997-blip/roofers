import React from 'react';

// Data array structured for easy API integration
const insightsData = [
  {
    id: 1,
    heading: "ON-TIME DELIVERY",
    percentage: 95,
    activeColor: "bg-blue-600",
    inactiveColor: "bg-blue-100",
    description: "Streamlined single-contractor model ensures efficient scheduling, minimizing delays and achieving an exceptional on-time record."
  },
  {
    id: 2,
    heading: "COST PREDICTABILITY",
    percentage: 92,
    activeColor: "bg-[#a3e635]", // Lime green
    inactiveColor: "bg-[#ecfccb]",
    description: "Predefined workflows and integrated budgeting provide high cost predictability, with minimal change orders or cost overruns."
  },
  {
    id: 3,
    heading: "SINGLE ACCOUNTABILITY",
    percentage: 98,
    activeColor: "bg-blue-300",
    inactiveColor: "bg-blue-50",
    description: "Clients have one point of accountability for all aspects, vastly simplifying communication and removing coordination overhead."
  },
  {
    id: 4,
    heading: "RISK MITIGATION",
    percentage: 88,
    activeColor: "bg-[#d4af37]", // Gold
    inactiveColor: "bg-[#fef08a]",
    description: "Comprehensive risk identification and unified mitigation strategies significantly reduce overall project risk and exposure."
  },
  {
    id: 5,
    heading: "QUALITY ASSURANCE",
    percentage: 96,
    activeColor: "bg-purple-600",
    inactiveColor: "bg-purple-100",
    description: "Consistent standards and rigorous quality controls applied from design to execution guarantee superior final project quality."
  },
  {
    id: 6,
    heading: "SAFETY COMPLIANCE",
    percentage: 100,
    activeColor: "bg-teal-800",
    inactiveColor: "bg-teal-100",
    description: "Every project strictly adheres to all safety codes, regulatory standards, and environmental requirements."
  }
];

export default function WhyChooseUs() {
  // Helper function to render the segmented visual progress bar
  const renderSegmentedBar = (percentage, activeColor, inactiveColor) => {
    const totalSegments = 28; // Total number of vertical dashes
    const activeSegments = Math.round((percentage / 100) * totalSegments);

    return (
      <div className="flex gap-[3px] mt-4 mb-5">
        {Array.from({ length: totalSegments }).map((_, index) => (
          <div
            key={index}
            className={`h-5 w-[6px] rounded-full ${
              index < activeSegments ? activeColor : inactiveColor
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="w-full py-20 px-8 md:px-12 lg:px-12 font-sans text-gray-900">
      <div className="">
        
        {/* Header Section */}
        <div className="mb-16 max-w-5xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2.5 h-2.5 bg-[#6dff9a] rounded-full"></div>
            <span className="text-sm font-semibold tracking-wide uppercase">Client Advantages</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-medium leading-snug tracking-tight">
            Our integrated turnkey solutions are designed to deliver seamless, efficient results, addressing critical client needs and project complexities.
          </h2>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insightsData.map((item) => (
            <div 
              key={item.id} 
              className="bg-white p-8 rounded-[2rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex flex-col"
            >
              <h4 className="text-xs font-semibold tracking-wide uppercase text-gray-900 mb-6">
                {item.heading}
              </h4>
              
              <div className="text-5xl font-medium tracking-tight mb-2">
                {item.percentage}%
              </div>
              
              {renderSegmentedBar(item.percentage, item.activeColor, item.inactiveColor)}
              
              <p className="text-sm text-gray-600 leading-relaxed font-light mt-auto">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
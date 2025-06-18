import FinancialDashboard from "@/components/FinancialDashboard";
import Footer from "@/components/Footer";

export default function FinancePage() {
  const statusesForERP = [
    { label: "ERP IN PIPELINE", key: "pipeline", color: "bg-slate-500" },
    { label: "ERP ONBOARDED", key: "onboarded", color: "bg-slate-500" },
    {
      label: "OUTSOURCING CONTRACT",
      key: "outsourcing",
      color: "bg-slate-500",
    },
  ];
  const renderHeadingTabs = () => {
    // In financial mode, show only onboarded and outsourcing (filter out pipeline).
    const financialTabs = statusesForERP.filter((s) => s.key !== "pipeline");
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {financialTabs.map((status) => (
          <button
            key={status.key}
            className="text-lg md:text-2xl font-bold rounded p-2 bg-gray-200 text-black"
            //   onClick={() => handleTabChange(status.key)}
          >
            {status.label}
          </button>
        ))}
      </div>
    );
  };
  return (
    <div className=" min-h-screen relative bg-[#f8f9fa] text-[#212529] flex justify-center items-center text-4xl font-bold ">
      <div className="mb-15 p-4">
        <h1 className="text-3xl font-bold mb-4">Live Financial status</h1>
        {renderHeadingTabs()}
        <FinancialDashboard />
      </div>
      <Footer />
    </div>
  );
}

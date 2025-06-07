import Link from "next/link";
import { ERP } from "@/lib/types";
import CompaniesCard from "./companiesCard";

export default function ERPCard({
  erp,
  expanded,
  onExpand,
  expandedGroup,
}: {
  erp: ERP[];
  expanded?: boolean;
  onExpand?: () => void;
  expandedGroup?: number | null;
}) {
  const targetDates = erp[0].targetDate || [];
  const extendedDates = erp[0].extendedDate || [];
  const hasExtendedDate = extendedDates.length > 0;

  interface DelayStatusClasses {
    [key: string]: string;
  }

  const delayStatusClasses: DelayStatusClasses = {
    "before-time": "bg-green-100 text-green-800 border-green-300",
    "on-time": "bg-yellow-100 text-yellow-800 border-yellow-300",
    delayed: "bg-red-100 text-red-800 border-red-300",
  };

  if (erp.length > 1) {
    return (
      <>
        {!expanded || expandedGroup === null ? (
          <div
            className="flex flex-col h-full space-y-6 bg-gray-50 rounded-xl shadow-lg p-4 hover:shadow-lg cursor-pointer hover:bg-green-100"
            onClick={onExpand}
          >
            <div className="flex flex-col lg:flex-row justify-between">
              <h3 className="text-xl text-black font-semibold w-full md:w-3/5 break-words">
                {erp[0].name.toUpperCase()}
              </h3>
              <div className="mt-2 md:mt-2">
                {erp[0].delayStatus === "" ? (
                  <div className="w-full md:w-auto min-w-[120px] text-sm sm:text-base border border-gray-300 rounded-full px-3 py-1 text-center bg-gray-100 text-gray-800">
                    No Status
                  </div>
                ) : (
                  <div
                    className={`w-full md:w-auto min-w-[120px] text-sm sm:text-base border rounded-full px-3 py-1 text-center ${
                      delayStatusClasses[erp[0].delayStatus] ||
                      "bg-gray-100 text-gray-800 border-gray-300"
                    }`}
                  >
                    {erp[0].delayStatus === "before-time"
                      ? "Before Time"
                      : erp[0].delayStatus === "on-time"
                      ? "On Time"
                      : erp[0].delayStatus === "delayed"
                      ? "Delayed"
                      : erp[0].delayStatus}
                  </div>
                )}
              </div>
            </div>

            <div className="text-md md:text-lg mt-2 flex-grow">
              {targetDates.length > 0 && (
                <>
                  {hasExtendedDate ? (
                    // ---------------------------------------------
                    // CASE: Extended date exists => strike out target date
                    // ---------------------------------------------
                    <div>
                      <span className="text-red-500">Target Date :</span>

                      {/* If there's exactly 1 target date */}
                      {targetDates.length === 1 ? (
                        <span className="mx-2 text-green-500 line-through decoration-red">
                          {targetDates[0]}
                        </span>
                      ) : (
                        // If multiple target dates, show bullet points
                        <ul className="mx-2 text-green-500 list-disc list-inside line-through decoration-red max-h-24 overflow-y-auto">
                          {targetDates.map((date, idx) => (
                            <li key={idx}>{date}</li>
                          ))}
                        </ul>
                      )}

                      {/* Show extended date(s) in red */}
                      {extendedDates.length === 1 ? (
                        <div className="text-red-500 mt-1">
                          {extendedDates[0]}
                        </div>
                      ) : (
                        <ul className="text-red-500 list-disc list-inside mt-1 max-h-24 overflow-y-auto">
                          {extendedDates.map((ed, idx) => (
                            <li key={idx}>{ed}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    // ---------------------------------------------
                    // CASE: No extended date => just show target date(s)
                    // ---------------------------------------------
                    <div className="text-green-500">
                      {/* Single target date vs multiple bullet points */}
                      {targetDates.length === 1 ? (
                        <div>Target Date : {targetDates[0]}</div>
                      ) : (
                        <div>
                          Target Dates :
                          <ul className="list-disc list-inside max-h-24 overflow-y-auto">
                            {targetDates.map((date, idx) => (
                              <li key={idx}>{date}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer content placed at the bottom */}
            <p className="text-sm md:text-md text-gray-500 mt-auto">
              Contacts: {erp[0].primaryContacts.join(", ")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
            {erp.map((erp) => (
              <div className="w-full " key={erp.id}>
                <CompaniesCard erp={erp}  />
              </div>
            ))}
          </div>
        )}
      </>
      // </Link>
    );
  }

  return (
    <>
      {expanded && (
        <Link href={`/erp/${erp[0].id} `} className="">
          <div className="flex flex-col h-full space-y-6 bg-gray-50 rounded-xl shadow-lg p-4 hover:shadow-lg cursor-pointer hover:bg-green-100">
            <div className="flex flex-col lg:flex-row justify-between">
              <h3 className="text-xl text-black font-semibold w-full md:w-3/5 break-words">
                {erp[0].name.toUpperCase()}
              </h3>
              <div className="mt-2 md:mt-2">
                {erp[0].delayStatus === "" ? (
                  <div className="w-full md:w-auto min-w-[120px] text-sm sm:text-base border border-gray-300 rounded-full px-3 py-1 text-center bg-gray-100 text-gray-800">
                    No Status
                  </div>
                ) : (
                  <div
                    className={`w-full md:w-auto min-w-[120px] text-sm sm:text-base border rounded-full px-3 py-1 text-center ${
                      delayStatusClasses[erp[0].delayStatus] ||
                      "bg-gray-100 text-gray-800 border-gray-300"
                    }`}
                  >
                    {erp[0].delayStatus === "before-time"
                      ? "Before Time"
                      : erp[0].delayStatus === "on-time"
                      ? "On Time"
                      : erp[0].delayStatus === "delayed"
                      ? "Delayed"
                      : erp[0].delayStatus}
                  </div>
                )}
              </div>
            </div>

            <div className="text-md md:text-lg mt-2 flex-grow">
              {/* Only render dates if we actually have them */}
              {targetDates.length > 0 && (
                <>
                  {hasExtendedDate ? (
                    // ---------------------------------------------
                    // CASE: Extended date exists => strike out target date
                    // ---------------------------------------------
                    <div>
                      <span className="text-red-500">Target Date :</span>

                      {/* If there's exactly 1 target date */}
                      {targetDates.length === 1 ? (
                        <span className="mx-2 text-green-500 line-through decoration-red">
                          {targetDates[0]}
                        </span>
                      ) : (
                        // If multiple target dates, show bullet points
                        <ul className="mx-2 text-green-500 list-disc list-inside line-through decoration-red max-h-24 overflow-y-auto">
                          {targetDates.map((date, idx) => (
                            <li key={idx}>{date}</li>
                          ))}
                        </ul>
                      )}

                      {/* Show extended date(s) in red */}
                      {extendedDates.length === 1 ? (
                        <div className="text-red-500 mt-1">
                          {extendedDates[0]}
                        </div>
                      ) : (
                        <ul className="text-red-500 list-disc list-inside mt-1 max-h-24 overflow-y-auto">
                          {extendedDates.map((ed, idx) => (
                            <li key={idx}>{ed}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    // ---------------------------------------------
                    // CASE: No extended date => just show target date(s)
                    // ---------------------------------------------
                    <div className="text-green-500">
                      {/* Single target date vs multiple bullet points */}
                      {targetDates.length === 1 ? (
                        <div>Target Date : {targetDates[0]}</div>
                      ) : (
                        <div>
                          Target Dates :
                          <ul className="list-disc list-inside max-h-24 overflow-y-auto">
                            {targetDates.map((date, idx) => (
                              <li key={idx}>{date}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer content placed at the bottom */}
            <p className="text-sm md:text-md text-gray-500 mt-auto">
              Contacts: {erp[0].primaryContacts.join(", ")}
            </p>
          </div>
        </Link>
      )}
    </>
  );
}

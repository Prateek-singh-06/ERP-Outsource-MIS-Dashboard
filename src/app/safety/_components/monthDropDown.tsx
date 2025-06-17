import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import Months from "@/data/saftey.json"

export function DropdownMenuDemo({selectedMonth,setMonth}:{selectedMonth:string,setMonth:(month:string)=>void}) {
    const [open, setOpen] = useState(false);
    
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
            {selectedMonth || "Select Month"}
          <ChevronDown
            className={`ml-2 transition-transform ${open ? "rotate-180" : ""}`}
            size={18}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Select the month</DropdownMenuLabel>
        <DropdownMenuGroup>
          {Months.map((month) => (
            <DropdownMenuItem
              key={month.Month}
              onClick={() => {
                setMonth(month.Month)
                setOpen(false)
              }}
              style={
                selectedMonth === month.Month
                  ? { backgroundColor: "#e6f0ff" } // Light blue, adjust as needed
                  : {}
              }
            >
              {selectedMonth === month.Month ? (
                <span style={{ marginRight: 1, color: "black" }}>•</span>
              ) : <span style={{ marginRight: 5}}></span>}
              {month.Month}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />      
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

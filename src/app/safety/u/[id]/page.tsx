"use client"
import { useParams } from "next/navigation";
export default function UserDashboard(){
    const { id } = useParams() as { id: string };
    const data={
  "summary": {
    "totalEmployees": 16,
    "totalWorkdays": 22,
    "totalLeaves": 27,
    "totalPresents": 240
  },
  "employees": [
    {
      "slNo": 1,
      "name": "Soumendu Adhikari",
      "employeeId": "",
      "designation": "Safety Manager",
      "mobile": "9615256657",
      "plant": "RML-1",
      "doj": "17.02.25",
      "attendance": ["P", "P", "P", "WO", "WO", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "WO", "WO", "P", "P", "P"],
      "workdays": 18,
      "leaves": 0,
      "weeklyOff": 4,
      "NationalHolidays": 3,
      "PaidLeaves": 2,
      "TotalDaysForPayment": 22
    },
    {
      "slNo": 2,
      "name": "Indrajit Paul",
      "employeeId": "",
      "designation": "Safety Manager",
      "mobile": "7858837201",
      "plant": "RML-6",
      "doj": "18.03.25",
      "attendance": ["WO", "WO", "P", "P", "P", "P", "P", "WO", "P", "P", "P", "P", "P", "P", "WO", "P", "P", "P", "P", "P", "P", "WO"],
      "workdays": 17,
      "leaves": 0,
      "weeklyOff": 5,
      "NationalHolidays": 3,
      "PaidLeaves": 2,
      "TotalDaysForPayment": 22
    },
    {
      "slNo": 3,
      "name": "Susil Kumar Singh",
      "employeeId": "",
      "designation": "Asst. Manager",
      "mobile": "9449521851",
      "plant": "RML-1",
      "doj": "19.03.25",
      "attendance": ["WO", "P", "P", "P", "P", "P", "P", "WO", "P", "P", "P", "P", "P", "P", "WO", "P", "P", "P", "P", "P", "P", "WO"],
      "workdays": 18,
      "leaves": 0,
      "weeklyOff": 4,
      "NationalHolidays": 3,
      "PaidLeaves": 2,
      "TotalDaysForPayment": 22
    },
    {
      "slNo": 4,
      "name": "Sanjib Kumar Jena",
      "employeeId": "",
      "designation": "Safety Manager",
      "mobile": "7537995151",
      "plant": "RML-1",
      "doj": "21.03.25",
      "attendance": ["WO", "P", "P", "P", "P", "P", "P", "WO", "P", "P", "P", "P", "P", "P", "WO", "P", "P", "P", "P", "P", "P", "WO"],
      "workdays": 18,
      "leaves": 0,
      "weeklyOff": 4,
      "NationalHolidays": 3,
      "PaidLeaves": 2,
      "TotalDaysForPayment": 22
    },
    {
      "slNo": 5,
      "name": "Vivek Shai",
      "employeeId": "",
      "designation": "Safety Analyst",
      "mobile": "7706919999",
      "plant": "RML-6",
      "doj": "05.05.25",
      "attendance": ["WO", "P", "L", "L", "L", "L", "L", "L", "L", "P", "P", "P", "P", "P", "WO", "P", "P", "P", "P", "P", "P", "WO"],
      "workdays": 12,
      "leaves": 7,
      "weeklyOff": 3,
      "NationalHolidays": 3,
      "PaidLeaves": 2,
      "TotalDaysForPayment": 22
    },
    {
      "slNo": 6,
      "name": "Ajay Oraon",
      "employeeId": "",
      "designation": "Asst. Manager",
      "mobile": "7980599492",
      "plant": "RML-6",
      "doj": "04.03.25",
      "attendance": ["WO", "L", "L", "P", "P", "P", "P", "WO", "P", "P", "P", "P", "P", "P", "WO", "P", "P", "P", "WO", "P", "P", "P"],
      "workdays": 16,
      "leaves": 2,
      "weeklyOff": 4,
      "NationalHolidays": 3,
      "PaidLeaves": 2,
      "TotalDaysForPayment": 22
    },
    {
      "slNo": 7,
      "name": "Jagjeet Singh Arora",
      "employeeId": "",
      "designation": "Safety Manager",
      "mobile": "8928343446",
      "plant": "RML-1",
      "doj": "17.04.25",
      "attendance": ["WO", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "P", "P", "P", "WO", "P", "P", "P", "P", "P", "P", "WO"],
      "workdays": 9,
      "leaves": 10,
      "weeklyOff": 3,
      "NationalHolidays": 3,
      "PaidLeaves": 2,
      "TotalDaysForPayment": 22
    },
    {
      "slNo": 8,
      "name": "Mesbauddin SK",
      "employeeId": "",
      "designation": "Asst. Manager",
      "mobile": "8918431002",
      "plant": "RML-1",
      "doj": "20.02.25",
      "attendance": ["P", "P", "P", "P", "P", "P", "RH", "WO", "L", "L", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P"],
      "workdays": 18,
      "leaves": 2,
      "weeklyOff": 1,
      "NationalHolidays": 3,
        "PaidLeaves": 2,
        "TotalDaysForPayment": 22
    }
  ]
}
console.log(id);

    return(
        <div>
            hello
        </div>
    )
}
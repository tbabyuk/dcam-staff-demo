"use client"

import {sub, format} from "date-fns"
import { useState } from "react"


export const usePayday = () => {

    const [closestPayday, setClosestPayday] = useState(null)
    const [weekOnePayPeriod, setWeekOnePayPeriod] = useState({})
    const [weekTwoPayPeriod, setWeekTwoPayPeriod] = useState({})


    console.log("closest payday", closestPayday)


    const getWeekOnePayPeriod = () => {
        // week 1 dates
        const weekOneStartDate = sub(new Date(closestPayday), {days: 18})
        const weekOneStartDateFormatted = format(weekOneStartDate, "MMMM d, yyy")
        const weekOneEndDate = sub(new Date(closestPayday), {days: 12 })
        const weekOneEndDateFormatted = format(weekOneEndDate, "MMMM d, yyy")
        setWeekOnePayPeriod({start: weekOneStartDateFormatted, end: weekOneEndDateFormatted })
    }

    const getWeekTwoPayPeriod = () => {
        // week 2 dates
        const weekTwoStartDate = sub(new Date(closestPayday), {days: 11})
        const weekTwoStartDateFormatted = format(weekTwoStartDate, "MMMM d, yyy")
        const weekTwoEndDate = sub(new Date(closestPayday), {days: 5 })
        const weekTwoEndDateFormatted = format(weekTwoEndDate, "MMMM d, yyy")
        setWeekTwoPayPeriod({start: weekTwoStartDateFormatted, end: weekTwoEndDateFormatted }) 
    }


    const getClosestPayday = () => {

        const payDays2023 = ["July 21, 2023", "August 4, 2023", "August 18, 2023", "September 1, 2023", "September 15, 2023", "September 29, 2023", "October 13, 2023", "October 27, 2023", "November 10, 2023", "November 24, 2023", "December 8, 2023", "December 22, 2023"]
    
        const today = new Date()
    
        let res;
    
        for (let i = 0; i < payDays2023.length; i++) {
          if(new Date(payDays2023[i]) > today) {
            res = payDays2023[i]
            break;
          }
        }
        if(res) {
          setClosestPayday(res)
        }
      }
    

  return {closestPayday, getClosestPayday, weekOnePayPeriod, getWeekOnePayPeriod, weekTwoPayPeriod, getWeekTwoPayPeriod }
}

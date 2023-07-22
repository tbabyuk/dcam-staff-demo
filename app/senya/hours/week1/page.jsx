"use client"

import { usePayday } from "@components/hooks/usePayday"

const SenyaHoursWeekOne = () => {
  
  const {name, message} = usePayday()


  return (
    <>
        <div>The name is: {name}, </div>
        <p>Message: {message}</p>
    </>
  )
}

export default SenyaHoursWeekOne
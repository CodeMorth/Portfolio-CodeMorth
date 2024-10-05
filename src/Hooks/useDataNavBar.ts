'use client'
import { lineDataType } from '@/interface/NavBar'
import { useState } from 'react'
import { useLanguage } from './useLanguage'
import { usePathname } from 'next/navigation'

export const useDataNavBar = () => {
  const { languageData } = useLanguage()
  const path = usePathname()

  const dataNavBarInitial = languageData.navbarLanguage.find(
    (data) => data.ref === path
  )

  // State to manage the navigation bar data
  const [dataNavBar, setDataNavBar] = useState({
    isOn: false, // Boolean indicating if the navigation bar is active
    linePresioned: false, // Boolean indicating if a line has been pressed
    lineData: {
      leftLine: dataNavBarInitial?.leftLine,
      widthLine: dataNavBarInitial?.widthLine,
      rotateLine: dataNavBarInitial?.rotateLine
    }, // Data related to line positioning and styling
    lineBackup: {
      leftLine: dataNavBarInitial?.leftLine,
      widthLine: dataNavBarInitial?.widthLine,
      rotateLine: dataNavBarInitial?.rotateLine
    } // Backup of the line data for restoration
  })

  // Function to toggle boolean values or set them to true/false
  const editBoolean = (
    key: 'isOn' | 'linePresioned', // The state property to edit
    value: 'opposite' | 'true' | 'false' // The value to set
  ) => {
    // Determine the new boolean value based on the input
    const newValue = value === 'opposite' ? !dataNavBar[key] : value === 'true'
    // Update the state with the new boolean value
    setDataNavBar((prev) => ({ ...prev, [key]: newValue }))
  }

  // Function to update line data based on the provided key
  const editLineData = (
    key: 'lineData' | 'lineBackup' | 'dataWithBackup', // The property to edit
    data?: lineDataType // New line data (optional)
  ) => {
    // If the key is 'dataWithBackup', restore the line data from the backup
    if (key === 'dataWithBackup') {
      setDataNavBar((prev) => ({ ...prev, lineData: { ...prev.lineBackup } }))
    } else if (data) {
      // If new data is provided, update the specified line data
      setDataNavBar((prev) => ({ ...prev, [key]: { ...data } }))
    }
  }

  // Return the current state and the functions to manipulate it
  return { dataNavBar, editBoolean, editLineData }
}

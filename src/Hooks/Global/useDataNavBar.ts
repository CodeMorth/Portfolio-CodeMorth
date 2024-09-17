"use client"
import { lineDataType } from '@/interface/NavBar'
import { useState } from 'react'

export const useDataNavBar = () => {
  const [dataNavBar, setDataNavBar] = useState({
    isOn: false,
    linePresioned: false,
    lineData: { leftLine: 3, widthLine: 9.3, rotateLine: 3 },
    lineBackup: { leftLine: 3, widthLine: 9.3, rotateLine: 3 }
  })

  const editBoolean = (
    key: 'isOn' | 'linePresioned',
    value: 'opposite' | 'true' | 'false'
  ) => {
    const newValue = value === 'opposite' ? !dataNavBar[key] : value === 'true'
    setDataNavBar((prev) => ({ ...prev, [key]: newValue }))
  }

  const editLineData = (
    key: 'lineData' | 'lineBackup' | 'dataWithBackup',
    data?: lineDataType
  ) => {
    if (key === 'dataWithBackup') {
      setDataNavBar((prev) => ({ ...prev, lineData: { ...prev.lineBackup } }))
    } else if (data) {
      setDataNavBar((prev) => ({ ...prev, [key]: { ...data } }))
    }
  }

  return { dataNavBar, editBoolean, editLineData }
}

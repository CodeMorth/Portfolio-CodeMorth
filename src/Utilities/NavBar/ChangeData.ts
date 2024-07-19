import { lineDataType } from '@/interface/NavBar'

export const ChangeData = (
  data: lineDataType,
  changeable1: React.Dispatch<React.SetStateAction<lineDataType>>,
  changeable2?: React.Dispatch<React.SetStateAction<lineDataType>>
) => {
  changeable1((prev) => ({
    ...prev,
    leftLine: data.leftLine,
    widthLine: data.widthLine,
    rotateLine: data.rotateLine
  }))
  if(changeable2){
    changeable2((prev) => ({
      ...prev,
      leftLine: data.leftLine,
      widthLine: data.widthLine,
      rotateLine: data.rotateLine
    }))
  }
}

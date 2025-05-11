import Hints from './Hints'
import PuzzleInfo from './PuzzleInfo'

export type TFormStepProps = {
  formStep: number
  setFormStep: React.Dispatch<React.SetStateAction<number>>
  steps: TFormStep<TFormStepProps>[]
}

export type TFormStep<T> = {
  id: string
  title: string
  description: string
  component: React.FC<T>
}

export const steps: TFormStep<TFormStepProps>[] = [
  {
    id: 'puzzle-info',
    title: 'Informações do puzzle',
    description: 'Preencha as informações do puzzle',
    component: PuzzleInfo,
  },
  {
    id: 'hints',
    title: 'Dicas',
    description: 'Preencha as dicas do puzzle',
    component: Hints,
  },
]

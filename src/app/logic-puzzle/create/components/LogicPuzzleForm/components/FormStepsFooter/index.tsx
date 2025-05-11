import { Button } from '@/components/ui/button'
import { FC } from 'react'

import { TFormStep, TFormStepProps } from '../formSteps'

const FormStepsFooter: FC<{
  formStep: number
  setFormStep: (step: number) => void
  steps: TFormStep<TFormStepProps>[]
  submit?: boolean
  submitFn?: () => void
}> = ({ formStep, setFormStep, steps, submitFn, submit = true }) => {
  return (
    <footer className="flex justify-between">
      {formStep > 0 ? (
        <Button variant={'outline'} onClick={() => setFormStep(formStep - 1)}>
          Voltar
        </Button>
      ) : (
        <div />
      )}
      {formStep < steps.length - 1 ? (
        <Button type={submit ? 'submit' : 'button'} onClick={submitFn}>
          Avançar
        </Button>
      ) : (
        <Button>Salvar</Button>
      )}
    </footer>
  )
}

export default FormStepsFooter

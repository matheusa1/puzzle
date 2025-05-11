'use client'

import { FC, useState } from 'react'

import { steps } from './components/formSteps'

const LogicPuzzleForm: FC = () => {
  const [formStep, setFormStep] = useState<number>(0)
  const currentStep = steps[formStep]

  return (
    <div className="flex flex-col space-y-4 h-full">
      <header className="flex flex-col space-y-1">
        <h4 className="h4">{currentStep.title}</h4>
        <span className="muted">{currentStep.description}</span>
      </header>
      <currentStep.component
        formStep={formStep}
        setFormStep={setFormStep}
        steps={steps}
      />
    </div>
  )
}

export default LogicPuzzleForm

'use client'

import { usePuzzleInfoContext } from '@/app/logic-puzzle/create/context/puzzleInfoContext'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FC } from 'react'

import FormStepsFooter from '../FormStepsFooter'
import { TFormStepProps } from '../formSteps'

const OptionsForm: FC<TFormStepProps> = ({ formStep, setFormStep, steps }) => {
  const { puzzleInfo } = usePuzzleInfoContext()

  return (
    <div className={'flex flex-col space-y-8 h-full'}>
      <div className={'flex flex-col space-y-4 flex-1'}>
        <Accordion type="single" collapsible>
          {puzzleInfo?.attribute?.map((attribute) => (
            <AccordionItem value={attribute.id} key={attribute.id}>
              <AccordionTrigger>
                <div className="flex items-center justify-between w-full">
                  <span>{attribute.name}</span>
                  <span className="text-muted-foreground">
                    {attribute.options.length} opções
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>asd</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <FormStepsFooter
        formStep={formStep}
        setFormStep={setFormStep}
        steps={steps}
      />
    </div>
  )
}

export default OptionsForm

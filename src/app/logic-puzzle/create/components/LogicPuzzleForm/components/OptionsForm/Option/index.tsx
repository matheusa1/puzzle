import { TAttribute } from '@/@core/modules/attribute/entity/attribute.entity'
import { FC } from 'react'

type TOption = {
  attribute: TAttribute
  setAttribute: (attribute: TAttribute) => void
}

const Option: FC<TOption> = ({ attribute }) => {
  return (
    <div className={''}>
      <h1>Option</h1>
    </div>
  )
}

export default Option

import { hint } from '../../../../../prisma/generated/prisma'
import { TCreateHint } from './hint.entity'

export interface IHintGateway {
  create: (params: TCreateHint) => Promise<hint>
}

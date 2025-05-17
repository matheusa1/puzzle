import { TCreateHintNoOrderSchema } from '@/@core/modules/hint/schema/create.schema'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash } from 'lucide-react'
import { FC } from 'react'

const Hint: FC<{
  hint: TCreateHintNoOrderSchema & { id: number }
  onDelete: () => void
}> = ({ hint, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: hint.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="p-2 hover:bg-accent rounded-sm flex space-x-4 items-center"
    >
      <GripVertical size={16} {...listeners} className="cursor-grab" />

      <span className="flex-1">{hint.text}</span>
      <Trash
        className="text-destructive cursor-pointer"
        onClick={onDelete}
        size={16}
      />
    </div>
  )
}

export default Hint

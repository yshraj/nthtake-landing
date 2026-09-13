'use client'

import { useId, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

type CheckboxCopy = {
  description: string
  label: string
  actionLabel?: string
}

const checkboxCopy: CheckboxCopy = {
  label: 'Submit this round',
  description: 'Notes lock to Take 03. The next upload is a new take, not another email chain.',
  actionLabel: 'Submit round'
}

const Checkbox16 = ({
  label = checkboxCopy.label,
  description = checkboxCopy.description,
  actionLabel = checkboxCopy.actionLabel,
}: Partial<CheckboxCopy> = {}) => {
  const id = useId()
  const [isChecked, setIsChecked] = useState<boolean>(true)

  const handleReset = () => {
    setIsChecked(false)
  }

  return (
    <div className='flex max-w-sm items-start gap-3.5'>
      <Checkbox
        id={id}
        checked={isChecked}
        onCheckedChange={(checked) => setIsChecked(checked === true)}
        className='mt-0.5 data-checked:border-primary data-checked:bg-primary dark:data-checked:border-primary dark:data-checked:bg-primary'
      />
      <div className='grid gap-2.5'>
        <Label htmlFor={id} className='text-sm leading-4 font-medium'>
          {label}
        </Label>
        <p className='text-muted-foreground text-[13px] leading-5'>
          {description}
        </p>
        <div className='flex flex-wrap gap-2'>
          <Button variant='outline' size='sm' onClick={handleReset}>
            Reset
          </Button>
          <Button
            size='sm'
            disabled={!isChecked}
            className='bg-primary text-primary-foreground hover:bg-primary/90'
          >
            {actionLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Checkbox16

import { InputHTMLAttributes } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ImageUp, X } from 'lucide-react'
import { Media } from '@/generated/prisma/client'
import { RefCallBack } from 'react-hook-form'

export type FileUploadProps = InputHTMLAttributes<HTMLInputElement> & {
  formFiles?: FileList | null
  existingFiles?: Media[]
  removedExistingFiles?: Media[]
  formSetValue: (files: FileList) => void
  setRemovedExistingFile: (media: Media) => void
}

const FileUpload = ({
  ref,
  formFiles,
  existingFiles,
  removedExistingFiles,
  formSetValue,
  setRemovedExistingFile,
  ...props
}: FileUploadProps & {
  ref: React.RefObject<HTMLInputElement> | RefCallBack
}) => {
  const formFilesArray = formFiles ? Array.from(formFiles) : []

  const handleRemoveFile = (fileToRemove: File) => {
    const currentFiles = formFiles ? Array.from(formFiles) : []
    const updatedFiles = currentFiles.filter((file) => file !== fileToRemove)

    const dataTransfer = new DataTransfer()
    updatedFiles.forEach((file) => dataTransfer.items.add(file))

    formSetValue(dataTransfer.files)
  }

  return (
    <>
      <div className='relative h-32 w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-md cursor-pointer text-muted-foreground'>
        <ImageUp className='h-6 w-6 mb-4' />
        <p className='z-0'>Prevucite fajlove ovde ili kliknite za upload</p>
        <Input
          className='absolute w-full h-full opacity-0 z-10'
          ref={ref}
          {...props}
        />
      </div>
      {formFilesArray.length > 0 &&
        formFilesArray.map((file) => (
          <Badge key={file.name} className='max-w-full rounded-full mt-2 mr-2'>
            <span className='truncate'>{file.name}</span>
            <X
              className='ml-2 h-4 w-4'
              onClick={() => handleRemoveFile(file)}
            />
          </Badge>
        ))}
      {existingFiles?.map((file) => {
        if (!removedExistingFiles?.includes(file)) {
          return (
            <Badge key={file.id} className='max-w-full rounded-full mt-2 mr-2'>
              <span className='truncate'>{file.name}</span>
              <X
                className='ml-2 h-4 w-4'
                onClick={() => setRemovedExistingFile(file)}
              />
            </Badge>
          )
        }
      })}
    </>
  )
}

FileUpload.displayName = 'FileUpload'

export { FileUpload }

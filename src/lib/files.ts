import { getSignedURL } from '@/lib/actions'

const computeSHA256 = async (file: File): Promise<string> => {
  const buffer = await file.arrayBuffer()
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

type UploadFileReturnTypes = {
  key: string
  name: string
  type: string
  fileURL: string
}

export const uploadFile = async (
  file: File
): Promise<UploadFileReturnTypes> => {
  const { name, type, size } = file
  const checksum = await computeSHA256(file)
  const { signedURL, key } = await getSignedURL(name, type, size, checksum)

  await fetch(signedURL, {
    method: 'PUT',
    body: file,
    headers: { 'Content-Type': type },
  })

  const fileURL = signedURL.split('?')[0]

  return { key, name, type, fileURL }
}

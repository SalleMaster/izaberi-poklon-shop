import { PostForm } from '../_components/PostForm'

export default function NewPost() {
  return (
    <div className='container mx-auto mt-10'>
      <h1 className='mb-8'>Create post</h1>

      <PostForm />
    </div>
  )
}

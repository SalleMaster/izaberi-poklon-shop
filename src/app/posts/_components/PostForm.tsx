'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import {
  CreatePostValues,
  createPostSchema,
  editPostSchema,
} from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  createPost,
  deletePost,
  createMedia,
  editPost,
} from '@/app/posts/_actions/actions'
import { Post, Media } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import { uploadFile } from '@/lib/files'
import { FileUpload } from '@/components/custom/FileUpload'

type PostWithMedia = Post & {
  media: Media | null
}

export function PostForm({ post }: { post?: PostWithMedia | null }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [removedMedia, setRemovedMedia] = useState<Media[]>([])
  const { toast } = useToast()

  const form = useForm<CreatePostValues>({
    resolver: zodResolver(post ? editPostSchema : createPostSchema),
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      published: post?.published || false,
    },
  })

  const imageRef = form.register('image')

  async function onSubmit(data: CreatePostValues) {
    try {
      let mediaId = post?.media?.id

      // Upload new file if provided
      if (data.image && data.image.length > 0) {
        const { key, name, type, fileURL } = await uploadFile(data.image[0])
        const media = await createMedia(key, name, type, fileURL)
        mediaId = media.id
      }

      if (post) {
        // Edit post case
        await editPost(
          {
            title: data.title,
            content: data.content,
            published: data.published,
          },
          post.slug,
          removedMedia,
          mediaId
        )
        toast({ description: 'Post updated.' })
      } else {
        // Create post case
        await createPost(
          {
            title: data.title,
            content: data.content,
            published: data.published,
          },
          mediaId
        )
        toast({ description: 'Post created.' })
      }

      form.reset()
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        description: 'An error occurred. Please try again.',
      })
    }
  }

  const onDelete = async (slug: string) => {
    setIsDeleting(true)
    try {
      await deletePost(slug)
    } catch (error) {
      toast({
        variant: 'destructive',
        description:
          error instanceof Error
            ? error.message
            : 'Failed to delete post. Please try again.',
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='max-w-sm space-y-2.5'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Enter a post title' {...field} />
              </FormControl>
              <FormDescription>Your post title</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input placeholder='Enter a post content' {...field} />
              </FormControl>
              <FormDescription>Your post content</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='image'
          render={() => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <FileUpload
                  type='file'
                  multiple
                  formFiles={form.getValues('image')}
                  formSetValue={(values) => form.setValue('image', values)}
                  existingFiles={post?.media ? [post.media] : []}
                  removedExistingFiles={removedMedia}
                  setRemovedExistingFile={(media) =>
                    setRemovedMedia((prev) => [...prev, media])
                  }
                  {...imageRef}
                />
              </FormControl>
              <FormDescription>Your post content</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='published'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='mr-4'>Published</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>Is your post published</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex justify-between'>
          <Button type='submit' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : null}
            Submit
          </Button>
        </div>
      </form>
      {post?.slug ? (
        <Button
          variant='destructive'
          onClick={() => onDelete(post.slug)}
          disabled={isDeleting}
          className='mt-4'
        >
          {isDeleting ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          ) : null}
          Delete
        </Button>
      ) : null}
    </Form>
  )
}

'use client';
import Image from 'next/image' 
import { useEffect } from 'react'
 
export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <section className='container items-center py-20 text-center'>
      <h1 className='text-5xl mb-6'>Something went wrong!</h1>
      <Image src="/error.jpg" alt="Error" width={400} height={300} className="mx-auto mb-6" />

      <button className='dark-button'
        onClick={
          // Attempt to recover by re-fetching and re-rendering the segment
          () => unstable_retry()
        }
      >
        Try again
      </button>
    </section>
  )
}
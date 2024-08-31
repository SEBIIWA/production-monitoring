import Link from 'next/link'
import Head from 'next/head'
import { Fragment } from 'react'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function ForgetPassword() {
  return (
    <Fragment>
      <Head>
        <title>Rest | WIP Stock Monitoring</title>
      </Head>
      <div className='w-full h-full min-h-dvh flex flex-col items-center justify-center'>
        <div className='mx-auto max-w-md space-y-6 p-6'>
          <div className='space-y-2 text-center'>
            <h1 className='text-3xl font-bold'>Forgot Password</h1>
            <p className='text-sm text-balance text-muted-foreground'>Enter your username below and {"we'll"} alert your administrator to reset your password.</p>
          </div>
          <form className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='username'>Username</Label>
              <Input id='username' type='text' placeholder='Enter tour username' required pattern='[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$' />
            </div>
            <Button type='submit' className='w-full mt-4'>
              Reset Password
            </Button>
          </form>
          <div className='text-center'>
            <Link href='/' className='mx-auto inline-block text-sm underline'>
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

import Link from 'next/link'
import Head from 'next/head'
import { Fragment } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginFormSchema, loginFormDefaultValues, LoginFormType } from '@/schema/login.form'

export default function Index() {
  const { push } = useRouter()

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { ...loginFormDefaultValues },
  })

  return (
    <Fragment>
      <Head>
        <title>Login | WIP Stock Monitoring</title>
      </Head>
      <div className='w-full h-full min-h-dvh grid grid-cols-2'>
        <div className='flex items-center justify-center py-12'>
          <div className='mx-auto grid w-[350px] gap-6'>
            <div className='grid gap-2 text-center'>
              <h1 className='text-3xl font-bold'>Login</h1>
              <p className='text-sm text-balance text-muted-foreground'>Enter your email below to login to your account</p>
            </div>
            <Form {...form}>
              <div className='grid gap-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <div className='grid gap-2'>
                        <FormLabel htmlFor='email'>Email</FormLabel>
                        <FormControl>
                          <Input id='email' type='email' placeholder='m@example.com' required {...field} autoComplete='off' />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <div className='grid gap-2'>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <FormControl>
                          <Input id='password' placeholder='Enter your password' type='password' required {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type='submit' className='w-full mt-4' onClick={form.handleSubmit((data) => push('/dashboard'))}>
                  Login
                </Button>
                <Link href='/forgot-password' className='mx-auto inline-block text-sm underline'>
                  Forgot your password?
                </Link>
              </div>
            </Form>
          </div>
        </div>
        <div className='w-full h-full hidden bg-muted lg:flex lg:items-center lg:justify-center lg:flex-col overflow-hidden'>
          <Image src='https://preview.keenthemes.com/metronic8/react/demo1/media/misc/auth-screens.png' alt='Image' width={700} height={700} className='object-cover mb-20' />
          <h1 className='text-3xl font-semibold tracking-tight pb-4'>Fast, Efficient and Productive</h1>
          <p className='max-w-lg text-center text-sm'>Transform Your Workflow with Fast, Efficient, and Productive WIP Stock Monitoring</p>
        </div>
      </div>
    </Fragment>
  )
}

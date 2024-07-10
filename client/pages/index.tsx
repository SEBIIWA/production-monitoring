import Image from 'next/image'
import Link from 'next/link'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginFormSchema, loginFormDefaultValues, LoginFormType } from '@/schema/login.form'

export default function Index() {
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { ...loginFormDefaultValues },
  })

  return (
    <div className='w-full h-full min-h-dvh grid grid-cols-2 p-6'>
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
                        <Input id='email' type='email' placeholder='m@example.com' required {...field} />
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

              <Button type='submit' className='w-full mt-4' onClick={form.handleSubmit((data) => console.log(data))}>
                Login
              </Button>
              <Link href='/forgot-password' className='mx-auto inline-block text-sm underline'>
                Forgot your password?
              </Link>
            </div>
          </Form>
        </div>
      </div>
      <div className='hidden bg-muted rounded-xl lg:block overflow-hidden border'>
        <Image
          src='https://keenthemes.com/static/metronic/tailwind/dist/assets/media/images/2600x1600/1.png'
          alt='Image'
          width='1920'
          height='1080'
          className='h-full w-full rounded-xl object-cover border'
        />
      </div>
    </div>
  )
}

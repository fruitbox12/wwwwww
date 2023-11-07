'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function LoginScreen() {
    const { handleSubmit, register } = useForm()
    const router = useRouter()

    const onSubmit = async (data: any) => {
        try {
            const res = await signIn('credentials', {
                ...data,
                redirect: false
            })

            if (res?.error) {
                toast.error('Invalid credentials')
                return
            }

            router.replace('dashboard')
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <div className='flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                    {/* <img
                        className='mx-auto h-10 w-auto'
                        src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                        alt='Your Company'
                    /> */}
                    <h2 className='mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Sign in to your account</h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]'>
                    <div className='bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12'>
                        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                                    Email address
                                </label>
                                <div className='mt-2'>
                                    <input
                                        id='email'
                                        type='email'
                                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                        {...register('email', {
                                            required: 'Email is required'
                                        })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor='password' className='block text-sm font-medium leading-6 text-gray-900'>
                                    Password
                                </label>
                                <div className='mt-2'>
                                    <input
                                        id='password'
                                        type='password'
                                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                        {...register('password', {
                                            required: 'Password is required'
                                        })}
                                    />
                                </div>
                            </div>

                            <div className='flex items-center justify-between'>
                                <div className='text-sm leading-6'>
                                    <Link href='/register' className='font-semibold text-indigo-600 hover:text-indigo-500'>
                                        Don&apos;t have an account? Sign Up
                                    </Link>
                                </div>

                                <div className='text-sm leading-6'>
                                    <Link href='#' className='font-semibold text-indigo-600 hover:text-indigo-500'>
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <button
                                    type='submit'
                                    className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <div>
                            <div className='relative mt-10'>
                                <div className='absolute inset-0 flex items-center' aria-hidden='true'>
                                    <div className='w-full border-t border-gray-200' />
                                </div>
                                <div className='relative flex justify-center text-sm font-medium leading-6'>
                                    <span className='bg-white px-6 text-gray-900'>Or continue with</span>
                                </div>
                            </div>

                            <div className='mt-6 grid gap-4'>
                                <button
                                    className='flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0] border'
                                    onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                                >
                                    <svg
                                        id='Capa_1'
                                        version='1.1'
                                        viewBox='0 0 150 150'
                                        xmlSpace='preserve'
                                        className='h-8 w-8'
                                        xmlns='http://www.w3.org/2000/svg'
                                        xmlnsXlink='http://www.w3.org/1999/xlink'
                                    >
                                        <style type='text/css'>{`
	.st0{fill:#1A73E8;}
	.st1{fill:#EA4335;}
	.st2{fill:#4285F4;}
	.st3{fill:#FBBC04;}
	.st4{fill:#34A853;}
	.st5{fill:#4CAF50;}
	.st6{fill:#1E88E5;}
	.st7{fill:#E53935;}
	.st8{fill:#C62828;}
	.st9{fill:#FBC02D;}
	.st10{fill:#1565C0;}
	.st11{fill:#2E7D32;}
	.st12{fill:#F6B704;}
	.st13{fill:#E54335;}
	.st14{fill:#4280EF;}
	.st15{fill:#34A353;}
	.st16{clip-path:url(#SVGID_2_);}
	.st17{fill:#188038;}
	.st18{opacity:0.2;fill:#FFFFFF;enable-background:new    ;}
	.st19{opacity:0.3;fill:#0D652D;enable-background:new    ;}
	.st20{clip-path:url(#SVGID_4_);}
	.st21{opacity:0.3;fill:url(#_45_shadow_1_);enable-background:new    ;}
	.st22{clip-path:url(#SVGID_6_);}
	.st23{fill:#FA7B17;}
	.st24{opacity:0.3;fill:#174EA6;enable-background:new    ;}
	.st25{opacity:0.3;fill:#A50E0E;enable-background:new    ;}
	.st26{opacity:0.3;fill:#E37400;enable-background:new    ;}
	.st27{fill:url(#Finish_mask_1_);}
	.st28{fill:#FFFFFF;}
	.st29{fill:#0C9D58;}
	.st30{opacity:0.2;fill:#004D40;enable-background:new    ;}
	.st31{opacity:0.2;fill:#3E2723;enable-background:new    ;}
	.st32{fill:#FFC107;}
	.st33{opacity:0.2;fill:#1A237E;enable-background:new    ;}
	.st34{opacity:0.2;}
	.st35{fill:#1A237E;}
	.st36{fill:url(#SVGID_7_);}
	.st37{fill:#FBBC05;}
	.st38{clip-path:url(#SVGID_9_);fill:#E53935;}
	.st39{clip-path:url(#SVGID_11_);fill:#FBC02D;}
	.st40{clip-path:url(#SVGID_13_);fill:#E53935;}
	.st41{clip-path:url(#SVGID_15_);fill:#FBC02D;}
`}</style>
                                        <g>
                                            <path
                                                className='st14'
                                                d='M120,76.1c0-3.1-0.3-6.3-0.8-9.3H75.9v17.7h24.8c-1,5.7-4.3,10.7-9.2,13.9l14.8,11.5   C115,101.8,120,90,120,76.1L120,76.1z'
                                            />
                                            <path
                                                className='st15'
                                                d='M75.9,120.9c12.4,0,22.8-4.1,30.4-11.1L91.5,98.4c-4.1,2.8-9.4,4.4-15.6,4.4c-12,0-22.1-8.1-25.8-18.9   L34.9,95.6C42.7,111.1,58.5,120.9,75.9,120.9z'
                                            />
                                            <path
                                                className='st12'
                                                d='M50.1,83.8c-1.9-5.7-1.9-11.9,0-17.6L34.9,54.4c-6.5,13-6.5,28.3,0,41.2L50.1,83.8z'
                                            />
                                            <path
                                                className='st13'
                                                d='M75.9,47.3c6.5-0.1,12.9,2.4,17.6,6.9L106.6,41C98.3,33.2,87.3,29,75.9,29.1c-17.4,0-33.2,9.8-41,25.3   l15.2,11.8C53.8,55.3,63.9,47.3,75.9,47.3z'
                                            />
                                        </g>
                                    </svg>

                                    <span className='text-sm font-semibold leading-6'>Continue with Google</span>
                                </button>

                                {/* <a
                                    href='#'
                                    className='flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]'
                                >
                                    <svg className='h-5 w-5' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20'>
                                        <path
                                            fillRule='evenodd'
                                            d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                    <span className='text-sm font-semibold leading-6'>GitHub</span>
                                </a> */}
                            </div>
                        </div>
                    </div>

                    {/* <p className='mt-10 text-center text-sm text-gray-500'>
                        Not a member?{' '}
                        <a href='#' className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'>
                            Start a 14 day free trial
                        </a>
                    </p> */}
                </div>
            </div>
        </>
    )
}

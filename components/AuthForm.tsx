"use client"
import React from 'react'
import { z } from "zod"
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import {Form,} from "@/components/ui/form"
import { toast } from 'sonner'
import FormField from './FormField'
import { useRouter } from 'next/navigation'
import {auth} from "@/firebase/client"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { signUp, signIn } from '@/lib/actions/auth.action'


const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};


const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter();
  
    const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
      },
    });
  
    
      async function onSubmit(values: z.infer<typeof formSchema>) {
       try {   
        if (type === "sign-up"){
            const { name, email, password } = values;

            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

            const result  = await signUp({
              uid: userCredentials.user.uid,
              name: name!,
              email,
              password,
            })

            if(!result?.success){
                toast.error(result?.message)
                return;
            }
            toast.success("Account Created Successfully. Please Sign In");
            router.push("/sign-in")
        } else {

          const { email, password } = values;
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);

            const idToken = await userCredentials.user.getIdToken();

            if(!idToken) {
                toast.error("Error signing in");
                return;
            }

            await signIn({
                email,
                idToken,
            })


            toast.success("Logged In Successfully");
            router.push('/');
        }
       } catch (error) {
        console.log("Error")
        toast.error(`Something went wrong : ${error}`)
       }
        console.log(values)
      }
      const isSignIn = type === "sign-in"
  return (
    <div className='card-border lg:min-w-[566px]'>
        <div className='flex flex-col gap-6 card py-14 px-10'>
        <div className='flex flex-row gap-2 justify-center'>
            <Image src="/logo.svg" alt="logo" height={32} width={38}></Image>
            <h2 className='text-primary-100'>PrepX</h2>
        </div>
        <h3>
            Master your skills with PrepX
        </h3>
        
        <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mt-4 form">
        {! isSignIn && (
            <FormField 
            control={form.control} 
            name="name" 
            label="Name" 
             placeholder="Your Name"/>
        )}
        <FormField 
            control={form.control} 
            name="email" 
            label="Email" 
            placeholder="Yout Email"/>
        <FormField 
            control={form.control} 
            name="password" 
            label="Password" 
            placeholder="Your Password"
            type='password'/>
      <Button className='btn' type="submit">
        {isSignIn ? 'Sign In' : 'Create an Account'}
      </Button>
    </form>
  </Form>

  <p className='text-center'>
    {isSignIn ? "Don't have an account?" : "Already have an account?"}
    <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className='font-bold text-user-primary ml-1'>
    {!isSignIn ? 'Sign In' : 'Sign Up'}
    </Link>
  </p>
  </div>
  </div>
  )
}

export default AuthForm
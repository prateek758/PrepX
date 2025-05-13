import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/InterviewCard'
const Page = () => {
  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>
            Get interview ready with PrepX
          </h2>
          <p className='text-lg'>
            PrepX is a platform that helps you prepare for technical interviews by providing a collection of coding challenges, solutions, and explanations. It also offers a community-driven approach to learning, where users can share their knowledge and experiences with others.
          </p>
          <Button asChild className='btn-primary max-sm:w-full'>
            <Link href="/interview">
            Start an interview !
            </Link>
          </Button>
        </div>

        <Image src='/robot.png' alt='robot' height={400} width={400} className='max-sm:hidden'/>
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>
          Your Interview's
        </h2>

        <div className='intervews-section'>
        {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id}/>
            ))}
          {/* <p>
            You haven't taken any interview yet.
          </p> */}
        </div>
      </section>
      
      <section className='flex flex-col gap-6 mt-8'>
        <h2>
          Take an interview
        </h2>
        <div className='intervews-section'>
        {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id}/>
            ))}
          {/* <p>
            There are no interviews available at the moment.
          </p> */}
        </div>
      </section>
    </>
  )
}

export default Page
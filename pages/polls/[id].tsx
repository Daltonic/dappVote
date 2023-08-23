import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Details from '@/components/Details'
import Contestants from '@/components/Contestants'
import Head from 'next/head'
import ContestPoll from '@/components/ContestPoll'
import { GetServerSidePropsContext } from 'next'
import { getPoll } from '@/services/blockchain'
import { PollStruct, RootState } from '@/utils/types'
import { useDispatch, useSelector } from 'react-redux'
import { globalActions } from '@/store/globalSlices'
import { useEffect } from 'react'
import UpdatePoll from '@/components/UpdatePoll'

export default function Polls({ pollData }: { pollData: PollStruct }) {
  const dispatch = useDispatch()
  const { setPoll } = globalActions
  const { poll } = useSelector((states: RootState) => states.globalStates)

  useEffect(() => {
    dispatch(setPoll(pollData))
  }, [dispatch, setPoll, pollData])

  return (
    <>
      {poll && (
        <Head>
          <title>Poll | {poll.title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      )}

      <div className="min-h-screen relative backdrop-blur">
        <div
          className="absolute inset-0 before:absolute before:inset-0
          before:w-full before:h-full before:bg-[url('/assets/images/bg.jpeg')]
          before:blur-sm before:z-[-1] before:bg-no-repeat before:bg-cover"
        />

        <section className="relative px-5 py-10 space-y-16 text-white sm:p-10">
          <Navbar />
          {poll && <Details poll={poll} />}
          <Contestants />
          <Footer />
        </section>

        <ContestPoll />
        {poll && <UpdatePoll pollData={poll} />}
      </div>
    </>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.query
  const pollData = await getPoll(Number(id))

  return {
    props: {
      pollData: JSON.parse(JSON.stringify(pollData)),
    },
  }
}

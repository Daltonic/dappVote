import Banner from '@/components/Banner'
import CreatePoll from '@/components/CreatePoll'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Polls from '@/components/Polls'
import { getPolls } from '@/services/blockchain'
import { globalActions } from '@/store/globalSlices'
import { PollStruct, RootState } from '@/utils/types'
import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Home({ pollsData }: { pollsData: PollStruct[] }) {
  const dispatch = useDispatch()
  const { setPolls } = globalActions
  const { polls } = useSelector((states: RootState) => states.globalStates)

  useEffect(() => {
    dispatch(setPolls(pollsData))
  }, [dispatch, setPolls, pollsData])

  return (
    <>
      <Head>
        <title>Available Polls</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen relative backdrop-blur">
        <div
          className="absolute inset-0 before:absolute before:inset-0
        before:w-full before:h-full before:bg-[url('/assets/images/bg.jpeg')]
        before:blur-sm before:z-[-1] before:bg-no-repeat before:bg-cover"
        />

        <section className="relative px-5 py-10 space-y-16 text-white sm:p-10">
          <Navbar />
          <Banner />
          <Polls polls={polls} />
          <Footer />
        </section>
        <CreatePoll />
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const pollsData: PollStruct[] = await getPolls()
  return {
    props: { pollsData: JSON.parse(JSON.stringify(pollsData)) },
  }
}

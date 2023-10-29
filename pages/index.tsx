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
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr to-blue-700 from-indigo-900 p-10">
  <div className="w-max">
  <h1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl text-white font-bold">
      Oracle Vote</h1>
        <section className="circles">
          <Navbar />
          <Banner />
          <Polls polls={polls} />
          <Footer />
        </section>
        <CreatePoll />
      </div>
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

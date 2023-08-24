import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Details from '@/components/Details'
import Contestants from '@/components/Contestants'
import Head from 'next/head'
import ContestPoll from '@/components/ContestPoll'
import { GetServerSidePropsContext } from 'next'
import { ContestantStruct, PollStruct } from '@/utils/types'
import UpdatePoll from '@/components/UpdatePoll'
import DeletePoll from '@/components/DeletePoll'
import { generateFakeContestants, generateFakePolls } from '@/services/data'

export default function Polls({
  poll,
  contestants,
}: {
  poll: PollStruct
  contestants: ContestantStruct[]
}) {
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
          {poll && contestants && <Contestants poll={poll} contestants={contestants} />}
          <Footer />
        </section>

        {poll && <ContestPoll poll={poll} />}
        {poll && <DeletePoll poll={poll} />}
        {poll && <UpdatePoll pollData={poll} />}
      </div>
    </>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.query
  const pollData = generateFakePolls(1)[0]
  const contestantData = generateFakeContestants(2)

  return {
    props: {
      poll: JSON.parse(JSON.stringify(pollData)),
      contestants: JSON.parse(JSON.stringify(contestantData)),
    },
  }
}

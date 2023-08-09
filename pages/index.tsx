import Banner from '@/components/Banner'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Polls from '@/components/Polls'
import Head from 'next/head'


export default function Home() {
  return (
    <div>
      <Head>
        <title>blueVote</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen relative backdrop-blur">
        <div className="absolute inset-0 before:absolute before:inset-0
      before:w-full before:h-full before:bg-[url('/assets/images/bg.jpeg')]
      before:blur-sm before:z-[-1] before:bg-no-repeat before:bg-cover"></div>
        <section className="relative px-5 py-10 space-y-16 text-white sm:p-10">
          <Navbar />
          <Banner />
          <Polls />
          <Footer />
        </section>
      </div>
    </div>
  )
}

import HeaderMarketing from 'components/HeaderMarketing'
import Hero from 'components/Hero'
import Footer from 'components/Footer'

export default function Index() {
    return (
      <div className='flex flex-1 flex-col container w-screen'>
      {/* <ConnectWallet/> */}
        <HeaderMarketing/>
        <Hero/>
        <Footer/>
      </div>
    )
}

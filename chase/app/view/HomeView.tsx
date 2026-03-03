import React from 'react'
import Navbar from '../component/Navbar'
import Hero from '../component/Hero'
import Ticker from '../component/Ticker'
import About from '../component/About'
import Projects from '../component/Projects'
import Collaborators from '../component/Collaborators'
import Contact from '../component/Contact'
import Footer from '../component/Footer'

const HomeView = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Ticker/>
      <About/>
      <Projects/>
      <Collaborators/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default HomeView

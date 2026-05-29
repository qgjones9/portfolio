import Footer from './components/Footer'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <div id="top" className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <section id="projects" className="mt-16 scroll-mt-20">
          Project Gallery
        </section>
        <section id="contact" className="mt-16 scroll-mt-20">
          Contact Form
        </section>
      </main>
      <Footer />
    </div>
  )
}

import Navigation from '../components/Navigation'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <section className="bg-gray-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">APEX FITNESS</h1>
            <p className="text-xl mb-8">Transform Your Body, Transform Your Life</p>
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full">
              Start Your Journey
            </button>
          </div>
        </section>
      </main>
    </>
  )
}

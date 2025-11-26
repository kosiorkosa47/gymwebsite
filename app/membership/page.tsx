import Navigation from '../../components/Navigation'

export default function Membership() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <section className="bg-gray-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Membership</h1>
            <p className="text-xl mb-8">Choose your membership plan</p>
          </div>
        </section>
      </main>
    </>
  )
}

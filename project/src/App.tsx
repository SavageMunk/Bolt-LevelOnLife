import { useEffect, useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import PartyPage from './PartyPage'
import GuildPage from './GuildPage'

function App() {
  useEffect(() => {
    document.title = 'Level on Life'
  }, [])

  const [menuOpen, setMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<'feed' | 'party' | 'guild'>('feed')

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="w-full relative z-10 flex flex-col items-center">
        <div className="w-full bg-primary text-white shadow-md flex flex-col flex-grow min-h-[250px]">
          <div className="flex justify-center">
            <img
              src="/Logo.png"
              alt="Level On Life Logo"
              className="object-contain max-h-[200px] w-auto"
              draggable={false}
            />
          </div>

          {/* Nav bar */}
          <nav className="flex items-end justify-between px-6 sm:px-10 lg:px-14 pb-4 flex-1">
            <div className="flex space-x-6 text-lg font-semibold min-w-[150px]">
              <button onClick={() => setCurrentPage('feed')} className="hover:underline">Feed</button>
              <button onClick={() => setCurrentPage('party')} className="hover:underline">Party</button>
              <button onClick={() => setCurrentPage('guild')} className="hover:underline">Guilds</button>
            </div>

            <div className="flex items-center space-x-4 min-w-[50px] relative">
              <button
                aria-label="Menu"
                className="hover:text-accent transition"
                onClick={() => setMenuOpen(!menuOpen)}
                title="More options"
              >
                <FiMenu size={24} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-40 bg-muted text-foreground border border-border rounded-md shadow-md z-50">
                  <a href="#" className="block px-4 py-2 hover:bg-accent">Settings</a>
                  <a href="#" className="block px-4 py-2 hover:bg-accent">Profile</a>
                  <a href="#" className="block px-4 py-2 hover:bg-accent">Help</a>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      {currentPage === 'feed' && (
        <>
          {/* Post bubble */}
          <div className="max-w-2xl w-full mx-auto px-6 mt-6">
            <div className="flex items-start gap-2 border border-border rounded-xl p-3 bg-muted">
              <textarea
                placeholder="What did you do today? Let TallTale know!"
                className="flex-1 bg-transparent outline-none resize-none max-h-24 text-center"
                rows={2}
              />
              <button className="self-end px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
                Post
              </button>
            </div>
          </div>

          {/* Main feed */}
          <main className="flex-1 max-w-4xl w-full mx-auto px-6 mt-8 pb-10 text-center">
            <h2 className="text-2xl font-semibold mb-4">Main Feed</h2>
            <p>Your feed content will appear here.</p>
          </main>
        </>
      )}

      {currentPage === 'party' && <PartyPage />}
      {currentPage === 'guild' && <GuildPage />}

      {/* Footer */}
      <footer className="w-full bg-primary text-white mt-12 px-6 py-4 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Level on Life. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm font-medium">
            <button onClick={() => setCurrentPage('feed')} className="hover:underline">Feed</button>
            <button onClick={() => setCurrentPage('party')} className="hover:underline">Party</button>
            <button onClick={() => setCurrentPage('guild')} className="hover:underline">Guilds</button>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="/BoltLogo.png"
              alt="Bolt Logo"
              className="h-7 w-auto"
              draggable={false}
            />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

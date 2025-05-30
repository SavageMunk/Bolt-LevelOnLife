import { useEffect, useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import PartyPage from './PartyPage'
import GuildPage from './GuildPage'
import { db } from './firebase';
import { collection, getDocs, addDoc, serverTimestamp, orderBy, query } from 'firebase/firestore'

function App() {
  useEffect(() => {
    document.title = 'Level on Life'
  }, [])

  const [menuOpen, setMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<'feed' | 'party' | 'guild'>('feed')

  // New: State to hold posts array
  const [posts, setPosts] = useState<{ id: string; content: string; createdAt: any }[]>([])

  // New: State to hold textarea input
  const [postInput, setPostInput] = useState('')

  // New: Fetch posts from Firestore on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, 'posts')
        // Query to order posts by timestamp descending (most recent first)
        const q = query(postsRef, orderBy('createdAt', 'desc'))
        const querySnapshot = await getDocs(q)
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          content: doc.data().content,
          createdAt: doc.data().createdAt
        }))
        setPosts(postsData)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }

    if (currentPage === 'feed') {
      fetchPosts()
    }
  }, [currentPage]) // Refetch posts when page changes back to feed

  // New: Handle posting new content
  const handlePost = async () => {
    if (!postInput.trim()) return // Ignore empty posts

    try {
      const postsRef = collection(db, 'posts')
      await addDoc(postsRef, {
        content: postInput.trim(),
        createdAt: serverTimestamp()
      })

      setPostInput('') // Clear textarea
      // Refetch posts to include new one
      const postsRefFresh = collection(db, 'posts')
      const q = query(postsRefFresh, orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        content: doc.data().content,
        createdAt: doc.data().createdAt
      }))
      setPosts(postsData)
    } catch (error) {
      console.error('Error adding post:', error)
    }
  }

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
                value={postInput}
                onChange={(e) => setPostInput(e.target.value)}
              />
              <button
                onClick={handlePost}
                className="self-end px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
              >
                Post
              </button>
            </div>
          </div>

          {/* Main feed */}
          <main className="flex-1 max-w-4xl w-full mx-auto px-6 mt-8 pb-10 text-left">
            <h2 className="text-2xl font-semibold mb-4">Main Feed</h2>
            {posts.length === 0 ? (
              <p>No posts yet. Be the first!</p>
            ) : (
              posts.map(post => (
                <div
                  key={post.id}
                  className="border border-border rounded-md p-4 mb-4 bg-muted"
                >
                  <p>{post.content}</p>
                </div>
              ))
            )}
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

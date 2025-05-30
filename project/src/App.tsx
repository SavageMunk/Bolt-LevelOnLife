import { useEffect } from 'react'

function App() {
  useEffect(() => {
    document.title = 'Level on Life'
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Level on Life</h1>
        <p className="text-center text-muted-foreground">Start your journey</p>
      </div>
    </div>
  )
}

export default App
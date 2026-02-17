import Header from './Header.jsx'

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <Header />
      <main className="container page-content">{children}</main>
    </div>
  )
}

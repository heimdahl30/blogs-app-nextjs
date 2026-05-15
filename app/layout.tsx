import Link from 'next/link'
const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (<html lang='en'>
    <body>
      <nav>
        <Link href='/'>home</Link>
        {" | "}
        <Link href='/blogs'>blogs</Link>
        {" | "}
        <Link href='/blogs/new'>create new</Link>
        </nav>
        {children}
        </body>
  </html>)
}

export default RootLayout

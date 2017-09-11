import 'isomorphic-fetch'
import Link from 'next/link'

const Home = ({ pages }) => (
  <main>
    <h1>Home</h1>
    <ul>
    { pages.map(page => (
      <li key={ page.slug }>
        <Link href={ `/page?slug=${page.slug}` } as={ `/pages/${page.slug}` }>
          <a>{ page.title }</a>
        </Link>
      </li>
    )) }
    </ul>
  </main>
)

Home.getInitialProps = async ({req, query}) => {
  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : ''
  const pages = await fetch(`${baseUrl}/api/pages/`).then(res => res.json())
	return { pages }
}

export default Home

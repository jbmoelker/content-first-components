import 'isomorphic-fetch'
import Content from '../components/content'

const Page = ({ page }) => (
  <article>
    <h1>{ page.title }</h1>
    <Content items={ page.content } />
  </article>
)

Page.getInitialProps = async ({req, query}) => {
  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : ''
  const page = await fetch(`${baseUrl}/api/pages/${query.slug}`).then(res => res.json())
	return { page }
}

export default Page

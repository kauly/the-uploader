import { ApolloLink } from 'apollo-link'
import { createUploadLink } from 'apollo-upload-client'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './index.css'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <RedwoodApolloProvider
        graphQLClientConfig={{
          link: (redwoodApolloLinks) =>
            ApolloLink.from([
              ...redwoodApolloLinks.map(({ link }) => link),
              createUploadLink(),
            ]),
        }}
      >
        <Routes />
      </RedwoodApolloProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App

import React, { createContext } from "react"
import Head from "./Head"
import Nav from "./Nav"
import Footer from "./Footer"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"

const TenantContext = createContext(null)
export { TenantContext }

const Inner = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  html, body {
    height: 100%;
  }

  .content {
    flex: 1 0 auto;
  }
  .footer {
    flex-shrink: 0;
  }
`

const Page = ({ tenantObject, children }) => {
  const theme = {
    red: tenantObject.color,
    image: tenantObject.imageURL,
    grey: "#3A3A3A",
    lightgrey: "#E1E1E1",
    offWhite: "#EDEDED",
    maxWidth: "1000px",
    bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)",
  }

  const StyledPage = styled.div`
    /* background: ${(props) => props.theme.red}; */
    background: white;
    color: ${(props) => props.theme.black};
    display: grid;
    min-height: 100vh;
    grid-template-rows: auto 1fr auto;
  `
  return (
    <ThemeProvider theme={theme}>
      <TenantContext.Provider value={tenantObject}>
        <StyledPage>
          <GlobalStyles />
          <Head />
          {console.log(theme)}
          <Nav />
          <Inner className="content">{children}</Inner>
          <Footer className="footer" />
        </StyledPage>
      </TenantContext.Provider>
    </ThemeProvider>
  )
}

Page.getInitialProps = async ({ pathname, req, res }) => {
  let pageProps = {}
}

export default Page

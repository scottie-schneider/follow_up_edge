import React, { Component } from "react"
import Head from "./Head"
import Nav from "./Nav"
import Footer from "./Footer"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"

const theme = {
  red: "#FF0000",
  black: "#393939",
  grey: "#3A3A3A",
  lightgrey: "#E1E1E1",
  offWhite: "#EDEDED",
  maxWidth: "1000px",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)",
}

const StyledPage = styled.div`
  background: white;
  color: ${(props) => props.theme.black};
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto;
`

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

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <GlobalStyles />
          <Head />
          <Nav />
          <Inner className="content">{this.props.children}</Inner>
          <Footer className="footer" />
        </StyledPage>
      </ThemeProvider>
    )
  }
}

export default Page

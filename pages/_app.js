import React, { createContext } from "react"
import App from "next/app"
import Page from "../components/Page"
import firebase from "../lib/db"

const TenantContext = createContext(null)
export { TenantContext }

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}
    let tenantObject = {}

    try {
      await firebase
        .firestore()
        .collection("tenants")
        .doc(ctx.req.headers.host)
        .get()
        .then((documentSet) => {
          tenantObject = documentSet.data()
        })
        .catch((err) => console.log(err))
    } catch (err) {
      console.log("error!", err)
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps, tenantObject }
  }

  render() {
    const { Component, pageProps, tenantObject } = this.props

    return (
      <TenantContext.Provider value={tenantObject}>
        <Page tenantObject={tenantObject}>
          <Component {...pageProps} />
        </Page>
      </TenantContext.Provider>
    )
  }
}

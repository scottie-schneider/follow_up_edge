import React from "react"
import App, { Container } from "next/app"
import Page from "../components/Page"
import firebase from "../lib/db"

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}
    let tenantObject = {}
    try {
      await firebase
        .firestore()
        .collection("tenants")
        .doc("2lJEYoYDR7mqioaXhYAt")
        .get()
        .then((documentSet) => {
          console.log(`tenant object!`)
          console.log(documentSet.data())
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
      <React.Fragment>
        <Page tenantObject={tenantObject}>
          <Component {...pageProps} />
        </Page>
      </React.Fragment>
    )
  }
}

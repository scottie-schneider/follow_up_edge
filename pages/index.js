import React, { useState, useEffect, useContext } from "react"
import firebase from "../lib/db"
import { TenantContext } from "./_app"
import styled from "styled-components"

const StyledImage = styled.img`
  width: 200px;
  height: 200px;
`
const Home = ({ initialMessages }) => {
  const { tagline, imageURL } = useContext(TenantContext)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("messages")
      .onSnapshot((snapshot) => {
        if (snapshot.size) {
          // we have something
          let updatedMessages = []
          snapshot.forEach((doc) => {
            updatedMessages.push({ ...doc.data() })
          })
          setMessages((p) => updatedMessages)
        } else {
          // it's empty
          console.log("ERROR!")
        }
      })
    // handles the cleanup
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div>
      <div className="hero">
        <h1 className="title">{tagline}</h1>
        <p className="description">
          {messages.map((message) => (
            <p key={message.id}>{message.uppercase}</p>
          ))}
        </p>
        <StyledImage src={imageURL} />
        <div className="row">
          <a href="https://nextjs.org/docs" className="card">
            <h3>Documentation &rarr;</h3>
            <p>Learn more about Next.js in the documentation.</p>
          </a>
          <a href="https://nextjs.org/learn" className="card">
            <h3>Next.js Learn &rarr;</h3>
            <p>Learn about Next.js by following an interactive tutorial!</p>
          </a>
          <a
            href="https://github.com/zeit/next.js/tree/master/examples"
            className="card"
          >
            <h3>Examples &rarr;</h3>
            <p>Find other example boilerplates on the Next.js GitHub.</p>
          </a>
        </div>
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
        .card {
          padding: 18px 18px 24px;
          width: 220px;
          text-align: left;
          text-decoration: none;
          color: #434343;
          border: 1px solid #9b9b9b;
        }
        .card:hover {
          border-color: #067df7;
        }
        .card h3 {
          margin: 0;
          color: #067df7;
          font-size: 18px;
        }
        .card p {
          margin: 0;
          padding: 12px 0 0;
          font-size: 13px;
          color: #333;
        }
      `}</style>
    </div>
  )
}

Home.getInitialProps = async ({ pathname, req, res }) => {
  if (process.browser) {
    return __NEXT_DATA__.props.pageProps
  }
  let pageProps = {}
  let messages = []
  try {
    let message = await firebase
      .firestore()
      .collection("messages")
      .get()
      .then((documentSet) => {
        documentSet.forEach((doc) => {
          messages.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        pageProps = {
          ...pageProps,
          initialMessages: messages,
        }
      })
  } catch (err) {
    console.log(err)
  }
  return pageProps
}

export default Home

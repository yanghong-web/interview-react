import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { Grid, GridItem } from '@chakra-ui/react'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>博客</title>
        <meta name="description" content="一个博客网站" />
        <meta name="robots" content="all" /><meta name="keywords" content="博客、blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>



      <main>{children}</main>
    </>
  )
}

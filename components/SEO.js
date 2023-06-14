import Head from 'next/head'
import React from 'react'

const SEO = ({
    title = "FesaSpot - De Ultieme Party Guide Voor Suriname!",
    description = "Ontdek een wereld vol feestelijk plezier met FesaSpot! Deze ultieme party app is speciaal ontworpen voor Suriname en stelt jou in staat om moeiteloos alle opkomende feestjes te ontdekken. Met een uitgebreide kalender, gedetailleerde informatie over artiesten en locaties, en live updates, zul je nooit meer een geweldig feest missen.",
    url = "https://fesaspot.sr"
}) => {
    return (
        <Head>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6142479111003129"
                crossOrigin="anonymous"></script>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="icon" href="/favicon.ico" />

            <title>{title}</title>

            <meta name="description" content={description} />

            <link rel="canonical" href={url} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:image" content="https://fesaspot.sr/logo.png" />

            <meta name="twitter:card" content={description} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:image" content="https://fesaspot.sr/logo.png" />

            <meta name="robots" content="index, follow"></meta>
        </Head>
    )
}

export default SEO
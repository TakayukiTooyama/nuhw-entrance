import { ColorModeScript } from '@chakra-ui/react';
import type { DocumentContext, DocumentInitialProps } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          <meta name="application-name" content="NUHW ENTRANCE" />
          <meta name="theme-color" content="#000" />
          <meta name="description" content="this is NUHW ENTRANCE" />
          <link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" />
          <link rel="icon" sizes="32x32" href="/icon-32x32.png" />
          <link rel="icon" sizes="192x192" href="/icon-192x192.png" />
          <link rel="icon" sizes="512x512" href="/icon-512x512.png" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

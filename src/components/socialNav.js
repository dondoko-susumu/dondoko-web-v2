import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { LocaleContext } from "./localeContext"

import { rhythm } from "../utils/typography"
import {
  TwitterIcon,
  InstagramIcon,
  BlogIcon,
  DrawingBlogIcon,
  InboxIcon,
  GithubIcon,
  QiitaIcon,
  FacebookIcon,
  MediumIcon,
  BookMeterIcon,
  SpeakerDeckIcon,
  TumblrIcon,
  NoteIcon,
  ScrapBoxIcon,
} from "./icon"

const SocialNav = () => {
  const { locale } = React.useContext(LocaleContext)

  const data = useStaticQuery(graphql`
    query SocialQuery {
      site {
        siteMetadata {
          social {
            twitter
          }
        }
      }
    }
  `)

  const iconStyle = {
    padding: 8,
    color: "#000",
    boxShadow: `none`
  }

  const { social } = data.site.siteMetadata
  return (
    <nav>
      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <li>
          <a
            style={iconStyle}
            title="Twitter"
            href={`https://twitter.com/${social.twitter}`}
            target="blank"
          >
            <TwitterIcon size="18" />
          </a>
        </li>
        <li>
          <a
            style={iconStyle}
            title="Instagram"
            href="https://www.instagram.com/dondoko_susumu/"
            target="blank"
          >
            <InstagramIcon size="18" />
          </a>
        </li>
        {locale === "ja" &&
          <li>
            <a
              style={iconStyle}
              title="Blog"
              href="https://dondoko.hateblo.jp"
              target="blank"
            >
              <BlogIcon size="18" />
            </a>
          </li>
        }
        <li>
          <a
            style={iconStyle}
            title="Drawing Blog"
            href="https://dondoko-susumu.hatenadiary.org"
            target="blank"
          >
            <DrawingBlogIcon size="18" />
          </a>
        </li>
        <li>
          <a
            style={iconStyle}
            title="Facebook"
            href="https://www.facebook.com/dondoko.susumu"
            target="blank"
          >
            <FacebookIcon size="18" />
          </a>
        </li>
        <li>
          <a
            style={iconStyle}
            title="Github"
            href="https://github.com/dondoko-susumu/"
            target="blank"
          >
            <GithubIcon size="18" />
          </a>
        </li>
        {locale === "ja" &&
          <li>
            <a
              style={iconStyle}
              title="Peing 質問箱"
              href="https://peing.net/ja/dondoko_susumu?event=0"
              target="blank"
            >
              <InboxIcon size="18" />
            </a>
          </li>
        }
        <li>
          <a
            style={iconStyle}
            title="Qiita"
            href="https://qiita.com/dondoko-susumu"
            target="blank"
          >
            <QiitaIcon size="18" />
          </a>
        </li>
        {locale === "ja" &&
          <li>
            <a
              style={iconStyle}
              title="読書メーター"
              href="https://bookmeter.com/users/92437"
              target="blank"
            >
              <BookMeterIcon size="18" />
            </a>
          </li>
        }
        {locale === "ja" &&
          <li>
            <a
              style={iconStyle}
              title="Note"
              href="https://note.com/dondoko_susumu"
              target="blank"
            >
              <NoteIcon size="18" />
            </a>
          </li>
        }
        {locale === "ja" &&
          <li>
            <a
              style={iconStyle}
              title="Scrapbox"
              href="https://scrapbox.io/dondoko-susumu/"
              target="blank"
            >
              <ScrapBoxIcon size="18" />
            </a>
          </li>
        }
        <li>
          <a
            style={iconStyle}
            title="Speaker Deck"
            href="https://speakerdeck.com/dondoko_susumu"
            target="blank"
          >
            <SpeakerDeckIcon size="18" />
          </a>
        </li>
        <li>
          <a
            style={iconStyle}
            title="Medium"
            href="https://medium.com/@dondoko_susumu"
            target="blank"
          >
            <MediumIcon size="18" />
          </a>
        </li>
        <li>
          <a
            style={iconStyle}
            title="Tumblr"
            href="https://dondokosusumu.tumblr.com/"
            target="blank"
          >
            <TumblrIcon size="18" />
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default SocialNav

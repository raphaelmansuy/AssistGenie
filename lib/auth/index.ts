import { NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'

import activateTemplate from '@/lib/email/templates/html-activate-template'
import signinTemplate from '@/lib/email/templates/html-signin-template'
import activateTextTemplate from '@/lib/email/templates/text-activate-template'
import signinTextTemplate from '@/lib/email/templates/text-signin-template'

import { sendEmailWithRetry } from '@/lib/email'

import { env } from '@/env.mjs'
import { siteConfig } from '@/config/site'
import { db } from '@/lib/db'

export const authOptions: NextAuthOptions = {
  // huh any! I know.
  // This is a temporary fix for prisma client.
  // @see https://github.com/prisma/prisma/issues/16117

  adapter: PrismaAdapter(db) as any,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/login',
    signOut: '/logout',
    newUser: '/signup',
  },
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    EmailProvider({
      from: env.MAIL_FROM,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        try {
          const user = await db.user.findUnique({
            where: {
              email: identifier,
            },
            select: {
              emailVerified: true,
            },
          })

          const status = user && user.emailVerified ? 'sign_in' : 'activate'

          const { htmlTemplate, textTemplate, subjectEmail } =
            status === 'sign_in'
              ? {
                  htmlTemplate: signinTemplate,
                  textTemplate: signinTextTemplate,
                  subjectEmail: `Sign in to ${siteConfig.name}`,
                }
              : {
                  htmlTemplate: activateTemplate,
                  textTemplate: activateTextTemplate,
                  subjectEmail: `Activate your ${siteConfig.name} subscription`,
                }

          const html = htmlTemplate({
            actionUrl: url,
            productName: siteConfig.name,
          })

          const text = textTemplate({
            actionUrl: url,
            productName: siteConfig.name,
          })

          await sendEmailWithRetry(
            {
              from: env.MAIL_FROM,
              to: identifier,
              subject: subjectEmail,
              html,
              text,
            },
            3
          )
        } catch (error) {
          console.error(`Error sending verification email: ${error}`)
          // Handle error appropriately
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
  },
}

import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags, images, excerptHtml } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-5 xl:col-span-3">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl leading-8 font-bold tracking-tight">
                          <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                            {title}
                          </Link>
                        </h2>
                      </div>
                      <div className="flex-col items-start gap-4">
                        {excerptHtml ? (
                          <div
                            className="prose line-clamp-20 max-w-none"
                            dangerouslySetInnerHTML={{ __html: excerptHtml }}
                          />
                        ) : (
                          <div className="prose max-w-none">{summary}</div>
                        )}
                      </div>
                    </div>
                    <div className="text-center text-base leading-6 font-medium">
                      <Link
                        href={`/blog/${slug}`}
                        className="dark:hover:text-primary-400"
                        aria-label={`Read more: "${title}"`}
                      >
                        阅读全文 &rarr;
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-center text-base leading-6 font-medium">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            查看更多文章 &rarr;
          </Link>
        </div>
      )}
    </>
  )
}

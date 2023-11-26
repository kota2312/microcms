// pages/index.js
import Link from "next/link";
import { client } from "../libs/client";
import parse from 'html-react-parser';
import { formatDate } from "@/utility/dateformat";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home({ blogs }) {
  return (
    <div>
      <Header />
      <div className="sec01">
        <ul className="blog-items">
          {blogs.map((blogs) => (     
            <li key={blogs.id}>
              <div className="top-content">
                <img src={blogs.eyecatch.url} alt={blogs.title}></img>
              </div>
              <div className="bottom-content">
                  <p className="date">{formatDate(blogs.date)}</p>
                  <Link className="title" href={`/blogs/${blogs.id}`}>{blogs.title}</Link>
                  <div class="description">
                    <p>{blogs.description}</p>
                  </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
const data = await client.get({ endpoint: "blogs" });

  return {
    props: {
      blogs: data.contents,
    },
  };
};
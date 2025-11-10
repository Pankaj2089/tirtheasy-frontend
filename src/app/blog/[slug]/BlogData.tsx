'use client'
import { useEffect, useState } from 'react';
import { getData } from '../../utils/api';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {toast } from 'react-toastify';
import {Button, Space, Tooltip} from "antd";
import { formatDistanceToNow } from "date-fns";
import Comments from './Comments';
import { useMemo } from "react";

import {
  AiFillYoutube,
  AiOutlineInstagram,
  AiFillFacebook,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { ShareAltOutlined } from "@ant-design/icons";

type blogDataProps = {
  hotelData:any;
  slug:any
};



export default function BlogData({ hotelData, slug }: blogDataProps) {

    const blogUrl = typeof window !== "undefined"
    ? window.location.href
    : `https://tirtheasy.com/blog/${slug}`;
  const blogTitle = hotelData?.title || "Blog Post";

 const [totalBlogComment, setTotalBlogComment] = useState(0);

 useEffect(() => {
         if (slug) {
            blogView(slug);
        }
    }, [slug]);

    async function blogView(slug: string) {
  if (!slug) return; // skip if no slug

  try {
    // 1️⃣ Get existing viewed slugs from localStorage
    let viewedSlugs = JSON.parse(localStorage.getItem("viewedBlogs") || "[]");

    // 2️⃣ Check if current slug already viewed
    if (viewedSlugs.includes(slug)) {
      console.log("Already viewed:", slug);
      return; // prevent API call
    }

    // 3️⃣ Call API if not viewed before
    const res = await getData(`view-blog/${slug}`);
    console.log("API called for:", slug);

    // 4️⃣ Add slug to localStorage array
    viewedSlugs.push(slug);
    localStorage.setItem("viewedBlogs", JSON.stringify(viewedSlugs));

  } catch (err) {
    console.error("Error viewing blog:", err);
  }
}

  const [encodedUrl, setEncodedUrl] = useState("");
  const [encodedTitle, setEncodedTitle] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Wait for actual client-side URL
    const timeout = setTimeout(() => {
      const currentUrl = blogUrl || window.location.href;
      const title = blogTitle || document.title;
      setEncodedUrl(encodeURIComponent(currentUrl));
      setEncodedTitle(encodeURIComponent(title));
    }, 100); // small delay ensures href is resolved

    return () => clearTimeout(timeout);
  }, [blogUrl, blogTitle]);

  // ✅ Don’t render icons until URL is ready
  if (!encodedUrl || !encodedTitle) {
    return (
      <Space>
        <Button
          icon={<ShareAltOutlined />}
          shape="round"
          size="middle"
          style={{ display: "flex", alignItems: "center" }}
        >
          Share
        </Button>
        <span style={{ opacity: 0.6 }}>Loading share options...</span>
      </Space>
    );
  }

  const shareLinks = {
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
  };

  const openLink = (url: string) => {
    if (!url) return;
    const popup = window.open(url, "_blank", "noopener,noreferrer,width=600,height=600");
    if (!popup) {
      //alert("Please allow pop-ups for this site to share content.");
    }
  };
   
  return (
    <>
  
   
<div className="hero-section pb-3">
  <div className="inner-page-banner py-md-3 py-2 gray_bg">
        <div className="container">
            <div className="d-flex align-items-center justify-content-between">
                <h1 className="text-left d-flex align-items-center justify-content-start">{hotelData.title}</h1>   
                <div className="title-teg">{hotelData.category}</div>
            </div>      
        </div>
  </div>
</div>

<div className="blog-listing-section blog-detials-page">
    <div className="container">
        <div className="row mb-4 align-items-center">
            <div className="col-lg-8">
                <div className="artile-postby d-flex align-items-center">
                    <div className="post-by d-flex align-items-center">
                        <div className="user-thumb me-2">
                            <span className="afterlogin-user" style={{width:'24px', height:'24px'}}>{hotelData?.user_name.substring(0, 1)}</span>
                        </div>
                        <p>{hotelData.user_name}</p>
                    </div>
                    <div className="divider light-gray-text mx-2">|</div>
                    <div className="post-by">
                        <p>{hotelData.blog_date}</p>
                    </div>
                    <div className="divider light-gray-text mx-2">|</div>
                    <div className="post-by d-flex align-items-center">
                        <div className="user-thumb me-2">
                            <img src="/img/eye.svg"/>
                        </div>
                        <p>{hotelData.total_views}</p>
                    </div>
                    <div className="divider light-gray-text mx-2">|</div>
                    <div className="post-by d-flex align-items-center">
                        <div className="user-thumb me-2">
                            <img src="/img/comment.svg"/>
                        </div>
                        <p>{totalBlogComment}</p>
                    </div>
                </div>    
            </div>

            <div className="col-lg-4" style={{textAlign:'right'}}>
                <div className="social-share">
                     <Space size="middle" align="center">
                        <Button
                            icon={<ShareAltOutlined />}
                            shape="round"
                            size="middle"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            Share
                        </Button>
                        <Tooltip title="LinkedIn">
                            <FaLinkedinIn
                            size={28}
                            color="#0077B5"
                            onClick={() => encodedUrl && openLink(shareLinks.linkedin)}
                            style={{ cursor: encodedUrl ? "pointer" : "not-allowed", opacity: encodedUrl ? 1 : 0.5 }}
                            />
                        </Tooltip>

                        <Tooltip title="Facebook">
                            <AiFillFacebook
                            size={28}
                            color="#1877F2"
                            onClick={() => encodedUrl && openLink(shareLinks.facebook)}
                            style={{ cursor: encodedUrl ? "pointer" : "not-allowed", opacity: encodedUrl ? 1 : 0.5 }}
                            />
                        </Tooltip>

                        <Tooltip title="WhatsApp">
                            <AiOutlineWhatsApp
                            size={28}
                            color="#25D366"
                            onClick={() => encodedUrl && openLink(shareLinks.whatsapp)}
                            style={{ cursor: encodedUrl ? "pointer" : "not-allowed", opacity: encodedUrl ? 1 : 0.5 }}
                            />
                        </Tooltip>

                        <Tooltip title="X (Twitter)">
                            <FaXTwitter
                            size={28}
                            color="#000000"
                            onClick={() => encodedUrl && openLink(shareLinks.x)}
                            style={{ cursor: encodedUrl ? "pointer" : "not-allowed", opacity: encodedUrl ? 1 : 0.5 }}
                            />
                        </Tooltip>
                    </Space>
                </div>
            </div>
        </div>

           <div className="row mb-4">
            <div className="col-lg-8 mb-3">
               <div className="blog-post-detials">
                    <div className="blog-post-thumbnail rounded-3 mb-4">
                         <img src={hotelData.image} className="" alt={hotelData.title} />
                    </div>

                    <div
                      dangerouslySetInnerHTML={{ __html: hotelData.description || '' }}
                    />
                  </div>

               
               <Comments blogId={hotelData.id} setTotalBlogComment={setTotalBlogComment} />
            </div>

            <div className="col-lg-4">
                {hotelData?.most_popular_posts.length > 0 &&
                <div className="popular-post mb-4">
                    <h4 className="mb-3">Most Popular Posts</h4>
                     {hotelData?.most_popular_posts?.map((blog: any, blogIndex: number) => (
                      <>
                      <div className="popular-post-lsit">
                        <div className="small-thumbnail">
                            <img src={blog.image} className="" alt={blog.title} />
                        </div>
                        <div className="small-post-content">
                            <h5><Link href={"/blog/" + blog.slug} >{blog.title}</Link></h5>
                            <div className="date">{blog.blog_date}</div>
                        </div>
                    </div>
                    </>
                  ))}
                    
                </div>
                }

                <div className="ad-space mb-4">
                    <img src="/img/ad_design.svg"/>
                </div>
                {hotelData?.related_posts.length > 0 &&
                <div className="popular-post mb-4">
                    <h4 className="mb-3">Related Posts</h4>
                     {hotelData?.related_posts?.map((blog: any, blogIndex: number) => (
                      <>
                      <div className="popular-post-lsit">
                        <div className="small-thumbnail">
                            <img src={blog.image} className="" alt={blog.title} />
                        </div>
                        <div className="small-post-content">
                            <h5><Link href={"/blog/" + blog.slug} >{blog.title}</Link></h5>
                            <div className="date">{blog.blog_date}</div>
                        </div>
                    </div>
                    </>
                  ))}
                    
                </div>
                }
            </div>
        </div>
    </div>
</div>
    </>

  );
}
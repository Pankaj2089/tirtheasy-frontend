'use client'
import { useEffect, useState } from 'react';
import { postData } from '../../utils/api';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {toast } from 'react-toastify';
import {Button} from "antd";
import { formatDistanceToNow } from "date-fns";
import Comments from './Comments';

type blogDataProps = {
  hotelData:any;
};



export default function BlogData({ hotelData }: blogDataProps) {

 const [totalBlogComment, setTotalBlogComment] = useState(0);
   
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

            <div className="col-lg-4">
                <div className="social-share">
                    <img src="/img/social_share_icons.svg"/>
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
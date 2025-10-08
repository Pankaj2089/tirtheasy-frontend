
import { Metadata } from 'next';
import { getData } from '../../utils/api';
import React from 'react';
import Link from 'next/link';

async function getBlogData(slug: string) {
  const res = await getData(`get-blog-data/${slug}`);  
  return res.record;
}

// ✅ Dynamic SEO meta using slug
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const resolvedParams = await params;  
  const hotelData = await getBlogData(resolvedParams.slug);
  return {
    title: hotelData.seo_title,
    description: hotelData.seo_description,
    keywords: hotelData.seo_keyword,
  };
}

// ✅ Page Component
export default async function BlogPage({ params }: { params: { slug: string } }) {

 const hotelData = await getBlogData(params.slug); // same fetch used above
  console.log(hotelData);
  
return <> 

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
                        <p>33035</p>
                    </div>
                    <div className="divider light-gray-text mx-2">|</div>
                    <div className="post-by d-flex align-items-center">
                        <div className="user-thumb me-2">
                            <img src="/img/comment.svg"/>
                        </div>
                        <p>1</p>
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

               {/* <div className="comment-section rounded-3 p-3 border">
                <h4 className="mb-4">Comments</h4>
                <div className="comment-form-section">
                    <div className="author-thumb">
                        <img src="/img/user_thumbnial.png"/>
                    </div>
                    <div className="comment-form">
                        <form>
                             <div className="d-flex flex-column flex-lg-row gap-3 w-100">
                                <div className="mb-lg-3 w-100">
                                    <input type="text" className="form-control" id="name" placeholder="Enter your name" required />
                                </div>

                                <div className="mb-3 w-100">
                                    <input type="email" className="form-control" id="email" placeholder="name@example.com" required />
                                </div>
                            </div>

                            <div className="mb-3">
                                <div id="editor" className="ckeditor-container">
                                    <img src="/img/editor.png"/>
                                </div>
                            </div>
                            
                            <button type="submit" className="btn btn-primary btn-lg btn-submit">Post Comment</button>
                            </form>
                    </div>
                </div>
                <hr/>
                <h4 className="mb-4">1 Comment</h4>

                <div className="comment-form-section">
                    <div className="author-thumb">
                        <img src="/img/user_thumbnial.png"/>
                    </div>
                    <div className="comment-form w-100">
                        <div className="author-detials">
                            <h5 className="author-name mb-1">Kinjal Jesani</h5>
                            <div className="timer d-flex gap-1 align-items-center">
                                <img src="/img/timer.svg" />5 Years Ago
                            </div>
                        </div>

                        <div className="comment-by my-2">
                            <p>Best information</p>
                        </div>
                        <div className="mb-3">
                            <a href="#" className="reply-btn"><img src="/img/reply.svg"/> Reply</a>
                        </div>
                    </div>
                </div>
               </div> */}
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
 
</>;
}
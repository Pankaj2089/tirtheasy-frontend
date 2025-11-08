"use client";
import { useEffect, useState } from 'react';
import { getData } from '../utils/api';
import { Skeleton } from 'antd';
import Link from 'next/link';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false,
});

const options = {
    loop:true,
    margin:0,
    items:1,
    autoplay:true,
    nav:true,
    dots:false,
    autoplayTimeout:5000,   
};

export default function Blogs() {
    const [records, setRecords] = useState<any>([]);
    const [categories, setCategories] = useState<any>([]);
    const [most_popular_posts, setMostPopularPosts] = useState<any>([]);
    const [loading, setLoading] = useState<any>(false);
    const [filterCategory, setFilterCategory] = useState<any>(0);
     useEffect(() => {
        fetchBlogs();
    }, []);
    async function fetchBlogs() {
        setLoading(true);
        try {
            const res = await getData('get-blogs'); 
            if(res.success){                  
                setRecords(res.records);     
                setCategories(res.categories);
                setMostPopularPosts(res.most_popular_posts);
                setLoading(false);                
            }
        } catch (err) {
            setLoading(false);
        }
    }   

  return <>
    <div className="hero-section pb-3">
  <div className="inner-page-banner py-md-3 py-2 gray_bg">
        <div className="container">  
            {/* <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Blog</li>
                </ol>
            </nav>  */}
            <div className="d-flex align-items-center justify-content-between">
                <h1 className="text-left d-flex align-items-center justify-content-start">Blogs</h1> 
                <div className="d-none d-md-block">
                    <select className="form-select " id="category_value" onChange={(e) => setFilterCategory(e.target.value)}>
                        <option value={0}>All Category</option>
                        {categories && categories.length > 0 && categories.map((record:any, index:number) => (
                            <option value={record}>{record}</option>
                        ))}
                    </select> 
                </div>
            </div>  
        </div>
  </div>
</div>

<div className="blog-listing-section">
    <div className="container">
        {loading ?
              <div style={{ width: "100%" }}>
                <div className="row">
                    <div className="col-12 mb-3">
                        <h5 className="fw-normal fs-4"><Skeleton.Input active block style={{ height: "30px" }} className="mb-2" /></h5>
                    </div>
                    <div className="col-lg-6 mb-4">
                        <Skeleton.Input active block style={{ height: "300px" }} className="mb-2" />
                    </div>
                     <div className="col-lg-6">
                        <Skeleton.Input active block style={{ height: "140px" }} className="mb-2" />
                        <Skeleton.Input active block style={{ height: "140px" }} className="mb-2" />
                    </div>
                </div>
                <Skeleton.Input active block style={{ height: "120px" }} className="mb-2" />
                <Skeleton.Input active block style={{ height: "120px" }} className="mb-2" />
                <Skeleton.Input active block style={{ height: "120px" }} className="mb-2" />
                <Skeleton.Input active block style={{ height: "120px" }} className="mb-2" />
            </div> 
                :
        <>
        <div className="row mb-4">
            {most_popular_posts.length > 0 &&
            <div className="col-lg-12">
                <div className="d-flex align-items-center">
                    <div className="title-teg fw-bold">Trending Now</div>
                    <div className="trending-news">
                            <OwlCarousel {...options} className='most_popular_post'>
                            {most_popular_posts.map((most_popular_post: any, index: number) => (
                                <div>
                                    <p>{most_popular_post.title}</p>
                                </div>
                            ))}
                        </OwlCarousel>
                    </div>
                </div>
            </div>
            }
            
        </div>
        {categories?.slice(0, 1).map((category: string, index: number) => (
            <div key={index}>
                {(filterCategory == 0 || filterCategory == category)  && 
                    <div className="row">
                        <div className="col-12 mb-3">
                            <h5 className="fw-normal fs-4">{category}</h5>
                        </div>
                        {records?.[category]?.length > 0 &&
                        records[category].slice(0,1).map((blog: any, blogIndex: number) => (
                            <div className="col-lg-6 mb-4">
                                <div className="card blog-article">
                                    <div className="blog-post-thumbnail">
                                        <img src={blog.image} className="" alt={blog.title} />
                                    </div>
                                    <div className="card-body article-content">
                                        <div className="artile-postby mb-3 d-flex align-items-center">
                                            <div className="post-by d-flex align-items-center">
                                                <div className="user-thumb me-2">
                                                    {/* <img src="img/user_thumbnial.png"/> */}
                                                    <span className="afterlogin-user" style={{width:'24px', height:'24px'}}>{blog?.user_name.substring(0, 1)}</span>
                                                </div>
                                                <p>{blog.user_name}</p>
                                            </div>
                                            <div className="divider light-gray-text mx-2">|</div>
                                            <div className="post-by">
                                                <p>{blog.blog_date}</p>
                                            </div>
                                        </div>
                                        <h4 className="card-title mb-2"><Link href={"/blog/" + blog.slug}>{blog.title}</Link></h4>
                                        <p className="card-text mb-3">{blog.short_description}</p>
                                        <Link href={"/blog/" + blog.slug} className="red-text">Read More</Link>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="col-lg-6">
                            <div className="row">
                                {records?.[category]?.length > 0 &&
                                    records[category].slice(1,3).map((blog: any, blogIndex: number) => (
                                    <>
                                    <div className="col-lg-12 mb-4">
                                        <div className="card blog-article article-blog-row">
                                            <div className="blog-post-thumbnail">
                                                <img src={blog.image} className="" alt={blog.title} />
                                            </div>
                                            <div className="card-body article-content">
                                                <div className="artile-postby mb-3 d-flex align-items-center">
                                                    <div className="post-by d-flex align-items-center">
                                                        <div className="user-thumb me-2">
                                                            {/* <img src="img/user_thumbnial.png"/> */}
                                                            <span className="afterlogin-user" style={{width:'24px', height:'24px'}}>{blog?.user_name.substring(0, 1)}</span>
                                                        </div>
                                                        <p>{blog.user_name}</p>
                                                    </div>
                                                    <div className="divider light-gray-text mx-2">|</div>
                                                    <div className="post-by">
                                                        <p>{blog.blog_date}</p>
                                                    </div>
                                                </div>
                                                <h4 className="card-title mb-2"><Link href={"/blog/" + blog.slug}>{blog.title}</Link></h4>
                                                <p className="card-text mb-3">{blog.short_description}</p>
                                                <Link href={"/blog/" + blog.slug} className="red-text">Read More</Link>
                                            </div>
                                        </div>
                                    </div>
                                    </>
                                ))}
                            </div>
                        </div>

                    </div>
                }
            </div>
        ))}


        {categories?.slice(1).map((category: string, index: number) => (
            <>
             {(records?.[category]?.length > 0 && filterCategory == 0 || filterCategory ==category) &&
                <div className="row">
                    <div className="col-12 mb-3 mt-3">
                        <h5 className="fw-normal fs-4">{category}</h5>
                    </div>
                    {records?.[category]?.length > 0 &&
                        records[category].map((blog: any, blogIndex: number) => (
                        <div className="col-lg-4 col-md-6 mb-4">
                            <div className="card blog-article best-accommodation">
                                <div className="blog-post-thumbnail">
                                    <img src={blog.image} className="" alt={blog.title} />
                                </div>
                                <div className="card-body article-content">
                                    <div className="artile-postby mb-3 d-flex align-items-center">
                                        <div className="post-by d-flex align-items-center">
                                            <div className="user-thumb me-2">
                                                {/* <img src="img/user_thumbnial.png"/> */}
                                                <span className="afterlogin-user" style={{width:'24px', height:'24px'}}>{blog?.user_name.substring(0, 1)}</span>
                                            </div>
                                            <p>{blog.user_name}</p>
                                        </div>
                                        <div className="divider light-gray-text mx-2">|</div>
                                        <div className="post-by">
                                            <p>{blog.blog_date}</p>
                                        </div>
                                    </div>
                                    <h4 className="card-title mb-2"><Link href={"/blog/" + blog.slug}>{blog.title}</Link></h4>
                                    <p className="card-text mb-3">{blog.short_description}</p>
                                    <Link href={"/blog/" + blog.slug} className="red-text">Read More</Link>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            }
            </>
            
        ))}
        </>
}

    </div>
</div>
  </>
}
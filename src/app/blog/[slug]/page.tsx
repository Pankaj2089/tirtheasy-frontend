
import { Metadata } from 'next';
import { getData } from '../../utils/api';
import React from 'react';
import Link from 'next/link';
import Comments from '@/app/blog/[slug]/Comments';
import BlogData from './BlogData';

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
  
return <> 
    <BlogData hotelData={hotelData} />
</>;
}
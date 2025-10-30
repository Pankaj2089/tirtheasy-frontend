'use client'
import { useEffect, useState } from 'react';
import { postData } from '../../utils/api';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {toast } from 'react-toastify';
import {Button} from "antd";
import { formatDistanceToNow } from "date-fns";

type blogDataProps = {
  blogId:any;
 setTotalBlogComment: React.Dispatch<React.SetStateAction<number>>;
};

interface HotelData {
  title: string;
  image: string;
  state: string;
  id: string;
  slug: string;
}

interface UserData {
  id: number;
  name: string;
  email: string;
  mobile: string;
}

export default function Comments({ blogId, setTotalBlogComment }: blogDataProps) {

   const [hotels, setData] = useState<HotelData[]>([]);
   const [processing, setProcessing] = useState(false);
   const [userDetails, setUserDetails] = useState<UserData  | null>(null);
   const [commentRecords, setRecords] = useState<any>([]);
   const [totalBlogComment, setTotalBlogComments] = useState(0);

    const [formData, setFormData] = useState<{
    name?: string;
    user_id?: number;
    blog_id?: number;
    email?: string;
    comment?: string;
    }>({
        name: "",
        user_id: 0,
        blog_id: blogId,
        email: "",
        comment: "",
    });

     async function fetchMyList() {
        if(blogId > 0){
            try {
                const data = {blog_id:blogId}
                const res = await postData('get-blog-comments', data); 
                if(res.success){                  
                    setRecords(res.records);
                    setTotalBlogComments(res.records.length);
                    setTotalBlogComment(res.records.length);
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    useEffect(() => {
             fetchMyList();
    }, [blogId]);

    useEffect(() => {
        if(localStorage.getItem("accessToken")){
            let userData = JSON.parse(localStorage.getItem("userDetails") ?? "{}");;
            setUserDetails(userData as UserData);
        }       
    }, []); 
    
    useEffect(() => {
        setFormData({
            name: userDetails?.name ?? "",
            email: userDetails?.email ?? "",
            user_id: userDetails?.id ?? 0,
            blog_id: blogId,
            comment: "",
        });        
    }, [userDetails]);      

    const isValidEmail = (email:any) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e:any) => {
        // booking form validations
      if (formData.name === "") {
        toast.error("Please enter your full name");
      }else if (formData.email === "") {
        toast.error("Please enter your email address");
      } else if (!isValidEmail(formData.email)) {
        toast.error("Please enter a valid email address");
      } else if (formData.comment === "") {
        toast.error("Please enter your comments");
      }else {
            setProcessing(true);
            const formPost = await postData("save-blog-comments", formData);
            if(formPost.success){
                toast.success('Comments has been sent successfully.');
                setTimeout(() => {
                    location.reload();
                }, 2000);
              setProcessing(false);
            }else{
              toast.error(formPost.message);
              setProcessing(false);
            }
            setProcessing(false);
        }
    };

    const handleFieldChange = (
    eOrName: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
    value?: any
    ) => {
        console.log(value);
        
        if (typeof eOrName === "string") {
            // Select change
            setFormData(prev => ({
            ...prev,
            [eOrName]: eOrName === "mobile" ? value.replace(/\D/g, "") : value
            }));
        } else {
            // Input/TextArea change
            const { name, value } = eOrName.target;
            const newValue = name === "mobile" ? value.replace(/\D/g, "") : value;

            setFormData(prev => ({
            ...prev,
            [name]: newValue
            }));
        }
    };

  return (
    <>
    { userDetails?.name &&
    <div className="comment-section rounded-3 p-3 mt-4 pt-4 border">
            <h4 className="mb-4">Comments</h4>
            <div className="comment-form-section">
                <div className="author-thumb">
                    <span className="afterlogin-user">{userDetails?.name.substring(0, 1)}</span>
                </div>
                <div className="comment-form flex" style={{display: 'flex',  flexDirection: 'column', width: '100%'}}>
                    <form className='flex' style={{display: 'flex',  flexDirection: 'column', width: '100%'}}>
                            <div className="d-flex flex-column flex-lg-row gap-3 w-100">
                            <div className="mb-lg-3 w-100">
                                <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" value={formData.name}  onChange={handleFieldChange} />
                            </div>
                            <div className="mb-3 w-100">
                                <input type="email" className="form-control" id="email"  name="email" placeholder="name@example.com" value={formData.email} onChange={handleFieldChange} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <textarea className="form-control" id="comment" name="comment" placeholder="Enter your comment" style={{height:"150px"}} onChange={handleFieldChange} ></textarea>
                        </div>
                        <Button 
                        style={{width:"200px"}}
                        htmlType="button" 
                        disabled={processing}
                        loading={processing}
                        onClick={handleSubmit}
                        className="btn btn-primary">Post Comment</Button>
                    </form>
                </div>
            </div>
            <hr/>
            <h4 className="mb-4">{commentRecords.length} Comment</h4>
             {commentRecords && commentRecords.length > 0 && commentRecords.map((record: any, index: number) => {
            const createdAt = record.created_at ? new Date(record.created_at) : null;
            const agoText = createdAt
                ? formatDistanceToNow(createdAt, { addSuffix: true })
                : "";

            return (
                <div className="comment-form-section" key={index}>
                    <div className="author-thumb">
                        <span className="afterlogin-user">
                            {record?.user_name?.substring(0, 1) ?? "U"}
                        </span>
                    </div>

                    <div className="comment-form w-100">
                        <div className="author-detials">
                            <h5 className="author-name mb-1">{record.user_name}</h5>
                            <div className="timer d-flex gap-1 align-items-center">
                                <img src="/img/timer.svg" alt="timer" />
                                {agoText || "Just now"}
                            </div>
                        </div>

                        <div className="comment-by my-2">
                            <p>{record.comments}</p>
                        </div>
                    </div>
                </div>
            );
        })}

            
        </div>
    }
   
    </>

  );
}
import type { Metadata } from "next";
import Script from 'next/script';
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
 import { ToastContainer } from 'react-toastify';
export const metadata: Metadata = {
  title: "Tirtheasy your sacred journey, seamlessly booked",
  description: "Introducing India's first Religious travel platform Dedicated to Booking verified Dharmshala, Guest house, and Travel Tickets with Real time availability, and effortless booking, all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <head>
        <Script 
          src="https://code.jquery.com/jquery-2.2.4.min.js" 
          strategy="beforeInteractive"
        />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet"></link>
        <link rel="stylesheet" href="/css/animate.css"/>
        <link rel="stylesheet" href="/css/owl.carousel.css"/>
        <link rel="stylesheet" href="/css/style.css"></link>
        <link rel="stylesheet" href="/css/primary-search.css"></link>
        <link rel="stylesheet" href="/css/custom_style.css"></link>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
     </head>
      <body>
        <ToastContainer />
        <Header />
        <div className="wrapper">
          {children}
        </div>
        <Footer />
        <Script 
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" 
          strategy="afterInteractive"
        />
        <Script 
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.min.js" 
          strategy="afterInteractive"
        />
        <Script 
          src="/js/wow.min.js" 
          strategy="afterInteractive"
        />
        <Script 
          src="/js/custom.js" 
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

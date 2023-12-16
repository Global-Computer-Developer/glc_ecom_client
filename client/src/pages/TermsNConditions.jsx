import React from 'react'
import { Link } from 'react-router-dom'

const TermsNConditions = () => {
  return (
    <section className='terms-page'>
        <div className="container">
            <div className="wrapper">
                <div className="breadcrump">
                  <ul className="flexitem">
                      <li><Link to="/">Home</Link></li>
                      <li>Terms and Conditions</li>
                  </ul>
                </div>
                <article className="policies__content">
                    <p>
                        <strong>Global Computer BD</strong> সব সময় কাস্টমারদের সর্বোচ্চ গুরুত্ব দিয়ে থাকে। এতদসত্বেও গ্রাহক সেবার মান উন্নত, 
                        সময়োপযোগী এবং দ্রুততর করার জন্যে কিছু নিয়ম কানুন মেনে কার্য পরিচালনা করতে হয়। সন্মানিত গ্রাহকগনের প্রতি 
                        বিশেষভাবে অনুরোধ Global Computer BD থেকে কম্পিউটার পণ্য কেনার পূর্বে নিন্ম উল্লেখিত নিয়মাবলি ভালোভাবে অনুসরণ 
                        করবেন। ধন্যবাদ।	<br />
                        বিক্রয়ের সময় যে সমস্ত প্রোডাক্টের ওয়ারেন্টি ঘোষণা করা হয় সেগুলো মূলত পন্য প্রস্তুতকারক কর্তৃক প্রদান করা ওয়ারেন্টি । 
                        অর্থাৎ বিক্রিত পণ্যের ওয়ারেন্টি সেবা মূলত নির্দিষ্ট ব্রান্ডের মূল কোম্পানী বহন করে থাকে। ওয়ারেন্টি সেবার ভিন্নতার দিক থেকে
                         প্রত্যেকটি ব্র্যান্ড সতন্ত্র এবং তাঁদের বিভিন্ন শর্তাবলী নিজস্ব অফিশিয়াল ওয়েবসাইটে উল্লেখ করা আছে। এক্ষেত্রে সাহায্যকারী প্রতিষ্ঠান 
                         Global Computer BD মূল ব্রান্ডের কোম্পানি গুলোর ওয়ারেন্টি সেবার শর্তাবলী কার্যকর করার মাধ্যম হিসেবে কাজ করছে।
                    </p>
                    <h2>Warranty Conditions</h2>
                    <p>
                        <strong>Global Computer BD</strong> প্রতিটি প্রোডাক্ট এর 
                        <strong><em>আন্তর্জাতিক, দেশীয় ও বাংলাদেশ কম্পিউটার সমিতি (BCS)</em></strong> কর্তৃক প্রদত্ত 
                        <a href='https://bcs.org.bd/page/publication/Warranty-Policy-GpxT5'>ওয়ারেন্টি নীতিমালা</a> 
                        অনুসরন করে।
                    </p>
                    <section>
                        <h3>Warranty Timespan</h3>
                    </section>   
                </article>
            </div>
        </div>
    </section>
  )
}

export default TermsNConditions
import React from 'react';
import image from '../../assets/images/about-us-banner.png'

const About = () => {
return (
<div className='p-3  flex items-center justify-between'>
    <div className='flex-1'>
        <h1 className='text-5xl font-bold mb-16'>About us</h1>
<p className='text-lg text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor dicta deserunt consectetur dolore. Odit eligendi, esse sunt temporibus autem, aspernatur quaerat, qui sequi tenetur quasi atque. Alias ex obcaecati veritatis saepe commodi doloremque explicabo nam. Error aliquam assumenda repellendus minima veritatis modi maiores reiciendis animi consequatur eum unde magnam, doloremque sequi soluta, ipsa eligendi omnis, consequuntur sed deleniti. Inventore eius commodi quisquam temporibus rem, magnam sequi dolorum hic cupiditate a vel nisi velit aspernatur nihil debitis error, quis, odio distinctio libero. Natus eum consectetur aspernatur. Non dolorem repellat aspernatur optio, labore vitae, ad nesciunt animi corrupti ducimus ratione rerum laboriosam.</p>  

<button className='mt-10 text-white  bg-blue-400 p-3 rounded-sm font-bold text-xl'>Learn more</button>
        </div>       
         
        <div className='flex-1 ml-26'>
          <img src={image} alt="" />
        </div>                                         
</div>
);
};

export default About;
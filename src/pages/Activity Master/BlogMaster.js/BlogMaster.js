import React from 'react'
import blogimg1 from '../../../assets/images/blogimg1.png'
import blogimg2 from '../../../assets/images/blogimg2.png'
function BlogMaster() {
    const blogPost = [
        {
            imgSrc: blogimg1,
            title: 'Why engineers are dominating the world, Twitch',
            category: 'Blog',
            time: '7 min read'
        },
        {
            imgSrc: blogimg2,
            title: 'Why engineers are dominating the world, Twitch',
            category: 'Blog',
            time: '7 min read'
        }
    ];
    return (
        <section className="blogsUpdates">
            <div className="row">
                <div className="Sec-HeadingBlock">
                    <div className="col-md-8 ">
                        <h4><b> News, Blogs & Updates </b></h4>
                    </div>
                </div>
                {blogPost.map((item, index) => (
                    <div className="col-md-6 blogpost-1" key={index}>
                        <img src={item.imgSrc} className="img-fluid" alt="blogimg1" />
                        <p>{item.title}</p>
                        <div className="badge-TimeToRead">
                            <span className="badge rounded-pill bg-primary">{item.category}</span>{item.time}
                        </div>
                    </div>
                ))
               }
            </div>
        </section>
    )
}

export default BlogMaster

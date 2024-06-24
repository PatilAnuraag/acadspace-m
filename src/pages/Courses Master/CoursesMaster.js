import React from 'react'
import { ChevronRight, ClockFill, StarFill, Dribbble, Instagram, Youtube } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import CommonLayout from '../../components/common/CommonLayout'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import lockIcon from '../../assets/images/lockIcon.png';
import peerwork1 from '../../assets/images/peerwork1.png';
import studentpic1 from '../../assets/images/studentpic1.png';
import instructor from '../../assets/images/instructor.png';
function CoursesMaster() {
    const navigate = useNavigate();
    const breadcrumbItems = [
        { label: 'Home', link: '/dashboard' },
        { label: 'Courses', link: '/courses', isActive: true },
    ];

    const separator = (
        <span style={{ color: '#001E3A', marginLeft: '4px', marginRight: '4px' }}><ChevronRight /></span>
    );
    const handleBackToActivity = () => {
        return navigate('/dashboard');
    };
    return (
        <CommonLayout>
            <div className="left-navigation">
                <Sidebar></Sidebar>
            </div>
            <div className="right-content">
                <Navbar handleBackClick={handleBackToActivity}></Navbar>
                <section className="bradercrums-block my-5 mt-0 bradercrums-width">
                    <div className="row">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                {breadcrumbItems.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <li className="breadcrumb-item">
                                            <a href={item.link}>{item.label}</a>
                                        </li>
                                        {index !== breadcrumbItems.length - 1 && separator}
                                    </React.Fragment>
                                ))}
                            </ol>
                        </nav>
                    </div>
                </section>

                <section class="lessonsmainBlock mb-5">
                    <div class="row">

                        <div class="lesson-details col-md-12">
                            <div class="row">
                                <div class="lesson-video col-md-6">
                                    <div class="embed-responsive embed-responsive-16by9">
                                        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/NAMvdbS4lk4" title="YouTube video player" allowfullscreen></iframe>
                                    </div>
                                </div>
                                <div class="lesson-basic-destails  col-md-6">
                                    <h4>Lessons in the class 3D Modeling In Blender: Design Your First 3D Object</h4>
                                    <p>Derek Elliott </p>
                                    <div class="hours-rating">
                                        <span><ClockFill /> 6:30 hr </span>
                                        <span><StarFill /> 4.2(2100 ratings)</span>
                                    </div>
                                    <div class="price-buy-block">
                                        <div class="new-old-price">
                                            ₹. 499 &nbsp; <span class="actual-MRP">₹. 1500</span><br></br>
                                            <span>(86% off with superbucks)</span>
                                        </div>
                                        <button type="button" class="btn btn-primary">Buy Now</button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="lesson-listBlock mt-5">
                            <label>
                                <span>Lessons in the class</span>
                                <span>12 Lessons(6:30hr)</span>
                            </label>
                            <div class="lessons-chuncks">
                                <div class="lesson active">
                                    <p><i class="bi bi-play-circle-fill"></i> 1. Introduction</p>
                                    <span>3:41</span>
                                </div>
                                <div class="lesson">
                                    <p><img src={lockIcon} class="img-fluid" alt="Lockicon" /> 2. Getting started</p>
                                    <span>3:41</span>
                                </div>
                                <div class="lesson">
                                    <p><img src={lockIcon} class="img-fluid" alt="Lockicon" /> 3. Walk through UI and UX</p>
                                    <span>3:41</span>
                                </div>
                                <div class="lesson">
                                    <p><img src={lockIcon} class="img-fluid" alt="Lockicon" /> 4. Add objects to scene</p>
                                    <span>3:41</span>
                                </div>
                                <a href="#">View More <ChevronRight /> </a>
                            </div>
                        </div>

                    </div>
                </section>
                <section className="course-content mt-5">
                    <div className="row">
                        <h2 className='mb-3'>About the class</h2>
                        <p>
                            <b>In this class,</b> Derek will guide you through its interface and basic 3D modeling
                            techniques by building out a 3D scene with a cabinet, shelves, window, and pots all lit up by
                            a realistic sky texture. No matter if you’re a graphic designer, architectural designer,
                            industrial designer, or just curious about 3D design, this class will help jumpstart your
                            journey to the world of 3D design.
                            <br />
                            <br />
                            With Derek by your side, you’ll:
                            <ul style={{ paddingLeft: 0 }}>
                                <li>Explore Blender’s UI</li>
                                <li>Build out basic 3D objects</li>
                                <li>Add lighting, color, and materials to a 3D scene</li>
                                <li>Denoise and render your final product</li>
                            </ul>
                            Plus, Derek shares exactly how he sets up his workspace and goes about modeling a new 3D
                            object from scratch.
                        </p>
                    </div>
                </section>


                <section class="peers-work">
                    <heading>Peers Work </heading>
                    <div class="row">
                        <div class="col-md-6">
                            <img src={peerwork1} class="img-fluid" alt="peerwork1" />
                        </div>
                        <div class="col-md-6">
                            <img src={peerwork1} class="img-fluid" alt="peerwork1" />
                        </div>
                        <div class="col-md-6">
                            <img src={peerwork1} class="img-fluid" alt="peerwork1" />
                        </div>
                        <div class="col-md-6">
                            <img src={peerwork1} class="img-fluid" alt="peerwork1" />
                        </div>
                    </div>
                </section>

                <section class="testimonial">
                    <heading>What Participants say about course</heading>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="what-student-says">
                                <div class="student-expresss">
                                    <img src={studentpic1} class="img-fluid student-namepic"
                                        alt="studentpic1" />
                                    <p>Mitul Gajjar <span>(Student)</span><br></br>
                                        <stars>4.0 &nbsp; <StarFill /></stars>
                                    </p>
                                </div>

                                <p>As someone just starting to learn Blender, I found this course to be well organized
                                    and easy to follow. Looking forward to learning more from this instructor!</p>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="what-student-says">
                                <div class="student-expresss">
                                    <img src={studentpic1} class="img-fluid student-namepic"
                                        alt="studentpic1" />
                                    <p>Mitul Gajjar <span>(Student)</span><br></br>
                                        <stars>4.0 &nbsp;<StarFill /></stars>
                                    </p>
                                </div>

                                <p>As someone just starting to learn Blender, I found this course to be well organized
                                    and easy to follow. Looking forward to learning more from this instructor!</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="about-instructor">
                    <heading>About the instructor</heading>
                    <div class="instructor-block row">
                        <div class="col-md-8">
                            <div class="instructor-basicdetail">
                                <h5>Derek Elliott
                                    <span>Product Designer + Animator</span>
                                </h5>
                                <ul class="">
                                    <li> darekk.com/</li>
                                    <li><Dribbble /></li>
                                    <li><Instagram /></li>
                                    <li><Youtube /></li>
                                </ul>
                            </div>
                            <p>Expect easy-going Product + Design related Blender tutorials from ex-industrial designer,
                                Derek Elliott. He makes YouTube tutorials because that's how he started learning in
                                2008.</p>
                        </div>
                        <div class="col-md-4">
                            <img src={instructor} class="img-fluid" alt="instructor-img" />
                        </div>
                    </div>
                </section>
            </div>
        </CommonLayout>
    )
}

export default CoursesMaster

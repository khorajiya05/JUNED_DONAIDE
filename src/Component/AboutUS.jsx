import React from "react";
import  Header from '../Component/Header';
import aboutImg from '.././Assests/Images/abt.jpg'

const AboutUS = () => {
  return (<div className="about-us mt-0">
	<div className="aboutus_page">
    <Header />
		<div className="about-page-heading">
			<h2>About Us</h2>
		</div>
	</div>
   
    <section class="custom_new_about py-5 ">
		<div class="container">
			<div class="row align-items-center py-5">
				<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
					<div class="abt-text">
						<h3>Who <span>We Are</span></h3>
						<p>There are many variations of passages of Lorem Ipsum available, but the majority have
							suffered alteration in some form, by injected humour, or randomised words which don't look
							even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be
							sure there isn't anything embarrassing hidden in the middle of text.</p>
							<p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the
							first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined
							with a handful of model sentence structures.

						</p>
						<p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the
							first true generator on the Internet.
						</p>
					</div>
				</div>
				<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
					<div class="abt-img">
						<img src={aboutImg} alt="" class="img-fluid"/>
						<div className="contact_round_button">
						
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="py-5 Custom-value-section">
		<div class="container">
			<div class="row">
				<div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
					
					<div class="row">
						
						<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mx-auto">
						<div class="abt-box">
						<div class="icon-counter-single icon-counter-center">
							<div class="icon-counter">
								<i class="fa fa-paper-plane"></i>
							</div>
							<div class="icon-counter-content">
								<span>Over</span>
								<h3 class="counter">150 years</h3>
								<p>of nonprofit experience</p>
							</div>
						</div>
					</div>
						</div>
					</div>
					<div class="row">
						<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
							<div class="abt-box">
								<div class="icon-counter-single icon-counter-center">
									<div class="icon-counter">
										<i class="fa fa-calendar"></i>
									</div>
									<div class="icon-counter-content">
										<span>Over</span>
										<h3 class="counter">14 months</h3>
										<p>average turnover rate of development staff</p>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
							<div class="abt-box">
								<div class="icon-counter-single icon-counter-center">
									<div class="icon-counter">
										{/* <i class="fas fa-layer-group"></i> */}
                    <i class="fa fa-arrows-alt" aria-hidden="true"></i>
									</div>
									<div class="icon-counter-content">
										<span>Over</span>
										<h3 class="counter">44% of donors</h3>
										<p>stop giving due to poor communication</p>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
				<div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
					<div class="value-text custom_new">
						<div className="point">
						<h3>Built by Nonprofit Pros</h3>
						<p>We get it. We’re nonprofit pros who’ve founded multiple organizations, sat on boards,
							solicited donations, and helped raise millions. Fueled by caffeine and a passion to serve,
							we’ve wrestled with the same obstacles slowing your progress today.</p>
						</div>
						<div className="point">
						<h3>Seasoned Problem Solvers</h3>
						<p>Like you, we chose nonprofit careers because of a passion for mission and a longing to serve.
							Often that longing is hampered by overwhelming demands on your time and energy. You’re
							overworked, underpaid, and trying to save the world with dwindling resources.</p>
</div>
<div className="point">
						<h3>Do More with Less Effort</h3>
						<p>We founded Donaide to help you play a bigger game and make your vision a reality. We’re
							reinventing donor engagement by marrying proven methods with inventive tools to build
							meaningful, lasting relationships without adding to your workload or straining your funds.
						</p>
						</div>
					</div>
				</div>

			</div>
		</div>
	</section>

    </div>
  );
};

export default AboutUS;

import React from "react";
import { HiOutlineSparkles, HiOutlineShieldCheck, HiOutlineUsers } from "react-icons/hi";

const About = () => {
	return (
		<section className="px-4 pt-10">
			<div className="max-w-7xl mx-auto pb-10">
				{/* Header */}
				<div className="bg-white rounded-2xl shadow-sm p-6 mb-6 text-center">
					<h1 className="text-2xl font-semibold text-gray-800">About Talkora</h1>
					<p className="text-sm text-gray-600 mt-1">
						Talkora helps developers learn faster, share knowledge, and grow together—powered by a friendly, inclusive
						community.
					</p>
				</div>

				{/* Intro grid: Story + Quick facts */}
				<div className="grid lg:grid-cols-3 gap-6 mb-6">
					{/* Story / Mission */}
					<div className="lg:col-span-2">
						<div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
							<h3 className="text-lg font-semibold text-gray-800 mb-3">Our Mission</h3>
							<p className="text-sm text-gray-700 leading-6">
								We started Talkora to make learning practical and collaborative. Whether you are a beginner or a
								seasoned engineer, you can discover trending topics, ask questions with proper tags, and help others
								with examples and code snippets. We believe in respectful discussion and clear, useful answers.
							</p>

							<div className="grid sm:grid-cols-3 gap-3 mt-6">
								<div className="bg-[#F4F6F8] rounded-2xl p-4">
									<div className="text-xs text-gray-500">Focus</div>
									<div className="text-sm font-medium text-gray-800">Developer Q&A & Discussions</div>
								</div>
								<div className="bg-[#F4F6F8] rounded-2xl p-4">
									<div className="text-xs text-gray-500">Tone</div>
									<div className="text-sm font-medium text-gray-800">Friendly & Respectful</div>
								</div>
								<div className="bg-[#F4F6F8] rounded-2xl p-4">
									<div className="text-xs text-gray-500">Goal</div>
									<div className="text-sm font-medium text-gray-800">Learn • Share • Grow</div>
								</div>
							</div>
						</div>
					</div>

					{/* Quick Facts */}
					<div className="lg:col-span-1">
						<div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
							<h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Facts</h3>
							<ul className="space-y-3 text-sm text-gray-700">
								<li className="flex items-start gap-3">
									<span className="mt-1 h-2 w-2 rounded-full bg-[#FF6934]"></span>
									Started as a community-driven forum for practical coding help.
								</li>
								<li className="flex items-start gap-3">
									<span className="mt-1 h-2 w-2 rounded-full bg-[#FF6934]"></span>
									Tag-based search to discover discussions you care about.
								</li>
								<li className="flex items-start gap-3">
									<span className="mt-1 h-2 w-2 rounded-full bg-[#FF6934]"></span>
									Clean UI with sorting, pagination, and announcements.
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Values / What we offer */}
				<div className="bg-[#F4F6F8] rounded-2xl shadow-sm p-6">
					<h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">What You’ll Find Here</h3>

					<div className="grid sm:grid-cols-3 gap-4">
						<div className="flex items-start gap-3 bg-white p-5 rounded-2xl transition border border-gray-100 shadow-sm hover:shadow-md">
							<HiOutlineSparkles className="text-[#FF6934] text-xl mt-1" />
							<div>
								<div className="text-sm font-medium text-gray-800">Practical Learning</div>
								<p className="text-xs text-gray-600">Real answers with examples, code, and clear explanations.</p>
							</div>
						</div>

						<div className="flex items-start gap-3 bg-white p-5 rounded-2xl transition border border-gray-100 shadow-sm hover:shadow-md">
							<HiOutlineShieldCheck className="text-[#FF6934] text-xl mt-1" />
							<div>
								<div className="text-sm font-medium text-gray-800">Safe & Inclusive</div>
								<p className="text-xs text-gray-600">Respectful guidelines—no harassment or hate speech.</p>
							</div>
						</div>

						<div className="flex items-start gap-3 bg-white p-5 rounded-2xl transition border border-gray-100 shadow-sm hover:shadow-md">
							<HiOutlineUsers className="text-[#FF6934] text-xl mt-1" />
							<div>
								<div className="text-sm font-medium text-gray-800">Community First</div>
								<p className="text-xs text-gray-600">Ask, help, and grow your reputation by contributing.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;

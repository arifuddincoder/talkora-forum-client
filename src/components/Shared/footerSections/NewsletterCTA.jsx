import React from "react";

const NewsletterCTA = () => {
	return (
		<section className="px-4">
			<div className="max-w-7xl mx-auto pb-10">
				<div className="  bg-[#F4F6F8] p-6 rounded-2xl transition border border-gray-100 shadow-sm hover:shadow-md">
					<div className="flex flex-col lg:flex-row items-center gap-4">
						<div className="text-center lg:text-left">
							<h4 className="text-lg font-semibold text-gray-800">Stay updated</h4>
							<p className="text-sm text-gray-600">Subscribe to get the latest posts & announcements.</p>
						</div>

						<form className="w-full lg:max-w-lg lg:ml-auto">
							<div className="flex">
								<input
									type="email"
									placeholder="Your email"
									className="w-full rounded-l-xl border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:outline-none"
								/>
								<button
									type="submit"
									className="rounded-r-xl bg-[#FF6934] px-4 py-2 text-sm text-white hover:bg-[#FF6934]/90 transition"
								>
									Subscribe
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NewsletterCTA;

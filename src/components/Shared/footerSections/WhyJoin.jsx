import React from "react";
import { FaLightbulb, FaTags, FaUsers } from "react-icons/fa";

const WhyJoin = () => {
	return (
		<section className="px-4 pt-10">
			<div className="max-w-7xl mx-auto">
				<div className="bg-[#F4F6F8] rounded-2xl shadow-sm p-6">
					<h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
						Why Join <span className="text-[#FF6934]">Talkora?</span>
					</h3>

					<div className="grid sm:grid-cols-3 gap-4">
						{/* Card 1 */}
						<div className="flex items-start gap-3 bg-white p-5 rounded-2xl transition border border-gray-100 shadow-sm hover:shadow-md">
							<FaLightbulb className="text-[#FF6934] text-xl mt-1" />
							<div>
								<div className="text-sm font-medium text-gray-800">Learn Faster</div>
								<p className="text-xs text-gray-600">
									Get practical answers from real developers and level up every day.
								</p>
							</div>
						</div>

						{/* Card 2 */}
						<div className="flex items-start gap-3 bg-white p-5 rounded-2xl transition border border-gray-100 shadow-sm hover:shadow-md">
							<FaTags className="text-[#FF6934] text-xl mt-1" />
							<div>
								<div className="text-sm font-medium text-gray-800">Stay Updated</div>
								<p className="text-xs text-gray-600">
									Follow trending tags and discover the newest discussions easily.
								</p>
							</div>
						</div>

						{/* Card 3 */}
						<div className="flex items-start gap-3 bg-white p-5 rounded-2xl transition border border-gray-100 shadow-sm hover:shadow-md">
							<FaUsers className="text-[#FF6934] text-xl mt-1" />
							<div>
								<div className="text-sm font-medium text-gray-800">Grow Together</div>
								<p className="text-xs text-gray-600">Share your knowledge, help others, and build your reputation.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default WhyJoin;

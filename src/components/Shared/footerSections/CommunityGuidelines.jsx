import React from "react";

const CommunityGuidelines = () => {
	return (
		<section className="px-4 pt-10">
			<div className="max-w-7xl mx-auto pb-10">
				<div className="bg-[#F4F6F8] rounded-2xl shadow-sm p-6">
					<h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Community Guidelines</h3>

					<div className="grid sm:grid-cols-3 gap-3">
						<div className="flex items-start gap-3 bg-white p-5 rounded-2xl transition border border-gray-100 shadow-sm hover:shadow-md">
							<span className="text-[#FF6934] text-lg">✓</span>
							<div>
								<div className="text-sm font-medium text-gray-800">Be respectful</div>
								<p className="text-xs text-gray-600">No harassment or hate speech.</p>
							</div>
						</div>

						<div className="flex items-start gap-3 bg-white p-5 rounded-2xl transition border border-gray-100 shadow-sm hover:shadow-md">
							<span className="text-[#FF6934] text-lg">✓</span>
							<div>
								<div className="text-sm font-medium text-gray-800">Stay on topic</div>
								<p className="text-xs text-gray-600">Use proper tags & clear titles.</p>
							</div>
						</div>

						<div className="flex items-start gap-3 bg-white p-5 rounded-2xl transition border border-gray-100 shadow-sm hover:shadow-md">
							<span className="text-[#FF6934] text-lg">✓</span>
							<div>
								<div className="text-sm font-medium text-gray-800">Be helpful</div>
								<p className="text-xs text-gray-600">Share sources, code, examples.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CommunityGuidelines;

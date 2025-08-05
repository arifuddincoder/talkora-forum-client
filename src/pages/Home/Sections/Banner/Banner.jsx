import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import bannerBg from "../../../../assets/banner-bg.jpg";
import usePopularSearches from "../../../../hooks/usePopularSearches";

const Banner = ({ setSearchTag }) => {
	const { searches = [], searchIsLoading } = usePopularSearches();
	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		setSearchTag(searchText.trim());
	}, [searchText, setSearchTag]);

	useEffect(() => {
		const trimmed = searchText.trim();
		if (trimmed.length < 3) return;

		const delay = setTimeout(() => {
			axios
				.post(`${import.meta.env.VITE_API_URL}/searches`, { text: trimmed })
				.then(() => console.log("✅ Search recorded:", trimmed))
				.catch(() => console.error("❌ Failed to record search"));
		}, 1000);

		return () => clearTimeout(delay);
	}, [searchText]);

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			setSearchTag(searchText.trim());
		}
	};

	const handleTagClick = (tagName) => {
		setSearchText(tagName);
		setSearchTag(tagName);
		if (tagName.trim().length >= 3) {
			axios
				.post(`${import.meta.env.VITE_API_URL}/searches`, { text: tagName.trim() })
				.then(() => console.log("✅ Tag click recorded"))
				.catch(() => console.error("❌ Tag record failed"));
		}
	};

	return (
		<section
			className="relative py-10 sm:py-0 sm:h-96 flex flex-col justify-center items-center text-center overlay-section px-4"
			style={{
				backgroundImage: `url(${bannerBg})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<h1 className="text-2xl lg:text-3xl font-medium text-white mb-4 relative z-2">
				Discover trending topics through tags
			</h1>

			<div className="w-full max-w-2xl mx-auto relative z-2">
				<input
					type="text"
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Search for topics..."
					className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-50 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
				/>
				<FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
			</div>

			{!searchIsLoading && searches.length > 0 && (
				<div className="mt-4 text-md text-white text-center relative z-2 flex flex-wrap gap-2 justify-center">
					{searches.slice(0, 3).map((s) => (
						<span
							key={s._id}
							onClick={() => handleTagClick(s.text)}
							className="underline cursor-pointer hover:text-orange-300 transition"
						>
							{s.text}
						</span>
					))}
				</div>
			)}
		</section>
	);
};

export default Banner;

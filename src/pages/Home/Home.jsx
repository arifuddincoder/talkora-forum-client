import React, { useEffect, useState } from "react";
import Banner from "./Sections/Banner/Banner";
import Container from "../../components/Shared/Container";
import RightSidebar from "./Sections/RightSidebar/RightSidebar";
import PostCard from "./PostCard/PostCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import usePosts from "../../hooks/usePosts";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import WhyJoin from "../../components/Shared/footerSections/WhyJoin";
import CommunityGuidelines from "../../components/Shared/footerSections/CommunityGuidelines";
import NewsletterCTA from "../../components/Shared/footerSections/NewsletterCTA";

const HomePage = () => {
	const [page, setPage] = useState(0);
	const [sortBy, setSortBy] = useState("newest");
	const [searchTag, setSearchTag] = useState("");

	useEffect(() => {
		document.title = "Talkora – A Modern Forum for Meaningful Conversations";
	}, []);

	const { posts, total, isLoading } = usePosts({ page, sortBy, search: searchTag });
	const totalPages = Math.ceil(total / 5);

	return (
		<>
			<Banner setSearchTag={setSearchTag} />
			<Container>
				<div className="flex flex-col lg:flex-row gap-10 lg:gap-6 pt-6 pb-10">
					<div className="lg:w-7/10">
						<div className="mb-4 flex justify-between items-center gap-2 flex-wrap">
							<button onClick={() => setSearchTag("")} className="btn bg-gray-200 text-gray-700 hover:bg-gray-300">
								All Posts
							</button>

							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
								className="select select-md border-none focus:outline-none"
							>
								<option value="newest">Sort by: Newest</option>
								<option value="popular">Sort by: Popularity</option>
							</select>
						</div>

						<section>
							{isLoading ? (
								<LoadingSpinner />
							) : (
								<div className="space-y-6">
									{posts.map((post) => (
										<PostCard
											key={post._id}
											id={post._id}
											title={post.title}
											tags={post.tags}
											author={post.authorName}
											authorImage={post.authorImage}
											votes={(post.upvote || 0) - (post.downvote || 0)}
											comments={post.commentCount || 0}
											time={post.created_at}
										/>
									))}
									{posts.length === 0 && <p className="text-center text-gray-500">No posts found.</p>}
								</div>
							)}
						</section>

						{totalPages > 1 && (
							<div className="flex justify-center pt-6">
								<div className="join">
									<button className="join-item btn" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
										<FaChevronLeft />
									</button>

									{[...Array(totalPages).keys()].map((pg) => {
										if (pg === 0 || pg === totalPages - 1 || Math.abs(pg - page) <= 1) {
											return (
												<button
													key={pg}
													className={`join-item btn ${pg === page ? "btn-active bg-orange-500 text-white" : ""}`}
													onClick={() => setPage(pg)}
												>
													{pg + 1}
												</button>
											);
										} else if ((pg === 1 && page > 2) || (pg === totalPages - 2 && page < totalPages - 3)) {
											return (
												<span key={pg} className="join-item btn btn-disabled">
													...
												</span>
											);
										}
										return null;
									})}

									<button
										className="join-item btn"
										disabled={page + 1 >= totalPages}
										onClick={() => setPage((p) => p + 1)}
									>
										<FaChevronRight />
									</button>
								</div>
							</div>
						)}
					</div>
					<div className="lg:w-3/10">
						<RightSidebar setSearchTag={setSearchTag} />
					</div>
				</div>
			</Container>
			{/* <div className="bg-white">
				<WhyJoin></WhyJoin>
				<CommunityGuidelines></CommunityGuidelines>
				<NewsletterCTA></NewsletterCTA>
			</div> */}
		</>
	);
};

export default HomePage;

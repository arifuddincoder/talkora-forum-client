import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
	return (
		<>
			<footer className="bg-gray-900 text-gray-300 px-4">
				<div className="max-w-7xl mx-auto px-6 py-10 gap-8 text-center md:text-left flex justify-between flex-col lg:flex-row">
					<div>
						<h2 className="text-2xl font-bold text-white">Talkora.</h2>
						<p className="mt-4 text-sm leading-6">
							A modern forum platform to share knowledge, discover trending topics, and connect with people around the
							world.
						</p>
					</div>

					<div>
						<h3 className="text-white font-semibold text-lg mb-3">Follow Us</h3>
						<div className="flex justify-center md:justify-start space-x-4">
							<a href="https://facebook.com/arifuddincoder" target="_blank" rel="noreferrer">
								<FaFacebookF className="text-xl hover:text-white transition" />
							</a>
							<a href="https://twitter.com/arifuddincoder" target="_blank" rel="noreferrer">
								<FaTwitter className="text-xl hover:text-white transition" />
							</a>
							<a href="https://linkedin.com/arifuddincoder" target="_blank" rel="noreferrer">
								<FaLinkedinIn className="text-xl hover:text-white transition" />
							</a>
							<a href="https://github.com/arifuddincoder" target="_blank" rel="noreferrer">
								<FaGithub className="text-xl hover:text-white transition" />
							</a>
						</div>
					</div>
				</div>

				<div className="border-t border-gray-700 text-center py-4 text-sm">
					© {new Date().getFullYear()} Talkora Forum — All Rights Reserved.
				</div>
			</footer>
		</>
	);
};

export default Footer;

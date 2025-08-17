import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineMail, HiOutlineClock } from "react-icons/hi";

const Contact = () => {
	const [submitted, setSubmitted] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm();

	const onSubmit = async (data) => {
		setSubmitted(true);
		if (window?.toast) window.toast.success("Thanks! We received your message.");
		reset();
		// 5 সেকেন্ড পর success বার বন্ধ
		setTimeout(() => setSubmitted(false), 5000);
	};

	return (
		<section className="px-4 pt-10">
			<div className="max-w-7xl mx-auto pb-10">
				{/* Header */}
				<div className="bg-white rounded-2xl shadow-sm p-6 mb-6 text-center">
					<h1 className="text-2xl font-semibold text-gray-800">Contact Us</h1>
					<p className="text-sm text-gray-600 mt-1">
						Have a question or feature request? Send us a message—typically we reply within 24 hours.
					</p>
				</div>

				<div className="grid lg:grid-cols-3 gap-6">
					{/* Info cards */}
					<div className="lg:col-span-1 space-y-4">
						<div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex gap-3">
							<HiOutlineMail className="text-[#FF6934] text-2xl mt-1" />
							<div>
								<div className="text-sm font-semibold text-gray-800">Email</div>
								<p className="text-xs text-gray-600">support@talkora.dev</p>
								<p className="text-xs text-gray-500 mt-1">We aim to respond within one business day.</p>
							</div>
						</div>

						<div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex gap-3">
							<HiOutlineClock className="text-[#FF6934] text-2xl mt-1" />
							<div>
								<div className="text-sm font-semibold text-gray-800">Support Hours</div>
								<p className="text-xs text-gray-600">Sat–Thu, 10:00 AM – 6:00 PM (GMT+6)</p>
								<p className="text-xs text-gray-500 mt-1">Friday & public holidays: limited support</p>
							</div>
						</div>
					</div>

					{/* Form */}
					<div className="lg:col-span-2">
						<div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
							<h3 className="text-lg font-semibold text-gray-800 mb-4">Send a Message</h3>

							{/* success banner */}
							{submitted && (
								<div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
									Thanks! Your message has been recorded locally. (No API used)
								</div>
							)}

							<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
								{/* honeypot (anti-bot) */}
								<input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...register("website")} />

								<div className="grid sm:grid-cols-2 gap-4">
									<div>
										<label className="text-sm font-medium text-gray-700">Your Name</label>
										<input
											type="text"
											{...register("name", { required: "Name is required" })}
											placeholder="John Doe"
											className="input input-bordered w-full mt-1"
										/>
										{errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
									</div>

									<div>
										<label className="text-sm font-medium text-gray-700">Email</label>
										<input
											type="email"
											{...register("email", {
												required: "Email is required",
												pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" },
											})}
											placeholder="john@example.com"
											className="input input-bordered w-full mt-1"
										/>
										{errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
									</div>
								</div>

								<div>
									<label className="text-sm font-medium text-gray-700">Subject</label>
									<input
										type="text"
										{...register("subject", { required: "Subject is required" })}
										placeholder="Feature request / Bug report / General query"
										className="input input-bordered w-full mt-1"
									/>
									{errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>}
								</div>

								<div>
									<label className="text-sm font-medium text-gray-700">Message</label>
									<textarea
										rows={5}
										{...register("message", {
											required: "Message is required",
											minLength: { value: 10, message: "Please add a bit more detail (min 10 chars)" },
										})}
										placeholder="Write your message here..."
										className="textarea textarea-bordered w-full mt-1"
									/>
									{errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
								</div>

								<div className="flex items-center justify-end">
									<button
										type="submit"
										className="btn bg-[#FF6934] border-none text-white hover:bg-[#ff5b1f]"
										disabled={isSubmitting}
									>
										{isSubmitting ? "Sending..." : "Send Message"}
									</button>
								</div>
							</form>

							<p className="text-xs text-gray-500 mt-4">
								By sending a message, you agree to our community guidelines. Please don’t share passwords or sensitive
								data.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;

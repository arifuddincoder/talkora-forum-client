import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Select from "react-select";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useTags from "../../../../hooks/useTags";
import useUserPostInfo from "../../../../hooks/useUserPostInfo";

const AddPost = () => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const navigate = useNavigate();
	const [selectedTags, setSelectedTags] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const { tags, isLoading: isTagsLoading } = useTags();
	const { postCount, isGoldMember, isLoading: isPostInfoLoading, refetchPostInfo } = useUserPostInfo(user?.email);

	useEffect(() => {
		document.title = "Add Post | Talkora Forum";
	}, []);

	const onSubmit = async (data) => {
		if (selectedTags.length === 0) {
			toast.error("Please select at least one tag");
			return;
		}

		const postData = {
			authorName: user.displayName,
			authorEmail: user.email,
			authorImage: user.photoURL,
			title: data.title,
			description: data.description,
			tags: selectedTags.map((tag) => tag.value),
		};

		setIsSubmitting(true);
		try {
			const res = await axiosSecure.post("/posts", postData);
			if (res.data.insertedId) {
				toast.success("Post added successfully!");
				reset();
				setSelectedTags([]);
				await refetchPostInfo();
			}
		} catch (err) {
			toast.error("Failed to add post");
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isPostInfoLoading || isTagsLoading) {
		return (
			<div className="flex justify-center items-center h-64">
				<p className="text-gray-500 text-lg">Loading...</p>
			</div>
		);
	}

	if (!isGoldMember && postCount >= 5) {
		return (
			<div className="text-center mt-10">
				<h2 className="text-xl font-semibold mb-4 text-red-600">
					You have reached your 5 post limit as a normal user.
				</h2>
				<button
					onClick={() => navigate("/membership")}
					className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded"
				>
					Become a Member
				</button>
			</div>
		);
	}

	return (
		<div className="mx-auto p-6 bg-white rounded-lg shadow">
			<h2 className="text-2xl font-bold mb-6 text-center">Add New Post</h2>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<input
					type="text"
					placeholder="Post Title"
					{...register("title", { required: true })}
					className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
				/>
				{errors.title && <p className="text-red-500 text-sm">Title is required</p>}

				<textarea
					rows={4}
					placeholder="Post Description"
					{...register("description", { required: true })}
					className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
				></textarea>
				{errors.description && <p className="text-red-500 text-sm">Description is required</p>}

				<Select
					options={tags.map((tag) => ({ value: tag.name, label: tag.name }))}
					value={selectedTags}
					onChange={setSelectedTags}
					isMulti
					isLoading={isTagsLoading}
					placeholder="Select Tags"
					className="react-select-container"
				/>

				<button
					type="submit"
					disabled={isSubmitting}
					className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isSubmitting ? "Submitting..." : "Submit Post"}
				</button>
			</form>
		</div>
	);
};

export default AddPost;

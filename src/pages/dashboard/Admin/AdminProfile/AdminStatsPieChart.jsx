import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#FF8042", "#00C49F", "#0088FE"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={14}>
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

const AdminStatsPieChart = ({ stats }) => {
	const chartData = [
		{ name: "Posts", value: stats.posts },
		{ name: "Comments", value: stats.comments },
		{ name: "Users", value: stats.users },
	];

	return (
		<div className="bg-white shadow rounded p-4 md:p-10">
			<h3 className="text-lg font-bold mb-4">Site Overview</h3>
			<div className="flex flex-col lg:flex-row items-center gap-6">
				<div className="w-full lg:w-2/3 h-100">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={chartData}
								cx="50%"
								cy="50%"
								labelLine={false}
								label={renderCustomizedLabel}
								outerRadius={150}
								fill="#8884d8"
								dataKey="value"
							>
								{chartData.map((entry, index) => (
									<Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
						</PieChart>
					</ResponsiveContainer>
				</div>

				<div className="w-full lg:w-1/3">
					<ul className="space-y-3 text-sm">
						{chartData.map((entry, index) => (
							<li key={entry.name} className="flex items-center gap-3">
								<div className="w-4 h-4 rounded-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
								<span className="font-medium">{entry.name}</span>
								<span className="ml-auto font-bold">{entry.value}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default AdminStatsPieChart;
